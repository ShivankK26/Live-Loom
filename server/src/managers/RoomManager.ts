import { User } from "./userManager";

let GLOBAL_ROOM_ID = 1;

export interface Room {
  user1: User;
  user2: User;
  roomId: string;
}

export class RoomManager {
  private rooms: Map<string, Room>;
  constructor() {
    this.rooms = new Map<string, Room>();
  }

  createRoom(user1: User, user2: User) {
    const roomId = this.generate();
    this.rooms.set(roomId.toString(), {
      user1,
      user2,
    });
    user1.socket.emit("send-offer");
  }

  generate() {
    return GLOBAL_ROOM_ID++;
  }
}
