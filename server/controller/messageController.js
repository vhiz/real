import prisma from "../lib/prisma.js";
import { sessionOptions } from "../lib/sessionOptions.js";
import { getIronSession } from "iron-session";

export async function addMessage(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    if (!session.id) return res.status(401).json("Not Authorized");
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.chatId,
        userId: {
          hasSome: [session.id],
        },
      },
    });
    if (!chat) return res.status(404).json("Chat not found");
    const message = await prisma.message.create({
      data: {
        text: req.body.text,
        senderId: session.id,
        chatId: req.params.chatId,
      },
    });

    await prisma.chat.update({
      where: { id: req.params.chatId },
      data: {
        seenBy: [session.id],
        lastMessage: req.body.text,
      },
    });
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
