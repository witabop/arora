import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faInfoCircle, faChartBar } from '@fortawesome/free-solid-svg-icons';
import '../../styles/About.css';
import logo from '../../assets/aroralogo.png';

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState(false);

  // Handle menu open/close with animation
  const toggleMenu = () => {
    if (isMenuOpen) {
      setMenuAnimation(false);

      setTimeout(() => {
        setIsMenuOpen(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
      setTimeout(() => {
        setMenuAnimation(true);
      }, 10);
    }
  };

  return (
    <div className="aboutpage-container">
      <div className="hamburger-button">
        <button
          onClick={toggleMenu}
          className="menu-button"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      <div className={`menu-overlay ${isMenuOpen ? 'visible' : 'hidden'}`}>
        <div className={`sliding-menu ${menuAnimation ? 'menu-open' : 'menu-closed'}`}>
          <div className="menu-content">
            <div className="menu-close">
              <button
                onClick={toggleMenu}
                className="close-button"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>
            <nav className="menu-nav">
              <ul className="menu-list">
                <li className="menu-item">
                  <a href="/" className="menu-link">
                    <FontAwesomeIcon icon={faHome} className="menu-icon" />
                    Home
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#" className="menu-link">
                    <FontAwesomeIcon icon={faInfoCircle} className="menu-icon" />
                    About
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#" className="menu-link">
                    <FontAwesomeIcon icon={faChartBar} className="menu-icon" />
                    Stats
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <main className="main-content">
        <div className="logo-container">
          <div className="logo-container">
            <img
              src={logo}
              alt="ARORA Logo"
              className="responsive-logo"
            />
          </div>
        </div>
        <div className="faq-container">
          <h2>What is ARORA?</h2>
          <p>ARORA is a search engine for Roblox games that allows users to view games by criteria they specify. It works by rapidly querying games from the Roblox API at random, returning games to the user that match their criteria. This is necessary because querying every game Roblox has sequentially would take months, assuming whatever program you use doesn't get rate limited or IP-banned in the process; in other words, just searching for games directly to get all of them isn't feasible. </p>
          <h2>How do I use ARORA?</h2>
          <p>[waiting for site completion; include gifs here]</p>
          <h2>Why ARORA?</h2>
          <p>
            ARORA was created out of a desire to see more unique games than are shown on the Roblox homepage. While games shown on the homepage are generally popular, they often perpetuate similar gameplay and design elements that can be tired with overuse. We wanted to create a way to find games that Roblox wouldn't recommend but were still fun (or perhaps fun *because* of that): "hidden gems", in other phrasing.
            <br></br><br></br>
            We could have just made a system to get any random game with no filtering at all, but that's not likely to show the user a game they'll enjoy. A relatively empty Roblox game can be created with just a few clicks, while making a game with more substance takes much more effort; thus the former outnumbers the latter drastically. This was why we decided on a more complex system that allows users to filter by criteria to find higher-quality games.
          </p>
          <br></br>
          <p>If you have any further questions about this tool or you are experiencing issues, please contact us at - - - - or open an issue on our github.</p>
        </div>
      </main>
    </div>
  );
};

export default About;