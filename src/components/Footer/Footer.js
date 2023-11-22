import React from 'react';
import { Facebook, Instagram, LinkedIn, GitHub } from '@mui/icons-material'; // Mengimpor ikon-ikon Material-UI yang sesuai
import './Footer.css';
import logo2 from '../../assets/img/logo1.png';

const Footer = () => {
  return (
    <footer className="footer">
      <img
        src={logo2}
        alt="Logo"
        className="footerLogo" // Tambahkan class untuk styling
      />
      <div className="infoText">
        An easy-to-use film search platform that provides access to discover a
        wide variety of the best movies and TV shows. Explore thousands of
        entertainment titles, read reviews, and enjoy unforgettable viewing
        experiences. Begin your exploration of your favorite movies and TV shows
        with us.
      </div>
      <ul className="menuItems">
        <li className="menuItem2">Trending</li>
        <li className="menuItem2">Movie</li>
        <li className="menuItem2">Series</li>
        <li className="menuItem2">Top Rated</li>
      </ul>
      <ul className="menuItems2">
        <li className="menuItem">Terms Of Use</li>
        <li className="menuItem">Privacy-Policy</li>
        <li className="menuItem">About</li>
        <li className="menuItem">Blog</li>
        <li className="menuItem">FAQ</li>
      </ul>
      <div className="socialIcons">
        <a
          href="https://www.facebook.com/"
          className="icon-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <Facebook /> {/* Menggunakan ikon Facebook dari Material-UI */}
          </span>
        </a>
        <a
          href="https://www.instagram.com/yailhameka/"
          className="icon-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <Instagram /> {/* Menggunakan ikon Instagram dari Material-UI */}
          </span>
        </a>
        <a
          href="https://yailhamekasaputra.github.io/yailhameka-portfolio2/"
          className="icon-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <GitHub /> {/* Menggunakan ikon GitHub dari Material-UI */}
          </span>
        </a>
        <a
          href="https://www.linkedin.com/"
          className="icon-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <LinkedIn /> {/* Menggunakan ikon LinkedIn dari Material-UI */}
          </span>
        </a>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Ozzy'sG Movie. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
