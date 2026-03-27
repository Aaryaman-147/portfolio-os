"use client";

import React, { useState } from "react";
import { useWindowManager } from "@/context/WindowManager";

export default function RunDialog() {
  const [input, setInput] = useState("");
  const { openWindow, closeWindow } = useWindowManager();

  const handleRun = () => {
    const cmd = input.toLowerCase().trim();
    
    // Map typed commands to your actual app IDs
    const commandMap: Record<string, { id: string, title: string }> = {
      "notepad": { id: "notepad", title: "aaryaman.exe" },
      "aaryaman.exe": { id: "notepad", title: "aaryaman.exe" },
      "mspaint": { id: "ms-paint", title: "untitled - Paint" },
      "paint": { id: "ms-paint", title: "untitled - Paint" },
      "iexplore": { id: "internet-explorer", title: "Internet Explorer" },
      "internet": { id: "internet-explorer", title: "Internet Explorer" },
      "documents": { id: "my-documents", title: "My Documents" }
    };

    if (commandMap[cmd]) {
      openWindow(commandMap[cmd].id, commandMap[cmd].title);
      closeWindow("run-dialog"); // Close the run dialog after success
    } else {
      alert(`Cannot find '${input}'. Make sure you typed the name correctly, and then try again.`);
    }
  };

  return (
    <div style={{ padding: "15px", backgroundColor: "#ece9d8", height: "100%", fontFamily: "Tahoma, sans-serif", fontSize: "12px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <div style={{ fontSize: "32px" }}>🏃‍♂️</div>
        <div>
          Type the name of a program, folder, or document, and Windows will open it for you.
          <br/><br/>
          {/* Replaced raw quotes with &quot; to fix the ESLint error */}
          <i>Try: &quot;notepad&quot;, &quot;mspaint&quot;, or &quot;iexplore&quot;</i>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <strong>Open:</strong>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRun()}
          style={{ flex: 1, padding: "2px 5px", border: "1px solid #7f9db9", backgroundColor: "#fff", color: "#000", colorScheme: "light" }}
          autoFocus
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "auto" }}>
        <button onClick={handleRun} style={{ width: "80px", padding: "2px", border: "1px solid #000" }}>OK</button>
        <button onClick={() => closeWindow("run-dialog")} style={{ width: "80px", padding: "2px", border: "1px solid #000" }}>Cancel</button>
      </div>
    </div>
  );
}