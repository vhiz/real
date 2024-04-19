import prisma from "../lib/prisma.js";

export async function getChats(req, res) {
  try {
    const userId = req.userId;

    const chats = await prisma.chat.findMany({
      where: {
        userId: {
          hasSome: [userId],
        },
      },
    });
    const chatWithUser = await Promise.all(
      chats.map(async (chat) => {
        const receiverId = chat.userId.find((id) => id !== userId);
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
    const userId = req.userId;
    let chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userId: {
          hasSome: [userId],
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
    if (!chat?.seenBy?.includes(userId)) {
      chat = await prisma.chat.update({
        where: {
          id: req.params.id,
          userId: {
            hasSome: [userId],
          },
        },
        data: {
          seenBy: {
            push: [userId],
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
    chat.receiver = chat.users.find((user) => user.id !== userId);
    delete chat.users;

    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
export async function addChat(req, res) {
  try {
    const userId = req.userId;
    const chat = await prisma.chat.findMany({
      where: {
        userId: {
          hasSome: [userId],
        },
      },
    });
    const filtered = chat.filter((c) => c.userId.includes(req.body.receiverId));
    if (filtered.length > 0)
      return res.status(405).send("Already created chat");

    const newChat = await prisma.chat.create({
      data: {
        userId: [userId, req.body.receiverId],
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
    const userId = req.userId;
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userId: {
          hasSome: [userId],
        },
      },
      data: {
        seenBy: {
          push: [userId],
        },
      },
    });
    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
