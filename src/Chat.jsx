import { useEffect, useState } from "react";
import { socket } from "./socket";

export default function Chat({ roomId, user }) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const send = () => {
    if (!msg) return;
    socket.emit("send-message", { roomId, message: msg, user });
    setMessages((p) => [...p, { message: msg, user, time: "You" }]);
    setMsg("");
  };

  return (
    <div>
      <h3>Chat</h3>
      <div style={{ height: 200, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <p key={i}><b>{m.user}:</b> {m.message}</p>
        ))}
      </div>
      <input value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
