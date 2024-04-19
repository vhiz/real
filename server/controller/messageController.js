import prisma from "../lib/prisma.js";

export async function addMessage(req, res) {
  try {
    const userId = req.userId;
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.chatId,
        userId: {
          hasSome: [userId],
        },
      },
    });
    if (!chat) return res.status(404).json("Chat not found");
    const message = await prisma.message.create({
      data: {
        text: req.body.text,
        senderId: userId,
        chatId: req.params.chatId,
      },
    });

    await prisma.chat.update({
      where: { id: req.params.chatId },
      data: {
        seenBy: [userId],
        lastMessage: req.body.text,
      },
    });
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
