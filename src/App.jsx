import React, { useState } from "react";
import { socket } from "./socket";
// import YouTubePlayer from "./YouTubePlayer";
import VideoPlayer from "./VideoPlayer";

function App() {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [isHost, setIsHost] = useState(false);

  const joinRoom = (host) => {
    socket.emit("join-room", {
      roomId,
      isHost: host
    });

    setIsHost(host);
    setJoined(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      {!joined ? (
        <>
          <h2>🎬 Watch Party</h2>
          <input
            placeholder="Room ID"
            onChange={(e) => setRoomId(e.target.value)}
          />
          <br /><br />
          <button onClick={() => joinRoom(true)}>Create Room</button>
          <button onClick={() => joinRoom(false)}>Join Room</button>
        </>
      ) : (
        // <YouTubePlayer roomId={roomId} isHost={isHost} />
        <VideoPlayer roomId={roomId} isHost={isHost}/>
      )}
    </div>
  );
}

export default App;