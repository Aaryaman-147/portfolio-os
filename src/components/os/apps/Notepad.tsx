"use client";

import React from "react";
// Import your actual Resume component. Adjust path if necessary.
import Resume from "../Resume";

export default function Notepad() {
  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto", backgroundColor: "#ECE9D8" }}>
      
      {/* Because your Resume.tsx has its own hardcoded "xp-window" and "xp-titlebar" 
        built into it, rendering it inside our WindowManager would create a double-window.
        This local <style> block dynamically strips away the extra layers from your Resume 
        so it perfectly embeds into our OS window!
      */}
      <style>{`
        .xp-desktop { 
          padding: 0 !important; 
          min-height: 0 !important; 
          background-color: #ECE9D8 !important; 
        }
        .xp-window { 
          width: 100% !important; 
          border: none !important; 
          box-shadow: none !important; 
          border-radius: 0 !important; 
        }
        .xp-titlebar { 
          display: none !important; 
        }
      `}</style>

      {/* Renders your exact React file with all its own logic & CSS */}
      <Resume />
      
    </div>
  );
}