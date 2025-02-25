import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faInfoCircle, faChartBar, faPlus, faExclamationTriangle, faX } from '@fortawesome/free-solid-svg-icons';
import SearchBarComponent from '../../Components/SearchBar';
import Tooltip from '../../Components/Tooltip';
import '../../styles/Home.css';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState(false);
  const [searchBars, setSearchBars] = useState([{ id: 1, category: 'name', query: '' }]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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

  const addSearchBar = () => {
    const newId = searchBars.length > 0
      ? Math.max(...searchBars.map(bar => bar.id)) + 1
      : 1;
    const updatedSearchBars = [...searchBars, { id: newId, category: 'name', query: '' }];
    setSearchBars(updatedSearchBars);

    if (updatedSearchBars.length > 4 && !showTooltip) {
      setShowTooltip(true);
    }
  };

  const deleteSearchBar = (id) => {
    // Only delete if we have more than one search bar
    if (searchBars.length > 1) {
      const updatedSearchBars = searchBars.filter(bar => bar.id !== id);
      setSearchBars(updatedSearchBars);

      if (updatedSearchBars.length <= 4 && showTooltip) {
        setShowTooltip(false);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleCategoryChange = (id, category) => {
    const updatedSearchBars = searchBars.map(bar =>
      bar.id === id ? { ...bar, category, query: '' } : bar
    );
    setSearchBars(updatedSearchBars);
  };

  const handleQueryChange = (id, query) => {
    const updatedSearchBars = searchBars.map(bar =>
      bar.id === id ? { ...bar, query } : bar
    );
    setSearchBars(updatedSearchBars);
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <div className="homepage-container">
      <Tooltip
        message="Adding too much criteria can slow down your search. Consider narrowing your criteria for quicker searches!"
        type="warning"
        visible={showTooltip}
        onClose={handleCloseTooltip}
        icon={faExclamationTriangle}
      />

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
                  <a href="#" className="menu-link">
                    <FontAwesomeIcon icon={faHome} className="menu-icon" />
                    Home
                  </a>
                </li>
                <li className="menu-item">
                  <a href="about" className="menu-link">
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
          <h1 className="logo-text">
            ARO<span className="reversed-r">R</span>A
          </h1>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-bars-container">
            {searchBars.map((searchBar) => (
              <SearchBarComponent
                key={searchBar.id}
                category={searchBar.category}
                query={searchBar.query}
                onCategoryChange={(category) => handleCategoryChange(searchBar.id, category)}
                onQueryChange={(query) => handleQueryChange(searchBar.id, query)}
                onDelete={() => deleteSearchBar(searchBar.id)}
                showDeleteButton={searchBars.length > 1}
              />
            ))}
          </div>

          <div className="add-search-container">

          </div>

          <div className="search-button-container">
            <button
              type="submit"
              className="search-button"
            >
              Search
            </button>
            <button
              type="button"
              onClick={addSearchBar}
              className="add-search-button"
            >
              <FontAwesomeIcon icon={faPlus} className="add-icon" />
              Add criteria
            </button>
          </div>
        </form>

        {/* Search results */}
        {hasSearched && (
          <div className="results-container">
            <h2 className="results-title">Search Results</h2>
            <div className="results-list">
              {searchBars.map((bar) => (
                <div key={bar.id} className="result-item">
                  <p><strong>Category:</strong> {bar.category}</p>
                  <p><strong>Query:</strong> {bar.query || 'No query entered'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;