import React, { useState, useRef } from "react";
import audio from "./assets/007.mp3";

import Button from "react-bootstrap/Button";

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
      <Button variant="light" onClick={toggleAudio} className="musicbutton" style={{ marginTop: "10px" }}>
        {isPlaying ? "Stop Music" : "Play Music"}
      </Button>
    </div>
  );
};

export default BackgroundMusic;
