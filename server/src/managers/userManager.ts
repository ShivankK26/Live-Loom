import { Socket } from "socket.io";

export interface User {
  socket: Socket;
  name: String;
}

export class UserManager {
  private users: User[];
  private queue: string[];
  constructor() {
    this.users = [];
    this.queue = [];
  }
  addUser(name: string, socket: Socket) {
    this.users.push({
      name,
      socket,
    });
    this.queue.push(socket.id);
    this.clearQueue();
  }
  removeUser(socketId) {
    this.users = this.users.filter((x) => x.socket.id === socketId);
    this.queue = this.queue.filter((x) => x === socketId);
  }
  clearQueue() {
    if (this.queue.length < 2) {
      return;
    }
    const user1 = this.users.find((x) => x.socket.id === this.queue.pop());
    const user2 = this.users.find((x) => x.socket.id === this.queue.pop());
    const roomId = this.generate();
    user1?.socket.emit("new-room", {
      type: "send-offer",
      room: roomId,
    });
  }
}
