import { Chip, Button, MenuItem, Menu } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './CustomDropdown.css'; // Impor CSS yang telah Anda buat

const GenreDropdown = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
    setAnchorEl(null); // Tutup dropdown setelah menambah genre
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
    setAnchorEl(null); // Tutup dropdown setelah menghapus genre
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="custom-dropdown">
      <Button
        className="dropdown-button"
        aria-controls="genre-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Category &nbsp; ▼
      </Button>
      <Menu
        id="genre-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {genres.map((genre) => (
          <MenuItem key={genre.id}>
            <span onClick={() => handleAdd(genre)}>{genre.name}</span>
          </MenuItem>
        ))}
      </Menu>
      <div className="selected-genres">
        {selectedGenres.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            color="info"
            onDelete={() => handleRemove(genre)}
          />
        ))}
      </div>
    </div>
  );
};

export default GenreDropdown;
