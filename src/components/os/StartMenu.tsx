"use client";

import React from "react";
import styles from "@/styles/taskbar.module.css";
import Image from "next/image";
import { useWindowManager } from "@/context/WindowManager";

// Define the props accepted by the component
interface StartMenuProps {
  onClose: () => void;
}

export default function StartMenu({ onClose }: StartMenuProps) {
  const { openWindow } = useWindowManager();

  // Helper function to open an app and close the menu
  const handleMenuClick = (id: string, title: string) => {
    openWindow(id, title);
    onClose();
  };

  return (
    <div className={styles.startMenu}>
      {/* Header with Profile Pic */}
      <div className={styles.startHeader}>
        <div className={styles.userIcon}>
          <Image 
            src="/assets/profile - copy.jpg" // Make sure this file exists!
            alt="User"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <span className={styles.userName}>Aaryaman</span>
      </div>

      {/* Columns */}
      <div className={styles.menuBody}>
        <div className={styles.leftColumn}>
          <div 
            className={styles.menuItem} 
            onClick={() => handleMenuClick("internet-explorer", "Internet Explorer")}
          >
            <span>🌐</span> <strong>Internet</strong>
          </div>
          <div className={styles.menuItem}>
            <span>✉️</span> <strong>E-mail</strong>
          </div>
          <div className={styles.separator} />
          
          {/* Functional Menu Items */}
          <div className={styles.menuItem} onClick={() => handleMenuClick("ms-paint", "untitled - Paint")}>
            🖼️ MS Paint
          </div>
          <div className={styles.menuItem} onClick={() => handleMenuClick("notepad", "aaryaman.exe")}>
            📝 aaryaman.exe
          </div>
        </div>

        <div className={styles.rightColumn}>
          {/* Functional System Folders */}
          <div className={`${styles.menuItem} ${styles.boldText}`} onClick={() => handleMenuClick("my-documents", "My Documents")}>
            📁 My Documents
          </div>
          <div className={`${styles.menuItem} ${styles.boldText}`} onClick={() => handleMenuClick("my-pictures", "My Pictures")}>
            🖼️ My Pictures
          </div>
          <div className={`${styles.menuItem} ${styles.boldText}`} onClick={() => handleMenuClick("my-music", "My Music")}>
            🎵 My Music
          </div>
          <div className={styles.separator} />
          <div className={styles.menuItem}>Control Panel</div>
          <div className={styles.menuItem} onClick={() => handleMenuClick("run-dialog", "Run")}>
            Run...
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.startFooter}>
        <button className={styles.footerButton}>🔑 Log Off</button>
        <button className={styles.footerButton} onClick={onClose}>🔴 Turn Off</button>
      </div>
    </div>
  );
}