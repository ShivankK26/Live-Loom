import { User } from "./userManager";

let GLOBAL_ROOM_ID = 1;

// In RoomManager, we manage people in a room. As a room is created, a person sends a send-offer packet. Then this person sends his WebRTC Configuration.
// When the server receives these responses, which is initHandlers method then it tells the user2 the user1 has sent an offer, now you can accept/reject it. Now, when user2 receives an offer they have to send back an anwer to user1.
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
    const roomId = this.generate().toString();
    this.rooms.set(roomId.toString(), {
      user1,
      user2,
    });
    user1.socket.emit("new-room", {
      roomId,
    });
  }

  onOffer(roomId: string, sdp: string) {
    const user2 = this.rooms.get(roomId)?.user2;
    user2?.socket.emit("offer", {
      sdp,
    });
  }

  onAnswer(roomId: string, sdp: string) {
    const user1 = this.rooms.get(roomId)?.user1;
    user1?.socket.emit("offer", {
      sdp,
    });
  }

  generate() {
    return GLOBAL_ROOM_ID++;
  }
}
