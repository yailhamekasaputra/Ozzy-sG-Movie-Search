import React, { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  // Buat fungsi untuk menangani perubahan input
  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchText(value);
    // Panggil fungsi onSearch setelah pengguna selesai mengetik
    delaySearch(value);
  };

  // Buat fungsi untuk menunda pencarian setelah pengguna selesai mengetik
  let searchTimeout;
  const delaySearch = (value) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      onSearch(value);
    }, 10); // Ubah nilai timeout sesuai kebutuhan Anda
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search Movie, TV Series..."
          value={searchText}
          onChange={handleSearchInput}
          className="search-input"
        />
        <button className="search-button">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
