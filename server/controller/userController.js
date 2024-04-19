import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    const filtered = users.map((u) => ({ ...u, password: undefined })); // remove the password field
    res.status(200).json(filtered);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong");
  }
}
export async function getUser(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    const { password, ...restOfUser } = user;
    res.status(200).json(restOfUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong");
  }
}
export async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const body = req.body;
    if (body.password) {
      const genSalt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, genSalt);
    }



    const updatedUser = await prisma.user.update({
      where: { id },
      data: body,
    });
    const { password, ...updatedProfile } = updatedUser;
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong");
  }
}
export async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const userId = req.userId;

    if (userId !== id) return res.status(401).json("Not authenticated");
    await prisma.user.delete({ where: { id } });
    res.json("deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong");
  }
}
export async function savedPost(req, res) {
  try {
    const userId = req.userId;


    const userPost = await prisma.post.findMany({
      where: {
        userId,
      },
    });
    const bookmarkedPost = await prisma.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        post: true,
      },
    });
    const bookmarked = bookmarkedPost.map((post) => ({
      ...post.post,
      isSaved: true,
    }));
    res.status(200).json({ userPost, bookmarked });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong");
  }
}
export async function getNotification(req, res) {
  try {
    const userId = req.userId;

    const number = await prisma.chat.count({
      where: {
        userId: {
          hasSome: [userId],
        },
        NOT: {
          seenBy: {
            hasSome: [userId],
          },
        },
      },
    });
    res.status(200).json(number);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong");
  }
}
