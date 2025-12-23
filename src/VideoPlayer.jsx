import React, { useEffect, useRef } from "react";
import { socket } from "./socket";

const VideoPlayer = ({ roomId, isHost }) => {
  const videoRef = useRef(null);

  const emitEvent = (action) => {
    socket.emit("video-event", {
      roomId,
      action,
      time: videoRef.current.currentTime
    });
  };

  useEffect(() => {
    socket.on("video-event", ({ action, time }) => {
      videoRef.current.currentTime = time;
      action === "play"
        ? videoRef.current.play()
        : videoRef.current.pause();
    });
  }, []);

  return (
    <video
      ref={videoRef}
      width="800"
      controls
      onPlay={() => isHost && emitEvent("play")}
      onPause={() => isHost && emitEvent("pause")}
    >
      <source src="/sample1.mp4" type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
