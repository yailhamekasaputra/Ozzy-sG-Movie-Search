import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SingleContent from '../../components/SingleContent/SingleContent';
import useGenre from '../../hooks/useGenre';
import CustomPagination from '../../components/Pagination/CustomPagination';

const About = () => {
  const [selectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [movieContent, setMovieContent] = useState([]);
  const [seriesContent, setSeriesContent] = useState([]);
  const [numOfSeriesPages, setNumOfSeriesPages] = useState();

  const genreforURL = useGenre(selectedGenres);

  const fetchTopRatedContent = async () => {
    try {
      // Ambil data Top Rated Movies
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      );
      setMovieContent(movieResponse.data.results);

      // Ambil data Top Rated Series
      const seriesResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreforURL}`
      );
      setSeriesContent(seriesResponse.data.results);
      setNumOfSeriesPages(seriesResponse.data.total_pages);
    } catch (error) {
      console.error('Error fetching top-rated content:', error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTopRatedContent();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Top Rated Movies</span>
      <div className="trending">
        {movieContent &&
          movieContent.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <span className="pageTitle2">Top Rated Series</span>
      <div className="trending">
        {seriesContent &&
          seriesContent.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfSeriesPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfSeriesPages} />
      )}
    </div>
  );
};

export default About;
