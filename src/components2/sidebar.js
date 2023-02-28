import React from 'react';
import { useUserContext } from "../context/userContext";
import './sidebar.css';

function SideNav(props) {
    const { showNav, onClose } = props;
    const { user, logoutUser } = useUserContext();
  
    return (
      <div className={`sidenav ${showNav ? 'open' : ''}`}>
        <button className="logout" onClick={logoutUser}>Log out</button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    );
  }

export default SideNav;