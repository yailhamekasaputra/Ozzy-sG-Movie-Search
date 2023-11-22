import React, { useEffect, useState } from 'react';
import './Home.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setUpcomingMovies(data.results));
  }, []);

  return (
    <div className="poster">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
      >
        {upcomingMovies.map((movie) => (
          <div key={movie.id}>
            <div className="posterImage">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie && movie.backdrop_path
                }`}
                alt={movie.original_title}
              />
            </div>
            <div className="posterImage__overlay">
              <div className="posterImage__title">
                {movie ? movie.original_title : ''}
              </div>
              {/* <div className="posterImage__runtime">
                Release Date: {movie ? movie.release_date : ''}
              </div>
              <div className="posterImage__rating">
                Rating: {movie ? movie.vote_average : ''}
              </div>
              <div className="posterImage__description">
                {movie ? movie.overview : ''}
              </div> */}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
