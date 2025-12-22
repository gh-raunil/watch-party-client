import YouTube from "react-youtube";
import { socket } from "./socket";
import { useEffect, useRef } from "react";

export default function YouTubePlayer({ roomId, isHost }) {
  const playerRef = useRef(null);

  const onReady = (e) => {
    playerRef.current = e.target;
  };

  useEffect(() => {
    socket.on("yt-event", ({ action, time }) => {
      if (!playerRef.current) return;

      playerRef.current.seekTo(time, true);
      action === "play"
        ? playerRef.current.playVideo()
        : playerRef.current.pauseVideo();
    });
  }, []);

  const send = (action) => {
    if (!isHost || !playerRef.current) return;

    socket.emit("yt-event", {
      roomId,
      action,
      time: playerRef.current.getCurrentTime()
    });
  };

  return (
    <YouTube
      videoId="dQw4w9WgXcQ" // any YouTube video ID
      opts={{ width: "800", height: "450", playerVars: { autoplay: 0 } }}
      onReady={onReady}
      onPlay={() => send("play")}
      onPause={() => send("pause")}
    />
  );
}
