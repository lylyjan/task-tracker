import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.jsx';

import './index.css';
import { TempPage } from './pages/TempPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/temppage" element={<TempPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
