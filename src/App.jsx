import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import BuyerPage from './pages/BuyerPage';
import AgentPage from './pages/AgentPage';
import DealerPage from './pages/DealerPage';
import Page from './pages/Page';
import BrandPage from './pages/BrandPage';
import ModelPage from './pages/ModelPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyerPage />} />
        <Route path="/popup" element={<BuyerPage openPopup={true} />} />
        <Route path="/popup/brand" element={<BuyerPage openPopup={true} initialSlide={1} />} />
        <Route path="/popup/model" element={<BuyerPage openPopup={true} initialSlide={2} />} />
        <Route path="/popup/variant" element={<BuyerPage openPopup={true} initialSlide={3} />} />
        <Route path="/popup/contact" element={<BuyerPage openPopup={true} initialSlide={5} />} />
        <Route path="/popup/brand/:slug" element={<BrandPage openPopup={true} />} />
        <Route path="/enquiry" element={<BuyerPage openPopup={true} />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/dealer" element={<DealerPage />} />
        <Route path="/page" element={<Page />} />
        <Route path="/brand/:slug" element={<BrandPage />} />
        <Route path="/brand/:slug/enquiry" element={<BrandPage openPopup={true} />} />
        <Route path="/brand/:slug/:model" element={<ModelPage />} />
        <Route path="/brand/:slug/:model/enquiry" element={<ModelPage openPopup={true} />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

