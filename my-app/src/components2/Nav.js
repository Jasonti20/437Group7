import React, { useState, useEffect } from 'react';
import './Nav.css';
import SideNav from './sidebar';

function Nav() {
  const [show, handleShow] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleClick = () => {
    setShowNav(true);
  };

  const handleClose = () => {
    setShowNav(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <img
        className='nav__logo'
        src='https://github.com/Jasonti20/437Group7/blob/main/logo/logo-image-background.png?raw=true'
        alt='RR Logo'
        onClick={scrollToTop}
      />

      <img
        className='nav__avatar'
        src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'
        alt='Avatar'
        onClick={handleClick}
      />
      <SideNav showNav={showNav} onClose={handleClose} />
    </div>
  );
}

export default Nav;
