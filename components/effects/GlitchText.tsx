"use client";

import React, { useState, useEffect } from "react";
import { useGlitch } from "@/context/GlitchContext";

const CHARS = "!<>-_\\/[]{}—=+*^?#01";

export default function GlitchText({ text }: { text: string }) {
  const { isGlitching } = useGlitch();
  
  // We track the scrambled version separately
  const [scrambledText, setScrambledText] = useState(text);

  useEffect(() => {
    // If not glitching, do absolutely nothing in the effect. No state updates!
    if (!isGlitching) return;

    const scramble = () => {
      if (Math.random() > 0.3) {
        setScrambledText(text);
        return;
      }

      const textArray = text.split("");
      const numScrambles = Math.floor(Math.random() * 3) + 1; 
      
      for (let i = 0; i < numScrambles; i++) {
        const idx = Math.floor(Math.random() * textArray.length);
        if (textArray[idx] !== " ") {
          textArray[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setScrambledText(textArray.join(""));
    };

    const interval = setInterval(scramble, 150);
    
    // Cleanup function: runs when isGlitching turns false or component unmounts
    return () => {
      clearInterval(interval);
      setScrambledText(text); 
    };
  }, [isGlitching, text]);

  // If glitch mode is off, just render the normal prop directly.
  return <span>{isGlitching ? scrambledText : text}</span>;
}