import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { img_500, unavailable } from '../../config/config';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import StarRateIcon from '@mui/icons-material/StarRate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Carousel from '../../components/Carousel/Carousel';
import './ContentModal.css';

export default function ContentModal({ children, media_type, id }) {
  const [content, setContent] = useState({});
  const [video, setVideo] = useState('');
  const [open, setOpen] = useState(false);
  const [seasons, setSeasons] = useState(0);
  const [releaseDate, setReleaseDate] = useState('');

  // Tambah state untuk data produksi
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [productionCountries, setProductionCountries] = useState([]);

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedRuntime = `${hours}h ${remainingMinutes}m`;
    return formattedRuntime;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setContent(data);

        // Ambil data produksi dari response
        setProductionCompanies(data.production_companies || []);
        setProductionCountries(data.production_countries || []);

        if (media_type === 'tv') {
          setSeasons(data.number_of_seasons);
          setReleaseDate(data.first_air_date);
        }

        fetchVideo();
      } catch (error) {
        console.error('Error fetching content details:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [id, media_type]);

  const fetchVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      // Filter video dengan tipe 'Trailer'
      const trailer = data.results.find((result) => result.type === 'Trailer');

      // Setel video ID jika trailer ditemukan, jika tidak, biarkan kosong
      setVideo(trailer ? trailer.key : '');
    } catch (error) {
      console.error('Error fetching content video:', error);
    }
  };

  return (
    <>
      <div
        className="media"
        style={{ cursor: 'pointer' }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: {
            timeout: 500,
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
        }}
      >
        <Fade in={open}>
          <div className="ContentModal">
            <div className="movie">
              <div className="movie__intro">
                <img
                  className="movie__backdrop"
                  src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
                  alt={content.original_title || content.original_name || ''}
                  onClick={handleClose}
                />
                <div className="fade-overlay"></div>
              </div>
              <div className="movie__detail">
                <div className="movie__detailLeft">
                  <div className="movie__posterBox">
                    <img
                      className="movie__poster"
                      src={
                        content.poster_path
                          ? `${img_500}/${content.poster_path}`
                          : unavailable
                      }
                      alt={
                        content.original_title || content.original_name || ''
                      }
                    />
                  </div>
                </div>
                <div className="movie__detailRight">
                  <div className="movie__detailRightTop">
                    <div className="movie__name">
                      {content.original_title || content.original_name || ''}
                    </div>
                    <div className="movie__tagline">
                      {content.tagline || ''}
                    </div>

                    <div className="movie__additionalInfo">
                      <div className="movie__rating">
                        <StarRateIcon />
                        {''}
                        {content.vote_average
                          ? content.vote_average.toFixed(1)
                          : ''}
                      </div>
                      {media_type === 'tv' && (
                        <>
                          <div className="movie__seasons">
                            <AccessTimeIcon /> Seasons: {seasons}
                          </div>
                          <div className="movie__releaseDate">
                            <CalendarMonthIcon /> {releaseDate || ''}
                          </div>
                        </>
                      )}
                      {media_type === 'movie' && (
                        <>
                          <div className="movie__runtime">
                            <AccessTimeIcon /> {formatRuntime(content.runtime)}
                          </div>
                          <div className="movie__releaseDate">
                            <CalendarMonthIcon /> {content.release_date || ''}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="movie__genres">
                      {content.genres &&
                        content.genres.map((genre) => (
                          <span className="movie__genre" key={genre.id}>
                            {genre.name}
                          </span>
                        ))}
                    </div>
                    <div className="productionText">Production</div>
                    <div className="movie__productionCompanies">
                      {productionCompanies.map((company) => (
                        <span
                          className="movie__productionCompany"
                          key={company.id}
                        >
                          {company.name}
                        </span>
                      ))}
                    </div>
                    <div className="countryText">Country</div>
                    <div className="movie__productionCountries">
                      {productionCountries.map((country) => (
                        <span
                          className="movie__productionCountry"
                          key={country.iso_3166_1}
                        >
                          {country.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="synopsisText">Synopsis</div>
                  <div className="movie__description">
                    {content.overview || ''}
                    {video && <div className="movie__trailer"></div>}
                  </div>
                  <div className="button-container">
                    <Button
                      className="watch-trailer-button"
                      variant="outlined"
                      startIcon={<YouTubeIcon />}
                      color="info"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.youtube.com/watch?v=${video}`}
                    >
                      Watch Trailer
                    </Button>
                  </div>
                </div>
              </div>
              <Carousel id={id} media_type={media_type} style={{ zIndex: 2 }} />
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
