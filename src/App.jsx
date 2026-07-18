import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BuyerPage from './pages/BuyerPage';
import AgentPage from './pages/AgentPage';
import DealerPage from './pages/DealerPage';
import Page from './pages/Page';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyerPage />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/dealer" element={<DealerPage />} />
        <Route path="/page" element={<Page />} />
      </Routes>
    </Router>
  );
}
