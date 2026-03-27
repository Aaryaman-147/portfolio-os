"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "@/styles/paint.module.css";

const COLORS = [
  "#000000", "#808080", "#ff0000", "#800000", 
  "#ffff00", "#808000", "#00ff00", "#008000", 
  "#00ffff", "#008080", "#0000ff", "#000080", 
  "#ff00ff", "#800080", "#ffffff", "#c0c0c0"
];

export default function MSPaint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");

  // Initialize canvas with a white background on first load
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Fill the background with white first
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Automatically draw "hi i'm aaryaman"
    ctx.font = "32px 'Comic Sans MS', cursive, sans-serif"; // Classic Paint vibe
    ctx.fillStyle = "black";
    ctx.fillText("hi i'm aaryaman!", 50, 100); // 50px from left, 100px from top

    // 3. Draw a little smiley face for extra flavor
    ctx.beginPath();
    ctx.arc(120, 150, 20, 0, Math.PI * 2, true); // Face
    ctx.moveTo(110, 145);
    ctx.arc(110, 145, 2, 0, Math.PI * 2, true);  // Left Eye
    ctx.moveTo(130, 145);
    ctx.arc(130, 145, 2, 0, Math.PI * 2, true);  // Right Eye
    ctx.moveTo(105, 155);
    ctx.arc(120, 155, 10, 0, Math.PI, false);    // Smile
    ctx.stroke();

  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.closePath();
    setIsDrawing(false);
  };

  return (
    <div className={styles.paintContainer}>
      
      {/* Left Toolbar */}
      <div className={styles.toolbar}>
        <div style={{ fontSize: "10px", textAlign: "center", margin: "5px 0" }}>Colors</div>
        <div className={styles.colorGrid}>
          {COLORS.map((c) => (
            <div 
              key={c} 
              className={styles.colorSwatch} 
              style={{ backgroundColor: c, border: color === c ? '2px solid blue' : '1px solid #808080' }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      {/* The Workspace & Canvas */}
      <div className={styles.workspace}>
        <div className={styles.canvasWrapper}>
          <canvas
            ref={canvasRef}
            width={600}  // Internal pixel resolution width
            height={400} // Internal pixel resolution height
            className={styles.drawCanvas}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing} // Stop drawing if mouse leaves canvas
          />
        </div>
      </div>
      
    </div>
  );
}