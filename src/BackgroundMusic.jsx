import React, { useState, useRef } from "react";
import audio from "./assets/007.mp3";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audio));

  const toggleAudio = () => {
    const audioElement = audioRef.current;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.loop = true;
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={toggleAudio}>
        {isPlaying ? "Stop Music" : "Play Music"}
      </button>
    </div>
  );
};

export default BackgroundMusic;
