import React, { useState, useEffect } from 'react';
import styles from '../styles/ai-readiness-calculator.module.css';

const AIReadinessCalculator = ({ categories }) => {
  const [scores, setScores] = useState({});
  const [editingTitle, setEditingTitle] = useState(null);

  useEffect(() => {
    const initialScores = {};
    categories.forEach(category => {
      initialScores[category.id] = 0;
    });
    setScores(initialScores);
  }, [categories]);

  const handleScoreChange = (categoryId, value) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category || !category.milestones) return;

    const milestones = category.milestones;
    const stepSize = 100 / (milestones.length - 1);
    const snappedValue = Math.round(value / stepSize) * stepSize;

    setScores(prevScores => ({
      ...prevScores,
      [categoryId]: snappedValue
    }));
  };

  const getGradientColor = (percentage) => {
    const red = Math.round(255 * (1 - percentage / 100));
    const green = Math.round(255 * (percentage / 100));
    return `rgb(${red}, ${green}, 0)`;
  };

  const getCurrentMilestone = (category, score) => {
    return category.milestones?.find(milestone => milestone.value === score);
  };

  const handleTitleEdit = (categoryId, newTitle) => {
    // In a real application, you would update this in your backend or state management system
    console.log(`Title for category ${categoryId} changed to: ${newTitle}`);
  };

  const totalScore = categories.length > 0 
    ? Object.values(scores).reduce((sum, score) => sum + score, 0) / categories.length 
    : 0;

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculator}>
        {categories.map(category => {
          const milestones = category.milestones;
          const stepSize = 100 / (milestones.length - 1);
          return (
            <div key={category.id} className={styles.categoryScore}>
              {editingTitle === category.id ? (
                <input
                  type="text"
                  defaultValue={category.title}
                  onBlur={(e) => {
                    handleTitleEdit(category.id, e.target.value);
                    setEditingTitle(null);
                  }}
                  autoFocus
                />
              ) : (
                <label onClick={() => setEditingTitle(category.id)}>{category.title}</label>
              )}
              <input
                type="range"
                min="0"
                max="100"
                step={stepSize}
                value={scores[category.id] || 0}
                onChange={(e) => handleScoreChange(category.id, parseInt(e.target.value))}
                style={{
                  background: `linear-gradient(to right, ${getGradientColor(scores[category.id] || 0)} 0%, ${getGradientColor(scores[category.id] || 0)} ${scores[category.id]}%, #ddd ${scores[category.id]}%, #ddd 100%)`
                }}
              />
              <span>{scores[category.id] || 0}%</span>
              <div className={styles.milestone}>
                {getCurrentMilestone(category, scores[category.id] || 0)?.label}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.totalScore}>
        <strong>Total AI Readiness Score: {Math.round(totalScore)}%</strong>
      </div>
    </div>
  );
};

export default AIReadinessCalculator;
