import React, { useState, useRef, useCallback } from 'react';
import parseAIReadinessCSV from '../utils/csv-parser';
import { generateCSVTemplate, generateCurrentStateCSV } from '../data/ai-tools-data';
import styles from '../styles/csv-uploader.module.css';

const CSVUploader = ({ onDataUpdate, currentCalculatorCategories, currentAIReadinessCards }) => {
  const [csvContent, setCSVContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCSVContent(e.target.result);
        setError(null);
      };
      reader.onerror = (e) => setError(`Error reading file: ${e.target.error}`);
      reader.readAsText(file);
    }
  }, []);

  const handleUpload = useCallback(() => {
    if (!csvContent) {
      setError('Please select a CSV file or paste CSV content first.');
      return;
    }

    try {
      console.log('Parsing CSV content...');
      const parsedData = parseAIReadinessCSV(csvContent);
      console.log('CSV parsed successfully:', parsedData);
      
      if (parsedData.calculatorCategories.length === 0) {
        throw new Error('No valid calculator categories found in the CSV.');
      }
      if (Object.keys(parsedData.aiReadinessCards).length === 0) {
        throw new Error('No valid AI Readiness Cards found in the CSV.');
      }

      onDataUpdate(parsedData);
      setError(null);
      alert('CSV data uploaded and parsed successfully!');
    } catch (error) {
      console.error('Error processing CSV:', error);
      setError(`Failed to parse CSV: ${error.message}`);
    }
  }, [csvContent, onDataUpdate]);

  const triggerFileInput = useCallback(() => fileInputRef.current?.click(), []);

  const downloadCSV = useCallback((content, filename) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const downloadCSVTemplate = useCallback(() => {
    const template = generateCSVTemplate();
    downloadCSV(template, 'ai_readiness_template.csv');
  }, [downloadCSV]);

  const downloadCurrentState = useCallback(() => {
    const currentState = generateCurrentStateCSV(currentCalculatorCategories, currentAIReadinessCards);
    downloadCSV(currentState, 'ai_readiness_current_state.csv');
  }, [currentCalculatorCategories, currentAIReadinessCards, downloadCSV]);

  return (
    <div className={styles.csvUploader}>
      <h3>Upload CSV Data</h3>
      <div className={styles.fileUploadContainer}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button onClick={triggerFileInput} className={styles.fileSelectButton}>
          Select CSV File
        </button>
        <span className={styles.fileName}>{fileName || 'No file selected'}</span>
      </div>
      <textarea
        className={styles.csvTextarea}
        value={csvContent}
        onChange={(e) => setCSVContent(e.target.value)}
        placeholder="CSV content will appear here. You can also paste CSV content directly."
        rows={10}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.uploadButton} onClick={handleUpload}>
          Upload CSV
        </button>
        <button className={styles.downloadButton} onClick={downloadCSVTemplate}>
          Download CSV Template
        </button>
        <button className={styles.downloadButton} onClick={downloadCurrentState}>
          Download Current State
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default CSVUploader;