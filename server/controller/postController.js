import prisma from "../lib/prisma.js";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/sessionOptions.js";

export async function getPosts(req, res) {
  const query = req.query;
  try {
    const session = await getIronSession(req, res, sessionOptions);
    const posts = await prisma.post.findMany({
      where: {
        city: {
          equals: query.city || undefined,
          mode: "insensitive",
        },
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 1000000000,
        },
      },
    });
    if (session?.id) {
      const filtered = await Promise.all(
        posts.map(async (post) => {
          const bookmark = await prisma.bookmark.findUnique({
            where: {
              userId_postId: {
                userId: session.id,
                postId: post.id,
              },
            },
          });
          return { ...post, isSaved: bookmark ? true : false };
        })
      );
      return res.status(200).json(filtered);
    } else {
      const filtered = posts.map((post) => ({ ...post, isSaved: false }));
      return res.status(200).json(filtered);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
export async function getPost(req, res) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            img: true,
            id: true,
          },
        },
      },
    });
    const session = await getIronSession(req, res, sessionOptions);
    if (session?.id) {
      const bookmark = await prisma.bookmark.findUnique({
        where: {
          userId_postId: {
            userId: session.id,
            postId: req.params.id,
          },
        },
      });
      return res
        .status(200)
        .json({ ...post, isSaved: bookmark ? true : false });
    } else {
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
export async function createPost(req, res) {
  const body = req.body;
  try {
    const session = await getIronSession(req, res, sessionOptions);
    if (!session.id)
      return res.status(401).json("You have to login to create a listing");
    const userId = session.id;
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId,
        postDetail: {
          create: { ...body.postDetail },
        },
      },
    });
    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
export async function updatePost(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    if (!session.id)
      return res.status(401).json("You have to login to create a listing");
    res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
export async function deletePost(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
    });
    if (!session.id || post.userId !== session.id)
      return res.status(401).json("Not Authorized");
    await prisma.post.delete({ where: { id: req.params.id } });
    res.status(200).json("Post Deleted");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
