import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Trending from './Pages/Trending/Trending';
import About from './Pages/About/About';
// import CustomPagination from './components/Pagination/CustomPagination';
// import Container from '@mui/material/Container';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="app">
        <Routes>
          <Route path="/" element={<Trending />} exact />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
