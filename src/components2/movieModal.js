import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

function MovieModal({ movieId }) {
  const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=YOUR_API_KEY_HERE`
        );
        const title = response.data.title;
        setMovieTitle(title);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <Modal show={movieTitle !== ""}>
      <Modal.Header closeButton>
        <Modal.Title>{movieTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Additional modal content here */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMovieTitle("")}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieModal;
