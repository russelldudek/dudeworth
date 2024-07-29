import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_SHEET_ID;

const mapPriority = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high': return 'high';
    case 'medium': return 'medium';
    case 'low': return 'low';
    default: return 'default';
  }
};

const processRowsIntoAppFormat = (rows) => {
  const result = {};
  const cardLookup = {};

  rows.forEach((row, index) => {
    if (index === 0) return; // Skip header row

    const [type, id, title, text, parentId, value, priority, status] = row;
    console.log(`Processing row: ${index + 1}, type: ${type}, id: ${id}`);

    try {
      switch (type) {
        case 'V':
          result[id] = {
            id,
            title,
            description: text,
            calculatorCategories: [],
            aiReadinessCards: {}
          };
          break;
        case 'S':
          if (result[parentId]) {
            const slider = {
              id,
              title,
              description: text,
              milestones: []
            };
            result[parentId].calculatorCategories.push(slider);
            result[parentId].aiReadinessCards[id] = {
              title,
              lists: [
                { id: `${id}-todo`, title: 'To Do', cards: [] },
                { id: `${id}-inprogress`, title: 'In Progress', cards: [] },
                { id: `${id}-onhold`, title: 'On Hold', cards: [] },
                { id: `${id}-done`, title: 'Done', cards: [] }
              ]
            };
          } else {
            console.error(`Parent vertical not found for slider with id: ${id}`);
          }
          break;
        case 'M':
          const milestone = {
            value: parseInt(value),
            label: title
          };
          for (const vertical of Object.values(result)) {
            const slider = vertical.calculatorCategories.find(s => s.id === parentId);
            if (slider) {
              slider.milestones.push(milestone);
              break;
            }
          }
          break;
        case 'C':
          const card = {
            id,
            title,
            description: text,
            tasks: [],
            priority: mapPriority(priority),
            status: status?.toLowerCase() || 'todo'  // Default status to 'todo'
          };
          cardLookup[id] = card;
          let cardAssigned = false;
          for (const vertical of Object.values(result)) {
            for (const readinessCardKey in vertical.aiReadinessCards) {
              const readinessCard = vertical.aiReadinessCards[readinessCardKey];
              const list = readinessCard.lists.find(l => l.id === `${readinessCardKey}-${card.status}`);
              if (list) {
                list.cards.push(card);
                cardAssigned = true;
                console.log(`Card with id: ${id} assigned to list: ${list.id}`);
                break;
              }
            }
            if (cardAssigned) break;
          }
          if (!cardAssigned) {
            console.error(`Card with id: ${id} not assigned to any list`);
          }
          break;
      }
    } catch (error) {
      console.error(`Error processing row ${index + 2}:`, error);
    }
  });

  rows.forEach((row, index) => {
    if (index === 0) return;

    const [type, id, title, text, parentId, , priority] = row;
    console.log(`Processing row: ${index + 1}, type: ${type}, id: ${id}`);

    try {
      if (type === 'T') {
        const task = {
          id,
          text: title,
          completed: false,
          priority: mapPriority(priority),
          key: `${parentId}-${id}`
        };
        const card = cardLookup[parentId];
        if (card) {
          card.tasks.push(task);
        } else {
          console.error(`Card with id: ${parentId} not found for task with id: ${id}`);
        }
      }
    } catch (error) {
      console.error(`Error processing row ${index + 2}:`, error);
    }
  });

  return result;
};

const fetchGoogleSheetData = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/fetch-google-sheet-data`, {
      sheetId: SHEET_ID
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.data;
    console.log('Raw data from API:', JSON.stringify(data, null, 2));

    if (!data) {
      throw new Error('No data received from the API');
    }

    if (data.error) {
      throw new Error(`API Error: ${data.error}`);
    }

    let processedData = {};

    if (data.sheets) {
      const validTiers = ['No_Account', 'Free_Tier', 'Basic_Tier', 'Pro_Tier', 'Enterprise_Tier'];
      validTiers.forEach(tier => {
        if (data.sheets[tier] && data.sheets[tier].values && data.sheets[tier].values.length > 0) {
          processedData[tier] = processRowsIntoAppFormat(data.sheets[tier].values);
        } else {
          console.warn(`${tier} data not found or empty in the Google Sheets`);
        }
      });
    } else if (data.values) {
      processedData['Free_Tier'] = processRowsIntoAppFormat(data.values);
    } else {
      console.error('Unexpected data structure:', data);
      throw new Error('Unexpected data structure received from the API');
    }

    if (Object.keys(processedData).length === 0) {
      throw new Error('No valid tier data found in the Google Sheets');
    }

    console.log('Processed data:', processedData);
    return processedData;
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error);
    throw error;
  }
};

export { fetchGoogleSheetData };
