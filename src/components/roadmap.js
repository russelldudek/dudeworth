import React from 'react';
import styles from '../styles/roadmap.module.css';
import { roadmapData } from '../data/roadmap-data';
import Collapsible from './collapsible';

function Roadmap({ id }) {
  const colors = ['var(--accent-color-1)', 'var(--accent-color-2)', 'var(--accent-color-3)', 'var(--accent-color-4)', 'var(--accent-color-5)'];

  return (
    <section id={id} className={styles.roadmap}>
      <div className="section-container">
        <h2 className="section-title">Our AI Automation Process</h2>
        <p className="section-introduction">{roadmapData.introduction}</p>
        <div className={styles.stepsContainer}>
          {roadmapData.steps.map((step, index) => (
            <Collapsible 
              key={index}
              title={step.title}
              content={<p>{step.content}</p>}
              color={colors[index % colors.length]}
            />
          ))}
        </div>
        {/* Call to Action (currently blank, uncomment and populate when ready)
        <div className={`${styles.callToAction} neumorphic-card`}>
          <h3>{roadmapData.callToAction.title}</h3>
          <p>{roadmapData.callToAction.content}</p>
        </div>
        */}
      </div>
    </section>
  );
}

export default Roadmap;