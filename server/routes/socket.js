import http from "http";
import express from "express";
import { Server } from "socket.io";
import "dotenv/config.js";

export const app = express();
export const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://realestate-44bd0.web.app"],
  },
});
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", function (socket) {
  console.log(`New connection: ${socket.id}`);

  socket.on("addUsers", (userId) => {
    addUser(userId, socket.id);
    io.emit("onlineUsers", users);
  });

  socket.on("sendMessage", ({ receiver, data }) => {
    const user = getUser(receiver.id);
    if (!user) return;
    io.to(user.socketId).emit("getMessage", { ...data, receiver: receiver });
  });
  socket.on("typing", (data) => {
    const receiver = getUser(data.receiverId);
    if (!receiver) return;
    io.to(receiver.socketId).emit("getTyping", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("onlineUsers", users);
    console.log(`${socket.id} disconnected`);
  });
});
