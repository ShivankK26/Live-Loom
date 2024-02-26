import { User } from "./UserManager";

let GLOBAL_ROOM_ID = 1;

interface Room {
  user1: User;
  user2: User;
}

// In RoomManager, we manage people in a room. As a room is created, a person sends a send-offer packet. Then this person sends his WebRTC Configuration.
// When the server receives these responses, which is initHandlers method then it tells the user2 the user1 has sent an offer, now you can accept/reject it. Now, when user2 receives an offer they have to send back an anwer to user1.
export class RoomManager {
  private rooms: Map<string, Room>;
  constructor() {
    this.rooms = new Map<string, Room>();
  }

  createRoom(user1: User, user2: User) {
    const roomId = this.generate().toString();
    this.rooms.set(roomId.toString(), {
      user1,
      user2,
    });

    user1.socket.emit("send-offer", {
      roomId,
    });

    user2.socket.emit("send-offer", {
      roomId,
    });
  }

  onOffer(roomId: string, sdp: string, senderSocketid: string) {
    const room = this.rooms.get(roomId);
    if (!room) {
      return;
    }
    const receivingUser =
      room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
    receivingUser?.socket.emit("offer", {
      sdp,
      roomId,
    });
  }

  onAnswer(roomId: string, sdp: string, senderSocketid: string) {
    const room = this.rooms.get(roomId);
    if (!room) {
      return;
    }
    const receivingUser =
      room.user1.socket.id === senderSocketid ? room.user2 : room.user1;

    receivingUser?.socket.emit("answer", {
      sdp,
      roomId,
    });
  }

  generate() {
    return GLOBAL_ROOM_ID++;
  }
}
