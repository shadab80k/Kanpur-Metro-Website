import React from 'react';
import { createRoot } from 'react-dom/client';
import LandingPage from './pages/LandingPage';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css'; // Ensure Tailwind CSS is imported

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <LanguageProvider>
        <LandingPage />
      </LanguageProvider>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}

