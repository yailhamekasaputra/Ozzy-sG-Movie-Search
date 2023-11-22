import React, { useEffect, useState } from 'react';
import './Trending.css';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Home from '../../components/Home/Home';
import SearchBar from '../../components/SearchBar/SearchBar';

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState(''); // Menambahkan state searchText
  const [searchError, setSearchError] = useState(false); // Menambahkan state searchError
  const [typingTimeout, setTypingTimeout] = useState(0); // State untuk debouncing

  // Memperbarui useEffect untuk menangani perubahan page atau searchText
  useEffect(() => {
    window.scroll(0, 0);
    if (searchText.trim() === '') {
      fetchTrending();
    } else {
      // Menggunakan debouncing untuk menunggu pengguna selesai mengetik
      clearTimeout(typingTimeout);
      const timeoutId = setTimeout(() => {
        handleSearch(searchText);
      }, 10); // Ubah nilai timeout sesuai kebutuhan Anda
      setTypingTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchText]);

  const handleSearch = async (searchText) => {
    if (searchText.trim() !== '') {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}&page=${page}`
        );

        const searchResults = response.data.results;

        if (searchResults.length === 0) {
          setSearchError(true); // Set state searchError jika hasil pencarian kosong
        } else {
          setSearchError(false); // Set state searchError menjadi false jika ada hasil pencarian
        }

        setContent(searchResults);

        // Hitung jumlah halaman total berdasarkan jumlah hasil dan ukuran halaman yang diinginkan (misalnya, 20 per halaman)
        const totalResults = searchResults.length;
        const resultsPerPage = 20;
        const totalPages = Math.ceil(totalResults / resultsPerPage);

        setTotalPages(totalPages);
        setCurrentPage(1); // Set halaman saat ini kembali ke halaman pertama
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  };

  const fetchTrending = async () => {
    if (searchText.trim() === '') {
      // Hanya ambil trending jika searchText kosong
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
        setContent(data.results);
        setTotalPages(data.total_pages); // Set jumlah halaman berdasarkan data trending
      } catch (error) {
        console.error('Error fetching trending:', error);
      }
    }
  };

  return (
    <div>
      <Home />
      <SearchBar onSearch={(searchText) => setSearchText(searchText)} />{' '}
      {/* Update onSearch */}
      <span className="pageTitle1">Trending Today</span>
      <div className="trending">
        {/* Tampilkan content trending atau hasil pencarian */}
        {searchError ? (
          <p>Tidak ada hasil pencarian.</p>
        ) : (
          content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average || 0}
            />
          ))
        )}
      </div>
      {searchText.trim() === '' ? ( // Tampilkan pagination berdasarkan searchText
        <CustomPagination
          setPage={setPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ) : (
        <CustomPagination
          setPage={setPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default Trending;
