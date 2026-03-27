"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type AppWindow = {
  id: string;
  title: string;
  isMinimized: boolean;
  zIndex: number;
};

type WindowContextType = {
  windows: AppWindow[];
  openWindow: (id: string, title: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
};

const WindowManagerContext = createContext<WindowContextType | undefined>(undefined);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [globalZIndex, setGlobalZIndex] = useState(50); // Starting above desktop background (z: 40)

  const openWindow = (id: string, title: string) => {
    setWindows((prev) => {
      if (prev.find((w) => w.id === id)) {
        focusWindow(id);
        return prev;
      }
      setGlobalZIndex((z) => z + 1);
      return [...prev, { id, title, isMinimized: false, zIndex: globalZIndex + 1 }];
    });
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const focusWindow = (id: string) => {
    setGlobalZIndex((z) => z + 1);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: globalZIndex + 1, isMinimized: false } : w
      )
    );
  };

  const toggleMinimize = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  };

  return (
    <WindowManagerContext.Provider
      value={{ windows, openWindow, closeWindow, focusWindow, toggleMinimize }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error("useWindowManager must be used within a WindowManagerProvider");
  }
  return context;
}