import { Socket } from "socket.io";
import http from "http";

import express from "express";
import { Server } from "socket.io";
import { UserManager } from "./managers/UserManager";

const app = express();
const server = http.createServer(app);

const userManager = new UserManager();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
  userManager.addUser("randomName", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected!");
    userManager.removeUser(socket.id);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
