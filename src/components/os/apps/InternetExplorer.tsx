"use client";

import React, { useState } from "react";
import CustomSearchPage from "./CustomSearchPage";
import { useWindowManager } from "@/context/WindowManager";

const HOME_URL = "https://search.aaryaman.os";

interface TabData {
  id: number;
  url: string;
  inputUrl: string;
  isLoading: boolean;
  iframeKey: number;
}

const INITIAL_TAB_ID = 1;

export default function InternetExplorer() {
  const { closeWindow } = useWindowManager();
  
  // Tab System State
  const [tabs, setTabs] = useState<TabData[]>([{ 
    id: INITIAL_TAB_ID, url: HOME_URL, inputUrl: HOME_URL, isLoading: false, iframeKey: 0 
  }]);
  const [activeTabId, setActiveTabId] = useState<number>(INITIAL_TAB_ID);
  
  // Menu State
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  // Helper to update just the current tab
  const updateActiveTab = (updates: Partial<TabData>) => {
    setTabs(tabs.map(t => t.id === activeTabId ? { ...t, ...updates } : t));
  };

  const handleNavigate = (urlToLoad?: string) => {
    let finalUrl = urlToLoad || activeTab.inputUrl;
    if (finalUrl !== HOME_URL && !finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }
    
    updateActiveTab({ url: finalUrl, inputUrl: finalUrl, isLoading: true });
    
    if (finalUrl === HOME_URL) {
      setTimeout(() => updateActiveTab({ isLoading: false }), 200);
    }
    setActiveMenu(null);
  };

  const handleNewTab = (url: string = HOME_URL) => {
    const newTab: TabData = { 
      id: Date.now(), url, inputUrl: url, isLoading: true, iframeKey: 0 
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    
    if (url === HOME_URL) {
      setTimeout(() => {
        setTabs(curr => curr.map(t => t.id === newTab.id ? { ...t, isLoading: false } : t));
      }, 200);
    }
    setActiveMenu(null);
  };

  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      closeWindow("internet-explorer");
      return;
    }
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) setActiveTabId(newTabs[newTabs.length - 1].id);
  };

  const handleSearchTrigger = (query: string) => {
    if (query.startsWith("http")) {
      handleNavigate(query);
    } else if (query.trim() !== "") {
      // Changed to Wikipedia which allows iframes! No more refused to connect errors.
      handleNavigate(`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div 
      style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", backgroundColor: "#ece9d8", fontFamily: "Tahoma, sans-serif" }}
      onClick={() => setActiveMenu(null)}
    >
      {/* 1. Menu Bar */}
      <div style={{ display: "flex", borderBottom: "1px solid #ccc", padding: "2px 5px", fontSize: "11px", gap: "10px", color: "#000", position: "relative", zIndex: 100 }}>
        
        {/* FILE MENU */}
        <div style={{ position: "relative" }}>
          <span style={{ cursor: "pointer", padding: "2px 5px", backgroundColor: activeMenu === "file" ? "#316ac5" : "transparent", color: activeMenu === "file" ? "#fff" : "#000" }} onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === "file" ? null : "file"); }}>
            <u>F</u>ile
          </span>
          {activeMenu === "file" && (
            <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#fff", border: "1px solid #999", boxShadow: "2px 2px 3px rgba(0,0,0,0.3)", minWidth: "150px", display: "flex", flexDirection: "column", padding: "2px" }}>
              <div style={{ padding: "3px 10px", cursor: "pointer", color: "#000" }} onClick={() => handleNewTab(HOME_URL)}>New Tab</div>
              <div style={{ height: "1px", backgroundColor: "#ccc", margin: "3px 0" }} />
              <div style={{ padding: "3px 10px", cursor: "pointer", color: "#000" }} onClick={(e) => closeTab(activeTabId, e)}>Close Tab</div>
              <div style={{ padding: "3px 10px", cursor: "pointer", color: "#000" }} onClick={() => closeWindow("internet-explorer")}>Exit Browser</div>
            </div>
          )}
        </div>

        {/* EDIT & VIEW MENUS */}
        
        <div style={{ position: "relative" }}>
          <span style={{ cursor: "pointer", padding: "2px 5px", backgroundColor: activeMenu === "view" ? "#316ac5" : "transparent", color: activeMenu === "view" ? "#fff" : "#000" }} onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === "view" ? null : "view"); }}><u>V</u>iew</span>
          {activeMenu === "view" && (
            <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#fff", border: "1px solid #999", boxShadow: "2px 2px 3px rgba(0,0,0,0.3)", minWidth: "150px", display: "flex", flexDirection: "column", padding: "2px" }}>
              <div style={{ padding: "3px 10px", cursor: "pointer", color: "#000" }} onClick={() => { updateActiveTab({ iframeKey: activeTab.iframeKey + 1, isLoading: true }); setTimeout(() => updateActiveTab({ isLoading: false }), 500); setActiveMenu(null); }}>Refresh Page</div>
            </div>
          )}
        </div>

        {/* FAVORITES MENU */}
        <div style={{ position: "relative" }}>
          <span style={{ cursor: "pointer", padding: "2px 5px", backgroundColor: activeMenu === "fav" ? "#316ac5" : "transparent", color: activeMenu === "fav" ? "#fff" : "#000" }} onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === "fav" ? null : "fav"); }}>
            F<u>a</u>vorites
          </span>
          {activeMenu === "fav" && (
            <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#fff", border: "1px solid #999", boxShadow: "2px 2px 3px rgba(0,0,0,0.3)", minWidth: "180px", display: "flex", flexDirection: "column", padding: "2px" }}>
              <div style={{ padding: "3px 10px", color: "#666", fontWeight: "bold" }}>⭐️ Bookmarks</div>
              <div style={{ height: "1px", backgroundColor: "#ccc", margin: "3px 0" }} />
              <div style={{ padding: "3px 10px", cursor: "pointer", color: "#000" }} onClick={() => window.open("https://github.com/Aaryaman-147")}>GitHub Profile</div>
              <div style={{ padding: "3px 10px", cursor: "pointer", color: "#000" }} onClick={() => window.open("https://linkedin.com/in/aaryaman-arora")}>LinkedIn Profile</div>
            </div>
          )}
        </div>

        <span style={{ cursor: "pointer", padding: "2px 5px" }} onClick={() => alert("Internet Explorer 7 with Tabs!")}><u>H</u>elp</span>
      </div>

      {/* 2. Standard Buttons */}
      <div style={{ display: "flex", alignItems: "center", padding: "5px", borderBottom: "1px solid #ccc", gap: "15px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", opacity: 0.5 }}>
          <span style={{ fontSize: "18px" }}>⬅️</span><span style={{ fontSize: "11px", color: "#000" }}>Back</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", opacity: 0.5 }}>
          <span style={{ fontSize: "18px" }}>➡️</span>
        </div>
        <div onClick={() => { updateActiveTab({ iframeKey: activeTab.iframeKey + 1, isLoading: true }); setTimeout(() => updateActiveTab({ isLoading: false }), 500); }} style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", padding: "2px 5px" }} title="Refresh">
          <span style={{ fontSize: "16px" }}>🔄</span>
        </div>
        <div onClick={() => handleNavigate(HOME_URL)} style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", padding: "2px 5px" }} title="Home">
          <span style={{ fontSize: "16px" }}>🏠</span>
        </div>
      </div>

      {/* Address Bar */}
      <div style={{ display: "flex", alignItems: "center", padding: "5px", borderBottom: "2px solid #ccc", gap: "10px" }}>
        <span style={{ fontSize: "11px", color: "#666" }}>Address</span>
        <div style={{ display: "flex", flex: 1, backgroundColor: "#fff", border: "1px solid #7f9db9", padding: "2px", alignItems: "center" }}>
          <span style={{ fontSize: "14px", marginRight: "5px" }}>📄</span>
          <input 
            type="text" 
            value={activeTab.inputUrl}
            onChange={(e) => updateActiveTab({ inputUrl: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
            style={{ border: "none", outline: "none", width: "100%", fontSize: "12px", backgroundColor: "#ffffff", color: "#000000", colorScheme: "light" }}
          />
        </div>
        <button onClick={() => handleNavigate()} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
          <span style={{ fontSize: "16px" }}>➡️</span><span style={{ fontSize: "11px", color: "#000" }}>Go</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div style={{ display: "flex", backgroundColor: "#d4d0c8", borderBottom: "1px solid #999", padding: "4px 5px 0 5px", gap: "2px" }}>
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            onClick={() => setActiveTabId(tab.id)}
            style={{ 
              padding: "4px 10px", 
              backgroundColor: activeTabId === tab.id ? "#fff" : "#ece9d8", 
              border: "1px solid #999", 
              borderBottom: activeTabId === tab.id ? "1px solid #fff" : "1px solid #999",
              borderTopLeftRadius: "4px", borderTopRightRadius: "4px", 
              cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", 
              fontSize: "11px", color: "#000",
              position: "relative", top: activeTabId === tab.id ? "1px" : "0"
            }}
          >
            <span>{tab.url === HOME_URL ? "Aaryaman Search" : "Web Page"}</span>
            <span onClick={(e) => closeTab(tab.id, e)} style={{ fontSize: "10px", color: "#666", padding: "0 4px", borderRadius: "2px", backgroundColor: "#eee" }}>x</span>
          </div>
        ))}
        <div onClick={() => handleNewTab(HOME_URL)} style={{ padding: "4px 10px", cursor: "pointer", fontSize: "14px", color: "#333", display: "flex", alignItems: "center" }}>+</div>
      </div>

      {/* Browser Content */}
      <div style={{ flex: 1, backgroundColor: "#fff", position: "relative", overflow: "hidden" }}>
        {activeTab.isLoading && <div style={{ position: "absolute", top: 10, left: 10, fontSize: "12px", color: "#666", zIndex: 10 }}>Loading...</div>}

        {activeTab.url === HOME_URL ? (
          <CustomSearchPage onSearch={handleSearchTrigger} onOpenNewTab={handleNewTab} />
        ) : (
          <iframe 
            key={`${activeTab.id}-${activeTab.iframeKey}`}
            src={activeTab.url}
            onLoad={() => updateActiveTab({ isLoading: false })}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="IE Content"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        )}
      </div>

      {/* Status Bar */}
      <div style={{ display: "flex", borderTop: "1px solid #ccc", padding: "2px 10px", fontSize: "11px", color: "#000", backgroundColor: "#ece9d8" }}>
        <span style={{ marginLeft: "auto" }}>🌐 Internet</span>
      </div>
    </div>
  );
}