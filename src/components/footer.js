import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/theme-context';
import { scrollToSection } from '../utils/scroll';
import styles from '../styles/footer.module.css';
import Terms from './terms';

function Footer({ showAITools }) {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  const openTerms = (e) => {
    e.preventDefault();
    setIsTermsOpen(true);
  };

  const closeTerms = () => {
    setIsTermsOpen(false);
  };

  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    scrollToSection(targetId);
  };

  useEffect(() => {
    if (window.Calendly) {
      window.Calendly.initBadgeWidget({
        url: 'https://calendly.com/dudeworth/exploratory-consultation-30-mins?hide_gdpr_banner=1&primary_color=00a86b',
        text: 'Book a 30-min Exploratory Call',
        color: '#00a86b',
        textColor: '#ffffff',
        branding: undefined
      });
    }
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <a href="#" onClick={(e) => handleNavClick(e, '#hero')}>
            <img src={isDarkMode ? "/images/logo_white.svg" : "/images/logo_grey.svg"} alt="DudeWorth Logo" className={styles.logo} />
          </a>
        </div>
        <nav className={styles.footerNav}>
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
          <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a>
          <a href="#roadmap" onClick={(e) => handleNavClick(e, '#roadmap')}>AI Roadmap</a>
          {showAITools && <a href="#ai-tools" onClick={(e) => handleNavClick(e, '#ai-tools')}>AI Tools</a>}
          <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')}>AI FAQ</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
        </nav>
        <div className={styles.footerDescription}>
          <p>DudeWorth is an AI automation advisory firm dedicated to helping businesses transform through innovative AI solutions.</p>
        </div>
      </div>
      <div className={styles.calendlyContainer}>
        <div className="calendly-badge-widget"></div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          © 2024 DudeWorth, LLC. All rights reserved. | <a href="#" onClick={openTerms}>Terms and Conditions</a>
        </div>
      </div>
      {isTermsOpen && <Terms onClose={closeTerms} />}
    </footer>
  );
}

export default Footer;