import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/theme-context';
import { scrollToSection } from '../utils/scroll';
import styles from '../styles/header.module.css';

function Header({ showAITools }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleMouseEnter = () => {
    setIsToggleHovered(true);
  };

  const handleToggleMouseLeave = () => {
    setIsToggleHovered(false);
  };

  const getToggleIcon = () => {
    if (isToggleHovered) {
      return "/images/green.svg";
    }
    return isDarkMode ? "/images/light.svg" : "/images/dark.svg";
  };

  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    scrollToSection(targetId);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <img 
        src="/images/logo.svg" 
        alt="DudeWorth Logo" 
        className={styles.logo} 
        onClick={(e) => handleNavClick(e, '#hero')}
        style={{cursor: 'pointer'}}
      />
      <nav className={`${styles.mainNav} ${isMenuOpen ? styles.open : ''}`}>
        <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
        <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a>
        <a href="#roadmap" onClick={(e) => handleNavClick(e, '#roadmap')}>AI Roadmap</a>
        {showAITools && <a href="#ai-tools" onClick={(e) => handleNavClick(e, '#ai-tools')}>AI Tools</a>}
        <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')}>AI FAQ</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
      </nav>
      <div className={styles.headerRight}>
        <button 
          className={`${styles.darkModeToggle} neumorphic-icon`}
          onClick={toggleDarkMode}
          onMouseEnter={handleToggleMouseEnter}
          onMouseLeave={handleToggleMouseLeave}
          aria-label="Toggle dark mode"
        >
          <img 
            src={getToggleIcon()}
            alt={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          />
        </button>
        <button 
          className={`${styles.hamburger} neumorphic-icon`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;