import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../requests';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <div>
      <header
        className='banner'
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
          backdropPosition: 'center center',
        }}
      >
        {/* Background image */}
        <h6 className='by__priota'>by priota</h6>
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          {/* 2 buttons */}
          <div className='banner__buttons'>
            <button className='banner__button'>Play</button>
            <button className='banner__button'>My List </button>
          </div>
          {/* description */}
          <h1 className='banner__description'>
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className='banner_fadeBottom' />
      </header>
    </div>
  );
}

export default Banner;
