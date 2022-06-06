import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SearchPage from './pages/SearchPage';
import Layout from './components/Layout';
import PurchasesPage from './pages/PurchasesPage';
import EditClientPage from './pages/EditClientPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<SearchPage />} />
          <Route exact path="/purchases" element={<PurchasesPage />} />
          <Route exact path="/clients" element={<EditClientPage />} />
          <Route exact path="/product/:store/:sid" element={<ProductPage />} />
          <Route path="*" element={<div className=" d-flex justify-content-center">404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
