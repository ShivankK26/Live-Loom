import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";

const URL = "http://localhost:3000";

export const Room = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [socket, setSocket] = useState<null | Socket>(null);

  useEffect(() => {
    const socket = io(URL, {
      autoConnect: false,
    });

    socket.on("send-offer", ({ roomId }) => {
      alert("Please send offer!");
      socket.emit("offer", {
        sdp: "",
        roomId,
      });
    });

    socket.on("offer", ({ roomId, offer }) => {
      alert("Please send answer!");
      socket.emit("offer", {
        roomId,
        sdp: "",
      });
    });

    socket.on("answer", ({ roomId, answer }) => {
      alert("Connection established!");
    });

    setSocket(socket);
  }, [name]);

  useEffect(() => {}, [name]);
  return <div>Hi {name}</div>;
};
