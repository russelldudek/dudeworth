import React, { useState } from 'react';
import styles from '../styles/contact.module.css';

function Contact() {
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [timeframeOpen, setTimeframeOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('');

  const budgetOptions = [
    { value: '0-1000', label: '$0 - $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000+', label: '$10,000+' }
  ];

  const timeframeOptions = [
    { value: '1-3 months', label: '1 - 3 months' },
    { value: '3-6 months', label: '3 - 6 months' },
    { value: '6-12 months', label: '6 - 12 months' },
    { value: '12+ months', label: '12+ months' }
  ];

  return (
    <section id="contact" className={styles.contact}>
      <div className="section-container">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-introduction">Ready to transform your business with AI? Get in touch with us today!</p>
        <form className={styles.contactForm} name="contact" method="POST" data-netlify="true" action="/thank-you">
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="budget">Budget</label>
            <div className={styles.customSelect} onClick={() => setBudgetOpen(!budgetOpen)}>
              <div className={`${styles.selectedOption} ${!selectedBudget && styles.placeholder}`}>
                {selectedBudget || 'Select a budget range'}
              </div>
              {budgetOpen && (
                <div className={styles.options}>
                  {budgetOptions.map((option) => (
                    <div
                      key={option.value}
                      className={styles.option}
                      onClick={() => {
                        setSelectedBudget(option.label);
                        setBudgetOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input type="hidden" name="budget" value={selectedBudget} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="timeframe">Time Frame</label>
            <div className={styles.customSelect} onClick={() => setTimeframeOpen(!timeframeOpen)}>
              <div className={`${styles.selectedOption} ${!selectedTimeframe && styles.placeholder}`}>
                {selectedTimeframe || 'Select a time frame'}
              </div>
              {timeframeOpen && (
                <div className={styles.options}>
                  {timeframeOptions.map((option) => (
                    <div
                      key={option.value}
                      className={styles.option}
                      onClick={() => {
                        setSelectedTimeframe(option.label);
                        setTimeframeOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input type="hidden" name="timeframe" value={selectedTimeframe} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              required 
              placeholder="What's your AI dream project? Let's make it real!"
            ></textarea>
          </div>
          <div className={styles.formGroup} style={{display: 'none'}}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className="cta-button">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;