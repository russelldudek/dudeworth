export const parseAIReadinessCSV = (csvContent) => {
  const rows = csvContent.trim().split('\n').map(row => row.split(','));
  const header = rows[0];
  const dataRows = rows.slice(1);

  const result = {};

  let currentVertical = null;
  let currentSlider = null;

  dataRows.forEach(row => {
    const rowData = {};
    header.forEach((col, index) => {
      rowData[col.trim()] = row[index].trim();
    });

    switch (rowData.Type) {
      case 'V':
        currentVertical = {
          id: rowData.ID,
          title: rowData.Title,
          description: rowData.Text,
          calculatorCategories: [],
          aiReadinessCards: {}
        };
        result[rowData.ID] = currentVertical;
        break;
      case 'S':
        currentSlider = {
          id: rowData.ID,
          title: rowData.Title,
          description: rowData.Text,
          milestones: []
        };
        if (currentVertical) {
          currentVertical.calculatorCategories.push(currentSlider);
          currentVertical.aiReadinessCards[rowData.ID] = {
            title: rowData.Title,
            lists: [
              { id: `${rowData.ID}-todo`, title: 'To Do', cards: [] },
              { id: `${rowData.ID}-inprogress`, title: 'In Progress', cards: [] },
              { id: `${rowData.ID}-onhold`, title: 'On Hold', cards: [] },
              { id: `${rowData.ID}-done`, title: 'Done', cards: [] }
            ]
          };
        }
        break;
      case 'M':
        if (currentSlider) {
          currentSlider.milestones.push({
            value: parseInt(rowData.Value),
            label: rowData.Title
          });
        }
        break;
      case 'C':
        if (currentVertical && currentVertical.aiReadinessCards[rowData.ParentID]) {
          const listId = `${rowData.ParentID}-${rowData.Status.toLowerCase().replace(' ', '')}`;
          const list = currentVertical.aiReadinessCards[rowData.ParentID].lists.find(l => l.id === listId);
          if (list) {
            list.cards.push({
              id: rowData.ID,
              title: rowData.Title,
              description: rowData.Text,
              tasks: [],
              priority: rowData.Priority
            });
          }
        }
        break;
      case 'T':
        if (currentVertical && currentVertical.aiReadinessCards[rowData.ParentID]) {
          const card = currentVertical.aiReadinessCards[rowData.ParentID].lists
            .flatMap(l => l.cards)
            .find(c => c.id === rowData.ParentID);
          if (card) {
            card.tasks.push({
              id: rowData.ID,
              text: rowData.Text,
              completed: rowData.Status === 'TRUE',
              priority: rowData.Priority
            });
          }
        }
        break;
      default:
        console.warn(`Unrecognized row type: ${rowData.Type}`);
    }
  });

  return result;
};

export default parseAIReadinessCSV;
