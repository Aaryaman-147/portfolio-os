"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useWindowManager } from "@/context/WindowManager";
import { useDraggable } from "@/hooks/useDraggable";
import styles from "@/styles/window.module.css";

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  initialX?: number;
  initialY?: number;
  defaultWidth?: number;  // ADD THIS
  defaultHeight?: number; // ADD THIS
}

export default function Window({ id, title, children, initialX = 100, initialY = 100, defaultWidth = 600, defaultHeight = 500 }: WindowProps) {
  const { windows, focusWindow, closeWindow } = useWindowManager();
  
  // Find this specific window's state from the context
  const windowState = windows.find((w) => w.id === id);
  
  // Initialize the drag hook with starting coordinates
  const { position, handleMouseDown } = useDraggable({ x: initialX, y: initialY });

  // If the window isn't open in the context, don't render it
  if (!windowState) return null;

  // When clicking anywhere on the window, bring it to the front
  const handleFocus = () => {
    focusWindow(id);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={styles.windowContainer}
      onMouseDown={handleFocus}
      style={{
        left: position.x,
        top: position.y,
        zIndex: windowState.zIndex,
        minHeight: "250px",
        display: windowState.isMinimized ? "none" : "flex",
        width: defaultWidth,   // USE THE PROP HERE
        height: defaultHeight, // USE THE PROP HERE
      }}
    >
      {/* Title Bar (The draggable area) */}
      <div 
        className={`${styles.titleBar} ${styles.draggable}`} 
        onMouseDown={handleMouseDown}
      >
        <span className={styles.titleText}>{title}</span>
        
        {/* Window Controls */}
        <div className={styles.controls} onMouseDown={(e) => e.stopPropagation()}>
          <button 
            className={styles.controlButton} 
            onClick={() => closeWindow(id)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className={styles.contentArea}>
        {children}
      </div>
    </motion.div>
  );
}