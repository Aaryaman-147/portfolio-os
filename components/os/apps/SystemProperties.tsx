"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useWindowManager } from "@/context/WindowManager";

export default function SystemProperties() {
  const { closeWindow } = useWindowManager();
  const [activeTab, setActiveTab] = useState("aaryaman");

  const tabs = ["aaryaman"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#ece9d8", fontFamily: "Tahoma, sans-serif", fontSize: "11px", color: "#000" }}>
      
      {/* Tabs Bar */}
      <div style={{ display: "flex", padding: "5px 5px 0 5px", borderBottom: "1px solid #fff", zIndex: 1 }}>
        {tabs.map(tab => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "4px 8px",
              backgroundColor: activeTab === tab ? "#fff" : "#ece9d8",
              borderTop: "1px solid #999",
              borderLeft: "1px solid #999",
              borderRight: "1px solid #999",
              borderBottom: activeTab === tab ? "1px solid #fff" : "1px solid #999",
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
              marginTop: activeTab === tab ? "0" : "2px",
              cursor: "pointer",
              position: "relative",
              bottom: "-1px",
              zIndex: activeTab === tab ? 2 : 1
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, backgroundColor: "#fff", border: "1px solid #999", margin: "0 5px 5px 5px", padding: "15px", display: "flex", gap: "20px" }}>
        
        {/* Left Side: Windows Logo */}
        <div style={{ width: "120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: "60px", marginBottom: "10px" }}>🪟</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#0054E3", textAlign: "center" }}>Windows XP</div>
          <div style={{ fontSize: "10px", color: "#ff6600", fontWeight: "bold" }}>Professional</div>
        </div>

        {/* Right Side: Specs */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
          
          <div>
            <div style={{ fontWeight: "bold" }}>System:</div>
            <div style={{ marginLeft: "15px" }}>Microsoft Windows XP</div>
            <div style={{ marginLeft: "15px" }}>Professional</div>
            <div style={{ marginLeft: "15px" }}>Version 2002</div>
            <div style={{ marginLeft: "15px" }}>Service Pack 3</div>
          </div>

          <div>
            <div style={{ fontWeight: "bold" }}>Registered to:</div>
            <div style={{ marginLeft: "15px" }}>Aaryaman</div>
            <div style={{ marginLeft: "15px" }}>Developer & Researcher</div>
            <div style={{ marginLeft: "15px" }}>1407-OEM-0011903-00100</div>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <div style={{ fontSize: "30px" }}>💻</div>
            <div>
              <div style={{ fontWeight: "bold" }}>Computer:</div>
              <div style={{ marginLeft: "15px" }}>Aaryaman Engine v19.0</div>
              <div style={{ marginLeft: "15px" }}>Biotechnology & AI Core</div>
              <div style={{ marginLeft: "15px" }}>React, Next.js, Python, Flutter</div>
              <div style={{ marginLeft: "15px" }}>1.00 TB of Coffee</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}