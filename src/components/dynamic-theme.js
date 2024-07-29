import React, { useState, useEffect } from 'react';
import styles from '../styles/dynamic-theme.module.css';

const themes = [
  { text: "Innovation", color: "#7eb8b1" },
  { text: "Growth", color: "#b18e7e" },
  { text: "Resilience", color: "#8e7eb1" }
];

function DynamicTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme(prevTheme => {
        const currentIndex = themes.indexOf(prevTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        return themes[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={styles.dynamicTheme} style={{ color: currentTheme.color }}>
      {currentTheme.text}
    </span>
  );
}

export default DynamicTheme;