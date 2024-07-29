import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './styles/global.css';

console.log('index.js is being executed');

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (module.hot) {
  console.log('HMR is enabled');
  module.hot.accept('./app', () => {
    console.log('Accepting the updated app module');
    const NextApp = require('./app').default;
    root.render(
      <React.StrictMode>
        <NextApp />
      </React.StrictMode>
    );
  });
}
