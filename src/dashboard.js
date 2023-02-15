import React from "react";
import { useUserContext } from "./context/userContext";
import Row from './components2/Row';
import requests from './requests';
import Banner from './components2/Banner';
import Nav from './components2/Nav';
import './dashboard.css';

const Dashboard = () => {
  const { user, logoutUser } = useUserContext();
  return (
    <div className='dashboard'>
      <Nav />
      <Banner />
      <Row
        title='NETFLIX ORIGINALS'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title='Trending Now' fetchUrl={requests.fetchTrending} />
      <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
      <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
      <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
      <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
};

export default Dashboard;
