import { Badge } from '@mui/material';
import { img_300, unavailable } from '../../config/config';
import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import './SingleContent.css';
// import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import ContentModal from '../../components/ContentModal/ContentModal';

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const [duration, setDuration] = useState('');
  const [seasons, setSeasons] = useState(0);

  const formattedRating = vote_average.toFixed(1);

  useEffect(() => {
    const fetchAdditionalInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}`
        );

        if (media_type === 'movie') {
          // Konversi menit menjadi jam dan menit
          const totalMinutes = response.data.runtime;
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;

          setDuration(`${hours}h${minutes}m`);
        } else if (media_type === 'tv') {
          setSeasons(response.data.number_of_seasons);
        }
      } catch (error) {
        console.error('Error fetching additional info:', error);
      }
    };

    fetchAdditionalInfo();
  }, [id, media_type]);

  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        className="badge"
        badgeContent={
          <>
            <StarIcon fontSize="small" /> {formattedRating}
          </>
        }
        color={formattedRating > 6 ? 'primary' : 'secondary'}
      />
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        <span className="subTitle1">
          {media_type === 'tv' ? 'Series' : 'Movie'}
        </span>
        <span className="subTitle2">
          {date ? new Date(date).getFullYear() : 'TBA'}
        </span>
        {media_type === 'movie' && duration && (
          <span className="subTitle3">{duration}</span>
        )}
        {media_type === 'tv' && seasons > 0 && (
          <span className="subTitle4">S{seasons}</span>
        )}
      </span>
    </ContentModal>
  );
};

export default SingleContent;
