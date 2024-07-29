import React, { useState, useEffect } from 'react';
import { fetchGoogleSheetData } from '../utils/google-sheet-parser';
import AIReadinessCalculator from './ai-readiness-calculator';
import AIReadinessCards from './ai-readiness-cards';
import CSVUploader from './csv-uploader';
import styles from '../styles/ai-tools.module.css';
import { AI_TOOLS_ENABLED, CSV_UPLOADER_ENABLED } from '../utils/ai-tools-config';

const AITools = () => {
  const [tierData, setTierData] = useState({});
  const [currentTier, setCurrentTier] = useState('Enterprise_Tier');
  const [calculatorCategories, setCalculatorCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [cardsData, setCardsData] = useState({});
  const [selectedVertical, setSelectedVertical] = useState('');
  const [shareEmail, setShareEmail] = useState('');
  const [tierOpen, setTierOpen] = useState(false);
  const [verticalOpen, setVerticalOpen] = useState(false);

  const userEmail = 'user@example.com';

  const tiers = ['No_Account', 'Free_Tier', 'Basic_Tier', 'Pro_Tier', 'Enterprise_Tier'];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (tierData[currentTier]) {
      updateCurrentTierData(tierData[currentTier]);
    } else if (currentTier === 'No_Account') {
      setCalculatorCategories([]);
      setCardsData({});
      setActiveCategory('');
      setSelectedVertical('');
    }
  }, [currentTier, tierData]);

  const fetchData = async () => {
    try {
      const data = await fetchGoogleSheetData();
      console.log('Processed data:', data); // Add logging
      setTierData({
        No_Account: { calculatorCategories: [], aiReadinessCards: {} },
        ...data
      });
    } catch (error) {
      console.error('Error fetching Google Sheet data:', error);
    }
  };

  const updateCurrentTierData = (data) => {
    if (!data) {
      console.error('No data available for the current tier');
      return;
    }

    const verticals = Object.keys(data);
    if (verticals.length > 0) {
      const newSelectedVertical = selectedVertical && verticals.includes(selectedVertical) 
        ? selectedVertical 
        : verticals[0];
      setSelectedVertical(newSelectedVertical);
      const verticalData = data[newSelectedVertical];
      if (verticalData) {
        console.log('Current Tier Data:', verticalData); // Add logging
        setCalculatorCategories(verticalData.calculatorCategories || []);
        setCardsData(verticalData.aiReadinessCards || {});
        setActiveCategory(verticalData.calculatorCategories && verticalData.calculatorCategories.length > 0 
          ? verticalData.calculatorCategories[0].id 
          : '');
      } else {
        console.error('No data available for the selected vertical');
      }
    } else {
      console.error('No verticals available for the current tier');
    }
  };

  const handleTierChange = (tier) => {
    setCurrentTier(tier);
    setTierOpen(false);
    setSelectedVertical('');
    if (tierData[tier]) {
      const verticals = Object.keys(tierData[tier]);
      if (verticals.length > 0) {
        setSelectedVertical(verticals[0]);
        updateCurrentTierData(tierData[tier]);
      }
    }
  };

  const handleVerticalChange = (vertical) => {
    setSelectedVertical(vertical);
    setVerticalOpen(false);
    if (tierData[currentTier] && tierData[currentTier][vertical]) {
      const verticalData = tierData[currentTier][vertical];
      setCalculatorCategories(verticalData.calculatorCategories || []);
      setCardsData(verticalData.aiReadinessCards || {});
      setActiveCategory(verticalData.calculatorCategories && verticalData.calculatorCategories.length > 0 
        ? verticalData.calculatorCategories[0].id 
        : '');
    } else {
      console.error('No data available for the selected vertical');
    }
  };

  const handleDataUpdate = (updatedData) => {
    setTierData(prevData => ({
      ...prevData,
      [currentTier]: updatedData
    }));
    updateCurrentTierData(updatedData);
  };

  const handleCardAction = (action, categoryId, ...args) => {
    if ((currentTier === 'No_Account' || currentTier === 'Free_Tier') && (action === 'add' || action === 'duplicate')) {
      return;
    }

    setCardsData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const category = newData[categoryId];

      if (!category) {
        console.error(`Category ${categoryId} not found`);
        return prevData;
      }

      switch (action) {
        case 'add':
          const [listId, newCard] = args;
          const listToAddTo = category.lists.find(l => l.id === listId);
          if (listToAddTo) {
            listToAddTo.cards.push(newCard);
          }
          break;
        case 'update':
          const [listIdToUpdate, cardIdToUpdate, updatedCard] = args;
          const listToUpdate = category.lists.find(l => l.id === listIdToUpdate);
          if (listToUpdate) {
            const cardIndex = listToUpdate.cards.findIndex(c => c.id === cardIdToUpdate);
            if (cardIndex !== -1) {
              listToUpdate.cards[cardIndex] = updatedCard;
            }
          }
          break;
        case 'delete':
          const [listIdToDelete, cardIdToDelete] = args;
          const listToDeleteFrom = category.lists.find(l => l.id === listIdToDelete);
          if (listToDeleteFrom) {
            listToDeleteFrom.cards = listToDeleteFrom.cards.filter(c => c.id !== cardIdToDelete);
          }
          break;
        case 'move':
          const [listIdToMove, cardIdToMove, direction] = args;
          const listIndex = category.lists.findIndex(l => l.id === listIdToMove);
          const listToMoveFrom = category.lists[listIndex];
          if (listToMoveFrom) {
            const cardIndex = listToMoveFrom.cards.findIndex(c => c.id === cardIdToMove);
            const cardToMove = listToMoveFrom.cards[cardIndex];

            if (direction === 'up' && cardIndex > 0) {
              listToMoveFrom.cards.splice(cardIndex, 1);
              listToMoveFrom.cards.splice(cardIndex - 1, 0, cardToMove);
            } else if (direction === 'down' && cardIndex < listToMoveFrom.cards.length - 1) {
              listToMoveFrom.cards.splice(cardIndex, 1);
              listToMoveFrom.cards.splice(cardIndex + 1, 0, cardToMove);
            } else if (direction === 'left' && listIndex > 0) {
              listToMoveFrom.cards.splice(cardIndex, 1);
              category.lists[listIndex - 1].cards.push(cardToMove);
            } else if (direction === 'right' && listIndex < category.lists.length - 1) {
              listToMoveFrom.cards.splice(cardIndex, 1);
              category.lists[listIndex + 1].cards.push(cardToMove);
            }
          }
          break;
        case 'duplicate':
          const [listIdToDuplicate, cardToDuplicate] = args;
          const listToDuplicateIn = category.lists.find(l => l.id === listIdToDuplicate);
          if (listToDuplicateIn) {
            const newDuplicatedCard = {
              ...cardToDuplicate,
              id: Date.now().toString(),
              title: `${cardToDuplicate.title} (Copy)`
            };
            listToDuplicateIn.cards.push(newDuplicatedCard);
          }
          break;
        default:
          console.error('Unknown action:', action);
      }

      return newData;
    });
  };

  const verticals = currentTier !== 'No_Account' ? Object.keys(tierData[currentTier] || {}) : [];
  const showVerticalSelector = currentTier === 'Pro_Tier' || currentTier === 'Enterprise_Tier';

  return (
    <section id="ai-tools" className={styles.aiTools}>
      <div className={styles.container}>
        <h2 className={styles.title}>AI Readiness Tools</h2>
        <div className={styles.selectors}>
          <div className={styles.formGroup}>
            <label htmlFor="tier-select">Select Tier:</label>
            <div className={styles.customSelect} onClick={() => setTierOpen(!tierOpen)}>
              <div className={`${styles.selectedOption} ${!currentTier && styles.placeholder}`}>
                {currentTier.replace('_', ' ')}
              </div>
              {tierOpen && (
                <div className={styles.options}>
                  {tiers.map(tier => (
                    <div
                      key={tier}
                      className={styles.option}
                      onClick={() => handleTierChange(tier)}
                    >
                      {tier.replace('_', ' ')}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {showVerticalSelector && verticals.length > 0 && (
            <div className={styles.formGroup}>
              <label htmlFor="vertical-select">Select Vertical:</label>
              <div className={styles.customSelect} onClick={() => setVerticalOpen(!verticalOpen)}>
                <div className={`${styles.selectedOption} ${!selectedVertical && styles.placeholder}`}>
                  {selectedVertical || 'Select a vertical'}
                </div>
                {verticalOpen && (
                  <div className={styles.options}>
                    {verticals.map(vertical => (
                      <div
                        key={vertical}
                        className={styles.option}
                        onClick={() => handleVerticalChange(vertical)}
                      >
                        {vertical}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {currentTier === 'Enterprise_Tier' && (
            <div className={styles.formGroup}>
              <label htmlFor="share-email">Share/Collaborate:</label>
              <input
                type="email"
                id="share-email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder={userEmail}
              />
            </div>
          )}
        </div>
        {CSV_UPLOADER_ENABLED && currentTier !== 'No_Account' && (
          <CSVUploader 
            onDataUpdate={handleDataUpdate} 
            currentCalculatorCategories={calculatorCategories}
            currentAIReadinessCards={cardsData} 
          />
        )}
        {selectedVertical && (
          <>
            <h3>AI Readiness Calculator</h3>
            <AIReadinessCalculator categories={calculatorCategories} />
            <h3>AI Readiness Cards</h3>
            <AIReadinessCards 
              categories={calculatorCategories}
              cardsData={cardsData}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onCardAction={handleCardAction}
              isRestrictedTier={currentTier === 'No_Account' || currentTier === 'Free_Tier'}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default AITools;

