import prisma from "../lib/prisma.js";


export async function saveBookmark(req, res) {
  try {
    const userId = req.userId;

    const postId = req.body.postId;

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });
    if (bookmark) {
      await prisma.bookmark.delete({
        where: {
          id: bookmark.id,
        },
      });
      res.status(204).json("Removed");
    } else {
      await prisma.bookmark.create({
        data: {
          userId,
          postId,
        },
      });
      res.status(201).json("Bookmark added");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
