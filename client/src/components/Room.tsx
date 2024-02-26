import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";

const URL = "http://localhost:3000";

export const Room = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [socket, setSocket] = useState<null | Socket>(null);
  const [lobby, setLobby] = useState(true);

  useEffect(() => {
    const socket = io(URL);

    socket.on("send-offer", ({ roomId }) => {
      alert("Please send offer!");
      setLobby(false);
      socket.emit("offer", {
        sdp: "",
        roomId,
      });
    });

    socket.on("offer", ({ roomId, offer }) => {
      alert("Please send answer!");
      setLobby(false);
      socket.emit("answer", {
        roomId,
        sdp: "",
      });
    });

    socket.on("answer", ({ roomId, answer }) => {
      setLobby(false);
      alert("Connection established!");
    });

    socket.on("lobby", () => {
      setLobby(true);
    });

    if (lobby) {
      return <div>Waiting to connect you to someone</div>;
    }

    setSocket(socket);
  }, [name]);

  return (
    <div>
      Hi {name}
      <video width={400} height={400} />
      <video width={400} height={400} />
    </div>
  );
};
