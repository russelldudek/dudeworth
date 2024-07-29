import React, { useState } from 'react';
import styles from '../styles/collapsible.module.css';

function Collapsible({ title, content, color }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.collapsible} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.toggle} 
        onClick={() => setIsOpen(!isOpen)}
        style={{ '--hover-color': color }}
      >
        {title}
        <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className={styles.content}>
          {content}
        </div>
      )}
    </div>
  );
}

export default Collapsible;