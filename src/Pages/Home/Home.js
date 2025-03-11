import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faInfoCircle, faChartBar, faPlus, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import SearchBarComponent from '../../Components/SearchBar';
import Tooltip from '../../Components/Tooltip';
import Result from '../../Components/Result';
import '../../styles/Home.css';

const dummyGames = [
  {
    id: 1,
    name: 'Dungeon Quest Simulator',
    description: 'Explore ancient dungeons, defeat epic bosses, and collect rare loot in this action-packed adventure game. Team up with friends or venture alone to uncover hidden treasures and secrets!',
    matchPercentage: 95,
    imageUrl: 'https://via.placeholder.com/120x120',
    gameUrl: 'https://www.roblox.com/games/dungeon-quest'
  },
  {
    id: 2,
    name: 'City Life Roleplay',
    description: 'Live your dream life in a bustling virtual city. Get a job, buy a house, drive luxury cars, and meet new friends. The possibilities are endless in this immersive roleplay experience!',
    matchPercentage: 82,
    imageUrl: 'https://via.placeholder.com/120x120',
    gameUrl: 'https://www.roblox.com/games/city-life'
  },
  {
    id: 3,
    name: 'Zombie Survival',
    description: 'Can you survive the zombie apocalypse? Scavenge for supplies, build defenses, and fight off hordes of the undead in this thrilling survival game. Cooperate with other survivors or fight for yourself!',
    matchPercentage: 68,
    imageUrl: 'https://via.placeholder.com/120x120',
    gameUrl: 'https://www.roblox.com/games/zombie-survival'
  },
  {
    id: 4,
    name: 'Tycoon Empire',
    description: 'Build your business empire from the ground up! Start with a small shop and expand into a massive industrial complex. Research new technologies, hire workers, and outperform your competitors.',
    matchPercentage: 43,
    imageUrl: 'https://via.placeholder.com/120x120',
    gameUrl: 'https://www.roblox.com/games/tycoon-empire'
  }
];

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState(false);
  const [searchBars, setSearchBars] = useState([{ id: 1, category: 'name', query: '' }]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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
    
    // Log the search criteria (for future API integration)
    console.log('Search Criteria:', searchBars);
    
    // Filter out empty queries for API call
    const validSearchBars = searchBars.filter(bar => bar.query.trim() !== '');
    
    // In the future, we would make an API call here
    // For now, we'll just use our dummy data
    setSearchResults(dummyGames);
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
              {searchResults.map(game => (
                <Result key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;