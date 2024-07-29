import React from 'react';
import styles from '../styles/about.module.css';
import { aboutData } from '../data/about-data';
import Collapsible from './collapsible';
import DynamicTheme from './dynamic-theme';

function About() {
  const colors = ['var(--accent-color-1)', 'var(--accent-color-2)', 'var(--accent-color-3)', 'var(--accent-color-4)', 'var(--accent-color-5)'];

  return (
    <section id="about" className={styles.about}>
      <div className="section-container">
        <h2 className="section-title">Why DudeWorth?</h2>
        <p className="section-introduction" dangerouslySetInnerHTML={{ __html: aboutData.introduction }}></p>
        <div className={styles.collapsibleContainer}>
          {aboutData.sections.map((section, index) => (
            <Collapsible 
              key={index}
              title={section.title}
              content={<div dangerouslySetInnerHTML={{ __html: section.content }}></div>}
              color={colors[index % colors.length]}
            />
          ))}
        </div>
        <div className={styles.callToAction}>
          <h2>{aboutData.callToAction.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: aboutData.callToAction.body }}></p>
        </div>
      </div>
    </section>
  );
}

export default About;