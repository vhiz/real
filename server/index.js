import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import bookMarkRoute from "./routes/bookMarkRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config.js";

import express from "express";
import { server, app } from "./routes/socket.js";
import cookieParser from "cookie-parser";
app.use(helmet());
app.use(
  cors({ origin: ["https://realestate-44bd0.web.app"], credentials: true })
); //
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/", authRoute);
app.use("/api/user/", userRoute);
app.use("/api/post/", postRoute);
app.use("/api/bookmark/", bookMarkRoute);
app.use("/api/chat/", chatRoute);
app.use("/api/message/", messageRoute);

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

const Port = process.env.PORT || 3000;
server.listen(Port, () => {
  console.log(`Server Running at ${Port}`);
});
