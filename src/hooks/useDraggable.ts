"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

export function useDraggable(initialPosition: Position) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  
  // We use a ref to track the offset (where exactly on the title bar you clicked)
  // so the window doesn't violently snap its top-left corner to your cursor.
  const dragOffset = useRef<Position>({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [position]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Prevent highlighting text while dragging
      e.preventDefault(); 
      
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Attach to the global window so dragging works even if the mouse leaves the div
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return { position, isDragging, handleMouseDown };
}