"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type GlitchContextType = {
  isGlitching: boolean;
  triggerGlitch: () => void;
  restoreMemory: () => void;
};

const GlitchContext = createContext<GlitchContextType | undefined>(undefined);

export function GlitchProvider({ children }: { children: ReactNode }) {
  const [isGlitching, setIsGlitching] = useState(false);

  // Turns on the memory decay mode
  const triggerGlitch = () => setIsGlitching(true);

  // Restores the OS back to its pristine nostalgic state
  const restoreMemory = () => setIsGlitching(false);

  return (
    <GlitchContext.Provider value={{ isGlitching, triggerGlitch, restoreMemory }}>
      {children}
    </GlitchContext.Provider>
  );
}

export function useGlitch() {
  const context = useContext(GlitchContext);
  if (!context) {
    throw new Error("useGlitch must be used within a GlitchProvider");
  }
  return context;
}