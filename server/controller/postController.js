import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export async function getPosts(req, res) {
  const query = req.query;
  try {
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

    const token = req.cookies?.realEstate;
    if (token) {
      jwt.verify(token, process.env.KEY, async (err, payload) => {
        if (!err) {
          const filtered = await Promise.all(
            posts.map(async (post) => {
              const bookmark = await prisma.bookmark.findUnique({
                where: {
                  userId_postId: {
                    userId: payload.id,
                    postId: post.id,
                  },
                },
              });
              return { ...post, isSaved: bookmark ? true : false };
            })
          );
          return res.status(200).json(filtered);
        }
      });
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
    const token = req.cookies?.realEstate;

    if (token) {
      jwt.verify(token, process.env.KEY, async (err, payload) => {
        if (!err) {
          const bookmark = await prisma.bookmark.findUnique({
            where: {
              userId_postId: {
                userId: payload.id,
                postId: req.params.id,
              },
            },
          });
          return res
            .status(200)
            .json({ ...post, isSaved: bookmark ? true : false });
        }
      });
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
    const userId = req.userId;

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
    const userId = req.userId;

    res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
export async function deletePost(req, res) {
  try {
    const userId = req.userId;
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
    });
    if (post.userId !== userId) return res.status(401).json("Not Authorized");
    await prisma.post.delete({ where: { id: req.params.id } });
    res.status(200).json("Post Deleted");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
}
