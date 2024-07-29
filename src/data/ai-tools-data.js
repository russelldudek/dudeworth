import parseAIReadinessCSV from '../utils/csv-parser';

export const keywords = [
  "Business", "Technology", "Healthcare", "Education", "Finance",
  "Manufacturing", "Retail", "Transportation", "Energy", "Agriculture",
  "Government", "Environment", "Communication", "Entertainment", "Research",
  "Security", "Logistics", "Construction", "Hospitality", "Safety",
  "Legal", "Engineering", "Media", "Automotive", "Real Estate",
  "Insurance", "Public Services", "Human Resources", "Marketing",
  "Customer Service", "Supply Chain", "Consulting", "Non-Profit"
];

export const colorPalette = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
  "#F7B267", "#A06CD5", "#7FD1B9", "#FF9FF3", "#64C4ED",
  "#88D8B0", "#FFBE76", "#FF7ED4", "#6A89CC", "#BADC58",
  "#FF6B8B", "#45AAB8", "#FD7272", "#54A0FF", "#5CD859"
];

const boldTerms = [
  're:Think', 
  'AI', 
  'Artificial Intelligence', 
  'Innovation', 
  'Growth', 
  'Resilience',
  'smart assistants',
  'autonomous vehicles',
  'cutting-edge',
  'AI automation',
  'digital revolution'
];

export const formatText = (text, terms) => {
  let formattedText = text;
  terms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    formattedText = formattedText.replace(regex, `<strong>${term}</strong>`);
  });
  return formattedText;
};

const initialCalculatorCategories = keywords.map((keyword, index) => ({
  id: keyword.toLowerCase().replace(/\s+/g, '-'),
  title: keyword,
  color: colorPalette[index % colorPalette.length],
  milestones: [
    { value: 0, label: 'No AI strategy' },
    { value: 25, label: 'Basic AI implementation' },
    { value: 50, label: 'Moderate AI integration' },
    { value: 75, label: 'Advanced AI usage' },
    { value: 100, label: 'Full AI transformation' }
  ]
}));

const initialAIReadinessCards = keywords.reduce((acc, keyword) => {
  const id = keyword.toLowerCase().replace(/\s+/g, '-');
  acc[id] = {
    title: keyword,
    lists: [
      { id: `${id}-todo`, title: 'To Do', cards: [] },
      { id: `${id}-inprogress`, title: 'In Progress', cards: [] },
      { id: `${id}-onhold`, title: 'On Hold', cards: [] },
      { id: `${id}-done`, title: 'Done', cards: [] }
    ]
  };
  return acc;
}, {});

export const generateCSVTemplate = () => {
  const header = 'Type,ID,Title,Description,ParentID,Value,Priority,Status,TaskID,TaskText,TaskCompleted,TaskPriority';
  const rows = [];

  // Add calculator categories and milestones
  initialCalculatorCategories.forEach(category => {
    rows.push(`V,${category.id},${category.title},${category.title} AI readiness,,,,,,,,`);
    rows.push(`C,${category.id}-category,${category.title},${category.title} AI readiness,${category.id},,,,,,,`);
    category.milestones.forEach(milestone => {
      rows.push(`M,${category.id}-m${milestone.value},${milestone.label},${milestone.label},${category.id}-category,${milestone.value},,,,,,,`);
    });
  });

  // Add AI Readiness Cards (empty for now)
  Object.entries(initialAIReadinessCards).forEach(([categoryId, category]) => {
    category.lists.forEach(list => {
      rows.push(`R,${list.id}-example,Example Card,This is an example card for ${category.title},${categoryId}-category,,default,${list.title},,,,`);
      rows.push(`T,${list.id}-example-task,,,${list.id}-example,,,,,Example task,false,default`);
    });
  });

  return [header, ...rows].join('\n');
};

export const generateCurrentStateCSV = (currentCalculatorCategories, currentAIReadinessCards) => {
  const header = 'Type,ID,Title,Description,ParentID,Value,Priority,Status,TaskID,TaskText,TaskCompleted,TaskPriority';
  const rows = [];

  // Add current calculator categories and milestones
  currentCalculatorCategories.forEach(category => {
    rows.push(`V,${category.id},${category.title},${category.title} AI readiness,,,,,,,,`);
    rows.push(`C,${category.id}-category,${category.title},${category.title} AI readiness,${category.id},,,,,,,`);
    category.milestones.forEach(milestone => {
      rows.push(`M,${category.id}-m${milestone.value},${milestone.label},${milestone.label},${category.id}-category,${milestone.value},,,,,,,`);
    });
  });

  // Add current AI Readiness Cards
  Object.entries(currentAIReadinessCards).forEach(([categoryId, category]) => {
    category.lists.forEach(list => {
      list.cards.forEach(card => {
        rows.push(`R,${card.id},${card.title},${card.description},${categoryId}-category,,${card.priority},${list.title},,,,`);
        card.tasks.forEach(task => {
          rows.push(`T,${task.id},,,${card.id},,,,,${task.text},${task.completed},${task.priority}`);
        });
      });
    });
  });
  
  return [header, ...rows].join('\n');
};

export const aiToolsData = {
  calculatorCategories: initialCalculatorCategories,
  aiReadinessCards: initialAIReadinessCards,
};

export const updateAIToolsData = async (csvContent) => {
  try {
    const parsedData = await parseAIReadinessCSV(csvContent);
    
    console.log('Parsed data:', parsedData);

    // Update calculator categories
    const updatedCalculatorCategories = parsedData.calculatorCategories.map(category => ({
      id: category.id,
      title: category.title,
      color: initialCalculatorCategories.find(c => c.id === category.id)?.color || colorPalette[0],
      milestones: category.milestones
    }));

    // Update AI Readiness Cards
    const updatedAIReadinessCards = {};
    Object.entries(parsedData.aiReadinessCards).forEach(([categoryId, category]) => {
      updatedAIReadinessCards[categoryId] = {
        title: category.title,
        lists: category.lists.map(list => ({
          id: list.id,
          title: list.title,
          cards: list.cards.map(card => ({
            id: card.id,
            title: card.title,
            description: card.description,
            tasks: card.tasks.map(task => ({
              id: task.id,
              text: task.text,
              completed: task.completed,
              priority: task.priority
            })),
            priority: card.priority
          }))
        }))
      };
    });

    console.log('Updated Calculator Categories:', updatedCalculatorCategories);
    console.log('Updated AI Readiness Cards:', updatedAIReadinessCards);

    return {
      calculatorCategories: updatedCalculatorCategories,
      aiReadinessCards: updatedAIReadinessCards
    };
  } catch (error) {
    console.error('Error updating AI Tools data:', error);
    return null;
  }
};

export default {
  aiToolsData,
  updateAIToolsData,
  generateCSVTemplate,
  generateCurrentStateCSV,
  formatText,
  boldTerms,
  keywords,
  colorPalette
};