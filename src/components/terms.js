import React from 'react';
import styles from '../styles/terms.module.css';
import { termsData } from '../data/terms-data';

function Terms({ onClose }) {
  return (
    <div className={styles.termsOverlay} onClick={onClose}>
      <div className={styles.termsContent} onClick={(e) => e.stopPropagation()}>
        <h2>Terms and Conditions</h2>
        <p>Last Updated: {termsData.termsAndConditions.lastUpdated}</p>
        {termsData.termsAndConditions.sections.map((section, index) => (
          <div key={index} className={styles.section}>
            <h3>{section.title}</h3>
            <p>{section.content}</p>
          </div>
        ))}
        <h2>Privacy Policy</h2>
        <p>Last Updated: {termsData.privacyPolicy.lastUpdated}</p>
        {termsData.privacyPolicy.sections.map((section, index) => (
          <div key={index} className={styles.section}>
            <h3>{section.title}</h3>
            <p>{section.content}</p>
          </div>
        ))}
        <div className={styles.buttonContainer}>
          <button className="cta-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Terms;