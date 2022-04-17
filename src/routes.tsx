import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Cryptocurrencies from './pages/Cryptocurrencies';
import CryptoDetails from './pages/CryptoDetails';
import News from './pages/News';

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/cryptocurrencies/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
        </Routes>
    )
}

export default Router;