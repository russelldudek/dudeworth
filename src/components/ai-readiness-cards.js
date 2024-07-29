import React, { useState } from 'react';
import styles from '../styles/ai-readiness-cards.module.css';

const ReadinessCard = ({ card, index, listId, onCardAction, isRestrictedTier }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value.substring(e.target.value.indexOf(' ') + 1);
    onCardAction('update', listId, card.id, { ...card, title: newTitle });
  };

  const handleDescriptionChange = (e) => onCardAction('update', listId, card.id, { ...card, description: e.target.value });

  const handleTaskToggle = (taskIndex) => {
    const newTasks = [...card.tasks];
    newTasks[taskIndex].completed = !newTasks[taskIndex].completed;
    onCardAction('update', listId, card.id, { ...card, tasks: newTasks });
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTasks = [...card.tasks, { id: Date.now().toString(), text: newTask.trim(), completed: false, priority: 'default' }];
      onCardAction('update', listId, card.id, { ...card, tasks: newTasks });
      setNewTask('');
    }
  };

  const handleEditTask = (taskIndex, newText) => {
    const newTasks = [...card.tasks];
    newTasks[taskIndex].text = newText;
    onCardAction('update', listId, card.id, { ...card, tasks: newTasks });
  };

  const handleDeleteTask = (taskIndex) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const newTasks = card.tasks.filter((_, index) => index !== taskIndex);
      onCardAction('update', listId, card.id, { ...card, tasks: newTasks });
    }
  };

  const handleTaskPriorityChange = (taskIndex) => {
    const priorities = ['default', 'green', 'yellow', 'red'];
    const newTasks = [...card.tasks];
    const currentPriority = newTasks[taskIndex].priority || 'default';
    const currentIndex = priorities.indexOf(currentPriority);
    newTasks[taskIndex].priority = priorities[(currentIndex + 1) % priorities.length];
    onCardAction('update', listId, card.id, { ...card, tasks: newTasks });
  };

  const handlePriorityChange = () => {
    const priorities = ['default', 'green', 'yellow', 'red'];
    const currentIndex = priorities.indexOf(card.priority);
    const newPriority = priorities[(currentIndex + 1) % priorities.length];
    onCardAction('update', listId, card.id, { ...card, priority: newPriority });
  };

  const moveTask = (taskIndex, direction) => {
    const newTasks = [...card.tasks];
    if (direction === 'up' && taskIndex > 0) {
      [newTasks[taskIndex - 1], newTasks[taskIndex]] = [newTasks[taskIndex], newTasks[taskIndex - 1]];
    } else if (direction === 'down' && taskIndex < newTasks.length - 1) {
      [newTasks[taskIndex + 1], newTasks[taskIndex]] = [newTasks[taskIndex], newTasks[taskIndex + 1]];
    }
    onCardAction('update', listId, card.id, { ...card, tasks: newTasks });
  };

  return (
    <div className={`${styles.card} ${styles[card.priority]} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.cardHeader} onClick={toggleExpand}>
        <input
          type="text"
          value={`${index + 1}. ${card.title}`}
          onChange={handleTitleChange}
          className={styles.cardTitle}
          onClick={(e) => e.stopPropagation()}
        />
        <span className={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</span>
      </div>
      {isExpanded && (
        <div className={styles.cardContent}>
          <textarea
            value={card.description}
            onChange={handleDescriptionChange}
            className={styles.cardDescription}
            placeholder="Enter description..."
          />
          <div className={styles.taskList}>
            {card.tasks.map((task, taskIndex) => (
              <div key={task.id} className={styles.task}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskToggle(taskIndex)}
                  className={styles.checkbox}
                />
                {editingTaskIndex === taskIndex ? (
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => handleEditTask(taskIndex, e.target.value)}
                    onBlur={() => setEditingTaskIndex(null)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => setEditingTaskIndex(taskIndex)}>
                    {`${taskIndex + 1}. ${task.text}`}
                  </span>
                )}
                <div className={styles.taskActions}>
                  <button onClick={() => moveTask(taskIndex, 'up')} className={styles.moveTaskButton}>↑</button>
                  <button onClick={() => moveTask(taskIndex, 'down')} className={styles.moveTaskButton}>↓</button>
                  <button
                    className={`${styles.taskPriorityButton} ${styles[task.priority || 'default']}`}
                    onClick={() => handleTaskPriorityChange(taskIndex)}
                  />
                  <button onClick={() => handleDeleteTask(taskIndex)} className={styles.deleteTaskButton}>
                    ×
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.addTask}>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New task..."
              />
              <button onClick={handleAddTask}>Add Task</button>
            </div>
          </div>
          <div className={styles.cardActions}>
            <button
              className={`${styles.priorityButton} ${styles[card.priority]}`}
              onClick={handlePriorityChange}
            />
            {!isRestrictedTier && (
              <>
                <button onClick={() => onCardAction('duplicate', listId, card)} className={styles.actionButton}>
                  Duplicate
                </button>
                <button onClick={() => onCardAction('delete', listId, card.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>
                  Delete
                </button>
              </>
            )}
          </div>
          <div className={styles.moveActions}>
            <button onClick={() => onCardAction('move', listId, card.id, 'up')} className={styles.moveButton}>↑</button>
            <button onClick={() => onCardAction('move', listId, card.id, 'down')} className={styles.moveButton}>↓</button>
            <button onClick={() => onCardAction('move', listId, card.id, 'left')} className={styles.moveButton}>←</button>
            <button onClick={() => onCardAction('move', listId, card.id, 'right')} className={styles.moveButton}>→</button>
          </div>
        </div>
      )}
    </div>
  );
};

const AIReadinessCards = ({ categories, cardsData, activeCategory, setActiveCategory, onCardAction, isRestrictedTier }) => {
  const addCard = (listId) => {
    if (isRestrictedTier) return; // Prevent adding new cards in restricted tiers

    const newCard = {
      id: Date.now().toString(),
      title: 'New Card',
      description: '',
      tasks: [],
      priority: 'default',
    };
    onCardAction('add', activeCategory, listId, newCard);
  };

  if (!categories || !cardsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.tabsContainer}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.tabButton} ${activeCategory === category.id ? styles.activeTab : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.title}
          </button>
        ))}
      </div>
      <div className={styles.cardsContent}>
        {cardsData[activeCategory] && (
          <div className={styles.listsContainer}>
            {cardsData[activeCategory].lists.map(list => (
              <div key={list.id} className={styles.list}>
                <h3>{list.title}</h3>
                {list.cards.map((card, index) => (
                  <ReadinessCard
                    key={card.id}
                    card={card}
                    index={index}
                    listId={list.id}
                    onCardAction={(action, ...args) => onCardAction(action, activeCategory, ...args)}
                    isRestrictedTier={isRestrictedTier}
                  />
                ))}
                {!isRestrictedTier && (
                  <button onClick={() => addCard(list.id)} className={styles.addCardButton}>
                    Add Card
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIReadinessCards;

