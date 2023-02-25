import React from "react";
// import { useUserContext } from "./context/userContext";
import Row from './components2/Row';
import requests from './requests';
import Banner from './components2/Banner';
import Nav from './components2/Nav';

const Dashboard = () => {
  // const { user, logoutUser } = useUserContext();
  return (
    <div>
      <Nav />
      <Banner />
      <Row
        title='Popular Now' fetchUrl={requests.fetchPopular} 
        isLargeRow
      />
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
