import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import logo2 from '../../assets/img/logo1.png';
import Slide from '@mui/material/Slide';
import { useScrollTrigger } from '@mui/material';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [icon, setIcon] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // Fungsi untuk menangani perubahan ikon saat tombol diklik
  const handleIconChange = (newIcon) => {
    setIcon(newIcon);
  };

  return (
    <div>
      <HideOnScroll>
        <nav expand="md" className={scrolled ? 'scrolled' : ''}>
          {/* <nav> */}
          <div className="navContainer">
            <img
              src={logo2}
              alt="Logo"
              className="navbarLogo" // Tambahkan class untuk styling
            />

            <ul className="navMenu">
              <li>
                <Link
                  to="/"
                  className={`navItem ${icon === 'home' ? 'iconActive' : ''}`}
                  onClick={() => {
                    handleIconChange('home');
                    navigate('/');
                  }}
                >
                  <i
                    className={
                      icon === 'home'
                        ? 'uil uil-fire navIcon iconActive'
                        : 'uil uil-fire navIcon'
                    }
                  ></i>
                  <span className="navLink">Trending</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className={`navItem ${icon === 'movies' ? 'iconActive' : ''}`}
                  onClick={() => {
                    handleIconChange('movies');
                    navigate('/movies');
                  }}
                >
                  <i
                    className={
                      icon === 'movies'
                        ? 'uil uil-film navIcon iconActive'
                        : 'uil uil-film navIcon'
                    }
                  ></i>
                  <span className="navLink">Movie</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/series"
                  className={`navItem ${icon === 'series' ? 'iconActive' : ''}`}
                  onClick={() => {
                    handleIconChange('series');
                    navigate('/series');
                  }}
                >
                  <i
                    className={
                      icon === 'series'
                        ? 'uil uil-tv-retro navIcon iconActive'
                        : 'uil uil-tv-retro navIcon'
                    }
                  ></i>
                  <span className="navLink">TV Series</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`navItem ${icon === 'search' ? 'iconActive' : ''}`}
                  onClick={() => {
                    handleIconChange('search');
                    navigate('/about');
                  }}
                >
                  <i
                    className={
                      icon === 'search'
                        ? 'uil uil-star navIcon iconActive'
                        : 'uil uil-star navIcon'
                    }
                  ></i>
                  <span className="navLink">Top Rated</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </HideOnScroll>
    </div>
  );
};

export default Navbar;
