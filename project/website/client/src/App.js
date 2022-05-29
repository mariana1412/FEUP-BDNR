import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SearchPage from './pages/SearchPage';
import Layout from './components/Layout';
import PurchasesPage from './pages/PurchasesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<SearchPage />} />
          <Route exact path="/purchases" element={<PurchasesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
