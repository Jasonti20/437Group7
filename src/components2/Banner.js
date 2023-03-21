import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../requests';
import { useUserContext } from "../context/userContext";
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);
  const { user, logoutUser } = useUserContext();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchPopular);
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
          backgroundSize: 'contain',
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
          backdropPosition: 'center center',
        }}
      >
        {/* Background image */}
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          {/* 2 buttons */}
          <div className='banner__buttons'>
            {/* <button className='banner__button'>Play</button>
            <button className='banner__button'>My List </button> 
            <button onClick={logoutUser}>Log out</button> */}
          </div>
          {/* description */}
          <h1 className='banner__description'>
            {truncate(movie?.overview, 300)}
          </h1>
        </div>
        <div className='banner_fadeBottom' />
      </header>
    </div>
  );
}

export default Banner;
