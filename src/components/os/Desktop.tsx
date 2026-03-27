"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useWindowManager } from "@/context/WindowManager";
import { useGlitch } from "@/context/GlitchContext";
import Window from "./Window";
import Taskbar from "./Taskbar";
import GlitchText from "@/components/effects/GlitchText"; // Import Text Glitch
import styles from "@/styles/os.module.css";
import glitchStyles from "@/styles/glitch.module.css"; // Import CSS Glitch
import MSPaint from "./apps/MSPaint"; // Add this line
import Image from "next/image";
import Notepad from "./apps/Notepad";
import InternetExplorer from "./apps/InternetExplorer";
import RunDialog from "./apps/RunDialog";
import SystemProperties from "./apps/SystemProperties";

export default function Desktop() {
  const { windows, openWindow } = useWindowManager();
  const { isGlitching, triggerGlitch, restoreMemory } = useGlitch();
  
  // 1. Change this to a string so we can show "LOADING..." while it fetches
  const [visitorCount, setVisitorCount] = useState<string>("LOADING...");
  
  // --- ADD THIS BLOCK ---
  useEffect(() => {
    // 2. Open the README immediately when the desktop mounts
    openWindow("README", "README.txt - Notepad");
    
    // 3. Fetch the REAL count from our new Upstash API!
    fetch('/api/counter')
      .then((res) => res.json())
      .then((data) => {
        if (data.count) {
          setVisitorCount(data.count.toString());
        }
      })
      .catch((err) => {
        console.error("Failed to fetch visitor count", err);
        setVisitorCount("ERROR"); // Fallback if the network drops
      });
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ----------------------

  const handleDoubleClick = (id: string, title: string) => {
    openWindow(id, title);
  };

  return (
    <> {/* <--- OPENING FRAGMENT TAG */}
      <style>{`
        .xp-cursor-env, .xp-cursor-env * {
          cursor: url('/assets/cursor.png'), default !important;
        }
        .xp-cursor-env a, .xp-cursor-env button, .xp-cursor-env [style*="cursor: pointer"], .xp-cursor-env [class*="cursor-pointer"] {
          cursor: url('/assets/pointer.png'), pointer !important;
        }
      `}</style>

      <div 
        className={`${styles.desktopContainer} ${isGlitching ? glitchStyles.glitchActive : ""} xp-cursor-env`}
        style={{
          filter: isGlitching ? "grayscale(0.6) sepia(0.2) contrast(1.1)" : "none",
          transition: "filter 3s ease-in-out",
          width: "100%",
          height: "100%",
          position: "relative",
          boxSizing: "border-box",
          overflow: "hidden"
          /* MAKE SURE YOU REMOVED the old cursor: url(...) line from here! */
        }}
      >
      
      {/* Desktop Icons Grid */}
      <div className={styles.iconGrid}>
        
        {/* My Computer */}
        <div 
          className={styles.desktopIcon} 
          onDoubleClick={() => handleDoubleClick("system-properties", "System Properties")}
        >
          <div style={{ fontSize: "32px", marginBottom: "4px" }}></div>
          <Image
            src="/assets/computer_explorer-2.png"
            alt="My Computer"
            width={48}
            height={48}
            className={styles.iconImage}
            draggable={false}
          />
          <span className={styles.iconText}><GlitchText text="My Computer" /></span>
        </div>

        {/* My Documents */}
        <div 
          className={styles.desktopIcon} 
          onDoubleClick={() => handleDoubleClick("my-documents", "My Documents")}
        >
          <Image 
            src="/assets/my-documents.png" 
            alt="My Documents" 
            width={48} 
            height={48} 
            className={styles.iconImage} 
            draggable={false} 
          />
          <span className={styles.iconText}><GlitchText text="My Documents" /></span>
        </div>
        
        {/* Recycle Bin */}
        <div 
          className={styles.desktopIcon} 
          onDoubleClick={() => handleDoubleClick("recycle-bin", "Recycle Bin")}
        >
          <Image 
            src="/assets/recycle-bin.png" 
            alt="Recycle Bin" 
            width={48} 
            height={48} 
            className={styles.iconImage} 
            draggable={false} 
          />
          <span className={styles.iconText}><GlitchText text="Recycle Bin" /></span>
        </div>

        {/* MS Paint */}
        <div 
          className={styles.desktopIcon} 
          onDoubleClick={() => handleDoubleClick("ms-paint", "untitled - Paint")}
        >
          <Image 
            src="/assets/paint.png" 
            alt="MS Paint" 
            width={48} 
            height={48} 
            className={styles.iconImage} 
            draggable={false} 
          />
          <span className={styles.iconText}><GlitchText text="MS Paint" /></span>
        </div>

        <div 
          className={styles.desktopIcon} 
          onDoubleClick={() => handleDoubleClick("notepad", "aaryaman.exe")}
        >
          <Image 
            src="/assets/avatar.png" 
            alt="aaryaman.exe" 
            width={48} 
            height={48} 
            className={styles.iconImage} 
            draggable={false} 
          />
          <span className={styles.iconText}><GlitchText text="aaryaman.exe" /></span>
        </div>

        {/* --- NEW README ICON (Absolute positioned to top right) --- */}
      <div 
        className={styles.desktopIcon} 
        style={{ 
          position: "absolute", 
          top: "20px", 
          right: "20px" 
        }}
        onDoubleClick={() => handleDoubleClick("README", "README.txt - Notepad")}
      >
        <Image 
          src="/assets/my-documents.png" /* Change this to a text file icon if you have one! */
          alt="README.txt" 
          width={48} 
          height={48} 
          className={styles.iconImage} 
          draggable={false} 
        />
        <span className={styles.iconText}><GlitchText text="README.txt" /></span>
      </div>

      </div>

      {/* Render all open windows */}
      <AnimatePresence>
        {windows.map((win, index) => (
          <Window 
            key={win.id} 
            id={win.id} 
            title={win.title}
            initialX={150 + (index * 30)}
            initialY={100 + (index * 30)}
            defaultWidth={
  win.id === "notepad"  ? 625 : 
  win.id === "README" ? 600 :
  win.id === "internet-explorer" ? 850 : 
  win.id === "system-properties" ? 420 :
  win.id === "run-dialog" ? 400 : 
  400
  
}
defaultHeight={
  win.id === "notepad"  ? 560 : 
  win.id === "README" ? 300 :
  win.id === "internet-explorer" ? 710 : 
  win.id === "run-dialog" ? 220 : 
  win.id === "system-properties" ? 450 :
  300
}
          >
            {/* Conditional Rendering based on which window is open */}
            {win.id === "my-documents" ? (
              <div style={{ display: "flex", gap: "20px", padding: "10px", backgroundColor: "#fff", height: "100%" }}>
                
                {/* File 1: Playlist - NOW INTERACTIVE */}
                <div 
                   style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", width: "80px" }}
                   onDoubleClick={() => openWindow("summer-playlist", "summer_playlist.m3u")}
                >
                  <div style={{ fontSize: "32px" }}>🎵</div>
                  <span style={{ fontSize: "11px", textAlign: "center", marginTop: "4px", color: "#000" }}>summer_playlist.m3u</span>
                </div>

                {/* File 2: Photo Album - NOW INTERACTIVE */}
                <div 
                   style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", width: "80px" }}
                   onDoubleClick={() => openWindow("photo-album", "photo_album.exe")}
                >
                  <div style={{ fontSize: "32px" }}>🖼️</div>
                  <span style={{ fontSize: "11px", textAlign: "center", marginTop: "4px", color: "#000" }}>photo_album.exe</span>
                </div>

              </div>
            ) : win.id === "recycle-bin" ? (
               // ... (recycle bin code stays same)
              <div style={{ padding: "10px", backgroundColor: "#fff", height: "100%", color: "#666", fontStyle: "italic" }}>
                This folder is empty.
              </div>
            ) : win.id === "ms-paint" ? (
               // ... (ms paint code stays same)
              <div style={{ width: "100%", height: "100%", overflow: "hidden", display: "flex" }}>
                <MSPaint />
              </div>
              
              ) : win.id === "README" ? (
              <div style={{ backgroundColor: "#fff", height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
                {/* Classic Notepad Menu Bar */}
                <div style={{ display: "flex", gap: "15px", padding: "2px 8px", borderBottom: "1px solid #ece9d8", backgroundColor: "#fff", color: "#000", fontSize: "12px", fontFamily: "Tahoma", userSelect: "none" }}>
                </div>
                {/* Notepad Text Area */}
                <textarea 
                  readOnly
                  style={{ 
                    flex: 1, 
                    border: "none", 
                    outline: "none", 
                    resize: "none", 
                    padding: "4px", 
                    fontFamily: "'Lucida Console', monospace", 
                    fontSize: "13px",
                    backgroundColor: "#ffffff", /* Forces white background */
                    color: "#000000"            /* Forces black text */
                  }}
                  value={`Hii, this is Aaryaman 🙋🏻! Welcome to my portfolio!

I'm Aaryaman, a Biotechnology undergrad with a passion for web development and creative coding. 

Feel free to drag windows around, click on the icons, and explore the system. 

Check out my Resume or open the Start Menu to see more.


================================================
           YOU ARE VISITOR #${visitorCount}
================================================`}
                />
              </div>
            /* -------- NEW WINDOWS DEFINITIONS -------- */
            ) : win.id === "notepad" ? (
              // Increased width and height to give it a proper "Document" size!
              <div style={{ width: "600px", height: "600px", overflow: "hidden", display: "flex" }}>
                <Notepad />
              </div>
              ) : win.id === "internet-explorer" ? (
          <div style={{ width: "100%", height: "100%", overflow: "hidden", display: "flex" }}>
            <InternetExplorer />
          </div>
          ) : win.id === "run-dialog" ? (
           <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
             <RunDialog />
           </div>
           ) : win.id === "system-properties" ? (
              <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                <SystemProperties />
              </div>
            ) :
            win.id === "summer-playlist" ? (
                <div style={{ padding: "20px", backgroundColor: "#fff", height: "100%", color: "#000", fontFamily: "Tahoma" }}>
                  <h3>Winamp Playlist</h3>
                  <ul>
                    <li>1. Green Day - Holiday</li>
                    <li>2. Gorillaz - Feel Good Inc.</li>
                    <li>3. The Killers - Mr. Brightside</li>
                  </ul>
                </div>
             ) : win.id === "photo-album" ? (
                <div style={{ padding: "20px", backgroundColor: "#fff", height: "100%", color: "#000", fontFamily: "Tahoma", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <p>Starting slideshow...</p>
                  {/* You could put an actual <Image> here later */}
                </div>
             /* ----------------------------------------- */
            ) : (
              <div style={{ padding: "10px", backgroundColor: "#fff", height: "100%", color: "#000" }}>
                {/* Default content for items like Notepad/Run opened from start menu */}
                Application content for {win.title} goes here.
              </div>
            )}
          </Window>
        ))}
      </AnimatePresence>

      <Taskbar />

      {/* Trigger Button - Leaving it visible so you can test it! */}
      <div 
        onClick={isGlitching ? restoreMemory : triggerGlitch}
        style={{
          position: "absolute",
          bottom: "40px",
          right: "10px",
          width: "20px",
          height: "20px",
          backgroundColor: isGlitching ? "green" : "red",
          border: "2px solid white",
          cursor: "pointer",
          zIndex: 9000
        }}
        title="Toggle Memory Decay"
      />
      
    </div>
    </>
  );
}