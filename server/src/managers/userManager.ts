import { Socket } from "socket.io";

interface User {
  socket: Socket,
  name: String,
}

export class UserManager {
  private users: User[];
  constructor() {
    this.users = [];
  }
  addUser(name: string, socket: Socket) {
    this.users.push({
      name, socket
    })
  }
  removeUser(socketId) {
    this.users = this.users.filter(x => x.socket.id === socketId);
  }
}
