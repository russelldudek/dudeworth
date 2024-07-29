import React from 'react';
import styles from '../styles/dark-mode-switch.module.css';

const DarkModeSwitch = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button className={styles.switch} onClick={toggleDarkMode} aria-label="Toggle dark mode">
      <img 
        src={isDarkMode ? "/images/light.svg" : "/images/dark.svg"} 
        alt={isDarkMode ? "Switch to light mode" : "Switch to dark mode"} 
        className={styles.icon}
      />
    </button>
  );
};

export default DarkModeSwitch;