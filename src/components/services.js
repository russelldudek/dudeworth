import React from 'react';
import styles from '../styles/services.module.css';
import { servicesData } from '../data/services-data';
import Collapsible from './collapsible';

function Services({ id }) {
  const colors = ['var(--accent-color-1)', 'var(--accent-color-2)', 'var(--accent-color-3)', 'var(--accent-color-4)', 'var(--accent-color-5)'];

  return (
    <section id={id} className={styles.services}>
      <div className="section-container">
        <h2 className="section-title">Service Tiers</h2>
        <p className="section-introduction">{servicesData.introduction}</p>
        <div className={styles.tiersContainer}>
          {servicesData.tiers.map((tier, index) => (
            <Collapsible 
              key={index}
              title={tier.title}
              content={
                <>
                  <p>{tier.description}</p>
                  <ul>
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex}>{benefit}</li>
                    ))}
                  </ul>
                </>
              }
              color={colors[index % colors.length]}
            />
          ))}
        </div>
        <div className={`${styles.callToAction} neumorphic-card`}>
          <h3>{servicesData.callToAction}</h3>
          <p>{servicesData.finalNote}</p>
        </div>
      </div>
    </section>
  );
}

export default Services;