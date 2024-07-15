import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home/';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);
