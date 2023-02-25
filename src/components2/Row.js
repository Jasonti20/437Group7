import React, { useState, useEffect, useRef} from 'react';
import axios from '../axios';
import './Row.css';
import YouTube from 'react-youtube';


// import movieTrailer from 'movie-trailer';

const API_KEY = '89e8071cdf777af6e727e4cac6f685f9';

const baseImgUrl = 'https://image.tmdb.org/t/p/original';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const playerRef = useRef(null);

  useEffect(() => {
    const modalElement = document.getElementById('exampleModalCenter');
    const modalHideHandler = () => {
      if (playerRef.current) {
        playerRef.current.internalPlayer.pauseVideo();
        playerRef.current.internalPlayer.stopVideo();
      }
      setTrailerUrl('');
    };
    modalElement.addEventListener('hidden.bs.modal', modalHideHandler);

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', modalHideHandler);

      if (playerRef.current) {
        playerRef.current.internalPlayer.destroy();
      }
    };
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=` + API_KEY
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

  const handleClose = () => {
    setTrailerUrl('');
  };

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${baseImgUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            data-toggle="modal" 
            data-target="#exampleModalCenter"
          />
        ))}
      </div>
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} ref={playerRef} />}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
              <button type="button" className="btn btn-primary">Save Movie</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Row;
