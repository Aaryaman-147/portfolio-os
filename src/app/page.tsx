"use client";

import { WindowManagerProvider } from "@/context/WindowManager";
import { GlitchProvider } from "@/context/GlitchContext";
import Desktop from "@/components/os/Desktop";

export default function BackTo2006() {
  return (
    <GlitchProvider>
      <WindowManagerProvider>
        {/* We removed all the CRT, Framer Motion, and Phase logic. 
            Now it just renders the Desktop full-screen immediately. */}
        <main 
          style={{ 
            width: "100vw", 
            height: "100vh", 
            overflow: "hidden", 
            backgroundColor: "#000", /* Safe fallback behind the wallpaper */
          }}
        >
          <Desktop />
        </main>
      </WindowManagerProvider>
    </GlitchProvider>
  );
}