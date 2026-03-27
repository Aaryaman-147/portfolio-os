"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWindowManager } from "@/context/WindowManager";
import styles from "@/styles/taskbar.module.css";
import StartMenu from "./StartMenu"; // Assumes it is now in components/os/

export default function Taskbar() {
  const { windows, focusWindow, toggleMinimize } = useWindowManager();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [time, setTime] = useState("");
  const taskbarRef = useRef<HTMLDivElement>(null);

  // 1. Clock Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Click Outside Logic (Closes Start Menu)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (taskbarRef.current && !taskbarRef.current.contains(event.target as Node)) {
        setIsStartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabClick = (id: string, isMinimized: boolean) => {
    if (isMinimized) {
      toggleMinimize(id);
      focusWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className={styles.taskbar} ref={taskbarRef}>
      {/* Pass the onClose handler so clicking an item closes the menu */}
      {isStartOpen && <StartMenu onClose={() => setIsStartOpen(false)} />}

      {/* Start Button */}
      <button 
        className={`${styles.startButton} ${isStartOpen ? styles.active : ""}`}
        onClick={() => setIsStartOpen(!isStartOpen)}
      >
        <div className={styles.startLogo}>
           {/* Simple CSS Windows Flag */}
           <div className={styles.flagSquare} style={{ backgroundColor: "#f44336" }}></div>
           <div className={styles.flagSquare} style={{ backgroundColor: "#4caf50" }}></div>
           <div className={styles.flagSquare} style={{ backgroundColor: "#2196f3" }}></div>
           <div className={styles.flagSquare} style={{ backgroundColor: "#ffeb3b" }}></div>
        </div>
        <span>start</span>
      </button>

      {/* Window Tabs (Tasks) */}
      <div className={styles.windowTabs}>
        {windows.map((win) => (
          <div 
            key={win.id}
            className={`${styles.tab} ${!win.isMinimized ? styles.activeTab : ""}`}
            onClick={() => handleTabClick(win.id, win.isMinimized)}
          >
            <span className={styles.tabText}>{win.title}</span>
          </div>
        ))}
      </div>

      {/* System Tray */}
      <div className={styles.systemTray}>
        <div className={styles.trayIcons}>
          <span>🔊</span>
          <span>🛡️</span>
        </div>
        <span className={styles.clock}>{time}</span>
      </div>
    </div>
  );
}