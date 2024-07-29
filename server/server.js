const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_SHEET_ID;

// Load credentials from file
const credentialsPath = path.resolve(__dirname, '../private/credentials/credentials.json');
let credentials;
try {
  credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
  console.log('Credentials successfully loaded from file:', credentialsPath);
} catch (error) {
  console.error('Error loading credentials from file:', error.message);
}

console.log('Environment Variables from server:');
console.log('REACT_APP_GOOGLE_SHEETS_SHEET_ID:', SHEET_ID);
console.log('Credentials:', credentials);

app.post('/api/fetch-google-sheet-data', async (req, res) => {
  try {
    if (!SHEET_ID || !credentials || !credentials.client_email || !credentials.private_key) {
      throw new Error('Google Sheets service account credentials or Sheet ID are not set. Please check your environment variables.');
    }

    console.log('SHEET_ID:', SHEET_ID);
    console.log('Service Account Email:', credentials.client_email);
    console.log('Private Key Length:', credentials.private_key.length);
    console.log('Private Key First Line:', credentials.private_key.split('\n')[0]);

    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );

    console.log('Auth object created');

    const sheets = google.sheets({ version: 'v4', auth });

    console.log('Sheets object created');

    const tiers = ['No_Account', 'Free_Tier', 'Basic_Tier', 'Pro_Tier', 'Enterprise_Tier'];
    const sheetData = {};

    for (const tier of tiers) {
      try {
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: SHEET_ID,
          range: `${tier}!A1:Z1000`,
        });

        console.log(`Data fetched from Google Sheets for ${tier}:`, response.data);

        if (response.data && response.data.values && response.data.values.length > 0) {
          sheetData[tier] = response.data;
        } else {
          console.warn(`No data found for ${tier}`);
          // Provide empty structure for tiers with no data
          sheetData[tier] = {
            values: [
              ['Type', 'ID', 'Title', 'Description', 'ParentID', 'Value', 'Priority', 'Status'],
              ['C', `${tier.toLowerCase()}-empty`, `${tier} (Empty)`, `No data available for ${tier}`, '', '', '', '']
            ]
          };
        }
      } catch (error) {
        console.error(`Error fetching data for ${tier}:`, error.message);
        // Provide empty structure for tiers that failed to fetch
        sheetData[tier] = {
          values: [
            ['Type', 'ID', 'Title', 'Description', 'ParentID', 'Value', 'Priority', 'Status'],
            ['C', `${tier.toLowerCase()}-error`, `${tier} (Error)`, `Failed to fetch data for ${tier}`, '', '', '', '']
          ]
        };
      }
    }

    res.json({ sheets: sheetData });
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error.message);
    console.error('Error details:', error);
    res.status(500).json({ error: 'Failed to fetch Google Sheet data', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));