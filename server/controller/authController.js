import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/sessionOptions.js";

export async function Register(req, res) {
  try {
    const { username, email, password, gender } = req.body;
    const userExist = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });
    const emailExist = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (userExist) return res.status(409).json({ error: "user already exit" });
    if (emailExist)
      return res.status(405).json({ error: "email already exit" });

    const genSalt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, genSalt);

    const boyImg = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlImg = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashed,
        img: gender === "male" ? boyImg : girlImg,
      },
    });
    res.status(201).json("User created");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
}
export async function Login(req, res) {
  const { username } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });
    if (!user) return res.status(404).json("User not found");

    const verified = await bcrypt.compare(req.body.password, user.password);
    if (!verified) return res.status(409).json("Invalid credentials");

    const session = await getIronSession(req, res, sessionOptions);

    session.username = user.username;
    session.email = user.email;
    session.img = user.img;
    session.id = user.id;

    await session.save();
    const { password, ...others } = user;
    return res.status(200).json(others);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
export async function Logout(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    session.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
