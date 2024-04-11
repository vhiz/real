import { sessionOptions } from "../lib/sessionOptions.js";
import prisma from "../lib/prisma.js";
import { getIronSession } from "iron-session";

export async function getChats(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    if (!session.id) return res.status(401).json("Not Authorized");

    const chats = await prisma.chat.findMany({
      where: {
        userId: {
          hasSome: [session.id],
        },
      },
    });
    const chatWithUser = await Promise.all(
      chats.map(async (chat) => {
        const receiverId = chat.userId.find((id) => id !== session.id);
        const receiver = await prisma.user.findUnique({
          where: {
            id: receiverId,
          },
          select: {
            img: true,
            username: true,
            id: true,
          },
        });
        return { ...chat, receiver };
      })
    );
    res.json(chatWithUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
export async function getChat(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    if (!session.id) return res.status(401).json("Not Authorized");
    let chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userId: {
          hasSome: [session.id],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
        users: {
          select: {
            id: true,
            username: true,
            img: true,
          },
        },
      },
    });
    if (!chat?.seenBy?.includes(session.id)) {
      chat = await prisma.chat.update({
        where: {
          id: req.params.id,
          userId: {
            hasSome: [session.id],
          },
        },
        data: {
          seenBy: {
            push: [session.id],
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    }
    chat.receiver = chat.users.find((user) => user.id !== session.id);
    delete chat.users;

    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
export async function addChat(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    if (!session.id) return res.status(401).json("Not Authorized");
    const chat = await prisma.chat.findMany({
      where: {
        userId: {
          hasSome: [session.id],
        },
      },
    });
    const filtered = chat.filter((c) => c.userId.includes(req.body.receiverId));
    if (filtered.length > 0)
      return res.status(405).send("Already created chat");

    const newChat = await prisma.chat.create({
      data: {
        userId: [session.id, req.body.receiverId],
      },
    });
    return res.status(201).json(newChat);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
export async function readChat(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    if (!session.id) return res.status(401).json("Not Authorized");
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userId: {
          hasSome: [session.id],
        },
      },
      data: {
        seenBy: {
          push: [session.id],
        },
      },
    });
    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
