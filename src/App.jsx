import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyerPage from './pages/BuyerPage';
import AgentPage from './pages/AgentPage';
import DealerPage from './pages/DealerPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyerPage />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/dealer" element={<DealerPage />} />
      </Routes>
    </Router>
  );
}
