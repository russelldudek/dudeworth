import React, { useState } from 'react';
import styles from '../styles/faq.module.css';
import { faqData } from '../data/faq-data';
import Collapsible from './collapsible';

function FAQ({ id }) {
  const [showFAQ, setShowFAQ] = useState(false);
  const colors = ['var(--accent-color-1)', 'var(--accent-color-2)', 'var(--accent-color-3)', 'var(--accent-color-4)', 'var(--accent-color-5)'];

  const toggleFAQ = () => {
    setShowFAQ(!showFAQ);
  };

  return (
    <section id={id} className={styles.faq}>
      <div className="section-container">
        <h2 className="section-title">AI FAQ</h2>
        <p className="section-introduction">{faqData.introduction}</p>
        <div className={styles.buttonContainer}>
          <button onClick={toggleFAQ} className={`${styles.toggleButton} cta-button`}>
            {showFAQ ? 'Hide FAQ' : 'Show FAQ'}
          </button>
        </div>
        {showFAQ && (
          <div className={styles.faqList}>
            {faqData.questions.map((question, index) => (
              <Collapsible
                key={index}
                title={question.question}
                content={question.answer}
                color={colors[index % colors.length]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FAQ;