import React from 'react';

export const formatText = (text, boldTerms) => {
  if (!boldTerms || boldTerms.length === 0) return text;

  // Sort terms by length (longest first) to ensure longer phrases are matched before shorter ones
  const sortedTerms = boldTerms.sort((a, b) => b.length - a.length);

  // Escape special characters for regex
  const escapedTerms = sortedTerms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
  
  return text.split(regex).map((part, index) => 
    sortedTerms.some(term => part.toLowerCase() === term.toLowerCase()) ? 
      <strong key={index}>{part}</strong> : part
  );
};