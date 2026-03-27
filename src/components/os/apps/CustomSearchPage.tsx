"use client";

import React, { useState } from "react";

interface CustomSearchProps {
  onSearch: (query: string) => void;
  onOpenNewTab: (url: string) => void;
}

export default function CustomSearchPage({ onSearch }: CustomSearchProps) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}>
      
      {/* Top Right Links - NOW CLICKABLE! */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "flex-end", padding: "15px", gap: "15px", fontSize: "13px" }}>
        <span 
          style={{ cursor: "pointer", textDecoration: "underline", color: "#1111cc" }} 
          onClick={() => alert("Check out the 'aaryaman.exe' file on my desktop for my full resume!")}
        >
          About Me
        </span>
        <span 
          style={{ color: "#1111cc", textDecoration: "underline", cursor: "pointer" }}
          onClick={() => window.open("https://github.com/Aaryaman-147")}
        >
          GitHub
        </span>
        <span 
          style={{ color: "#1111cc", textDecoration: "underline", cursor: "pointer" }}
          onClick={() => window.open("https://linkedin.com/in/aaryaman-arora")}
        >
          LinkedIn
        </span>
      </div>

      {/* Main Content Centered */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "-100px", position: "relative", zIndex: 1 }}>
        
        {/* The "Aaryaman" Logo */}
        <div style={{ fontSize: "80px", fontFamily: "'Times New Roman', Times, serif", fontWeight: "bold", letterSpacing: "-2px", marginBottom: "20px" }}>
          <span style={{ color: "#2A5DB0" }}>A</span>
          <span style={{ color: "#D2322D" }}>a</span>
          <span style={{ color: "#F4B400" }}>r</span>
          <span style={{ color: "#2A5DB0" }}>y</span>
          <span style={{ color: "#008744" }}>a</span>
          <span style={{ color: "#D2322D" }}>m</span>
          <span style={{ color: "#2A5DB0" }}>a</span>
          <span style={{ color: "#F4B400" }}>n</span>
        </div>

        {/* Search Bar - DARK MODE FIX APPLIED */}
        <div style={{ display: "flex", width: "500px", border: "1px solid #d9d9d9", padding: "5px 10px", borderRadius: "2px", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)", backgroundColor: "#ffffff" }}>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ 
              flex: 1, 
              border: "none", 
              outline: "none", 
              fontSize: "16px", 
              backgroundColor: "#ffffff", 
              color: "#000000",
              colorScheme: "light" // Forces light mode for this input
            }}
            title="Search Projects"
          />
        </div>

        {/* Search Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button 
            onClick={() => onSearch(query)}
            style={{ padding: "5px 15px", fontSize: "13px", backgroundColor: "#f2f2f2", border: "1px solid #c6c6c6", borderRadius: "2px", cursor: "pointer", color: "#444" }}
          >
            Aaryaman Search
          </button>
          <button 
            style={{ padding: "5px 15px", fontSize: "13px", backgroundColor: "#f2f2f2", border: "1px solid #c6c6c6", borderRadius: "2px", cursor: "pointer", color: "#444" }}
            onClick={() => alert("I am a 19-year-old creative developer and data science student. Welcome to my portfolio!")}
          >
            I&apos;m Feeling Lucky
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: "#f2f2f2", borderTop: "1px solid #e4e4e4", padding: "10px", display: "flex", justifyContent: "center", fontSize: "13px", color: "#666" }}>
        <span>Based in Patiala, India • Developer & Researcher • aaryaman1407@gmail.com</span>
      </div>
    </div>
  );
}