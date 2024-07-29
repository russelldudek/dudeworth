import React, { useState, useEffect } from 'react';
import styles from '../styles/hero.module.css';
import { keywords, colorPalette } from '../data/hero-data';

function Hero() {
  const [currentKeyword, setCurrentKeyword] = useState(keywords[0]);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentKeyword(prevKeyword => {
        const currentIndex = keywords.indexOf(prevKeyword);
        const nextIndex = (currentIndex + 1) % keywords.length;
        return keywords[nextIndex];
      });
      setCurrentColorIndex(prevIndex => (prevIndex + 1) % colorPalette.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.rethinkContainer}>
          <h1 className={styles.rethinkText}>re:Think</h1>
        </div>
        <h2 
          className={styles.dynamicKeyword} 
          style={{color: colorPalette[currentColorIndex]}}
        >
          {currentKeyword}
        </h2>
        <p className={styles.subtitle}>Transformed Via AI Automation</p>
        <button className={`${styles.ctaButton} cta-button`}>Get Started</button>
      </div>
    </section>
  );
}

export default Hero;