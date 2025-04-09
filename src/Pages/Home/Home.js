import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faInfoCircle, faChartBar, faPlus, faExclamationTriangle, faPaperPlane, faBrain, faCheckCircle, faArrowRotateLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SearchBarComponent from '../../Components/SearchBar';
import Tooltip from '../../Components/Tooltip';
import Result from '../../Components/Result';
import '../../styles/Home.css';
import logo from '../../assets/aroralogo.png';
import axios from 'axios';

// Define all available criteria types
const allCriteriaTypes = [
  { id: 'amount', name: 'Amount', placeholder: '5', inputType: 'number', max: 15 },
  { id: 'name', name: 'Name', placeholder: 'pick up 20 rocks simulator...', inputType: 'text' },
  { id: 'description', name: 'Description', placeholder: 'in this game you pick up 20 rocks...', inputType: 'text' },
  { id: 'plays', name: 'Visits', placeholder: '10000...', inputType: 'number' },
  { id: 'likes', name: 'Favorites', placeholder: '78922...', inputType: 'number' },
  { id: 'players', name: 'Active Players', placeholder: '45...', inputType: 'number' }
];

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState(false);
  // Initialize with 'amount' as the default criteria
  const [searchBars, setSearchBars] = useState([{ id: 1, category: 'amount', query: '' }]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  // Search feedback fields
  const [searchActive, setSearchActive] = useState(false);
  const [searchTextClass, setSearchTextClass] = useState(['class']);
  // Keep track of used criteria to prevent duplicates
  const [usedCriteria, setUsedCriteria] = useState(['amount']);

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
    const availableCriteria = allCriteriaTypes.filter(type => !usedCriteria.includes(type.id));

    // show tooltip and don't add more search bars
    if (availableCriteria.length === 0) {
      setShowTooltip(true);
      return;
    }

    // Create a new search bar with the first available criteria type
    const newCategory = availableCriteria[0].id;
    const newId = searchBars.length > 0
      ? Math.max(...searchBars.map(bar => bar.id)) + 1
      : 1;

    const updatedSearchBars = [...searchBars, { id: newId, category: newCategory, query: '' }];
    setSearchBars(updatedSearchBars);

    // Update used criteria
    setUsedCriteria([...usedCriteria, newCategory]);

    if (updatedSearchBars.length > 4 && !showTooltip) {
      setShowTooltip(true);
    }
  };

  const deleteSearchBar = (id) => {
    // Find the search bar to be deleted
    const barToDelete = searchBars.find(bar => bar.id === id);

    // Don't allow deletion of amount criteria
    if (barToDelete.category === 'amount') {
      return;
    }

    if (searchBars.length > 1) {
      const updatedSearchBars = searchBars.filter(bar => bar.id !== id);
      setSearchBars(updatedSearchBars);

      setUsedCriteria(usedCriteria.filter(c => c !== barToDelete.category));

      if (updatedSearchBars.length <= 4 && showTooltip) {
        setShowTooltip(false);
      }
    }
  };

  const calculatePercentage = (game, criteria) => {
    return Math.floor(Math.random() * 100);
  }


  const getImageURL = async (gameId) => {
    try {
      const response = await fetch(`https://thumbnails.roproxy.com/v1/games/multiget/thumbnails?universeIds=${gameId}&size=768x432&format=Png&isCircular=false`);
      const data = await response.json();
      const imageUrl = data.data[0].thumbnails[0].imageUrl;
      return imageUrl;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchActive) return;

    setSearchActive(true);

    // Step 1: Request received
    setSearchTextClass("search-progress-text-4 text-fade");
    await delay(500); // These two 500ms delays act as a 1s minimum delay to prevent rapid graphic changes for each of these steps
    setSearchTextClass("search-progress-text-1 text-fade");
    await delay(500);
    setSearchTextClass("search-progress-text-1");

    await delay(2000); 

    // Step 2: Thinking
    setSearchTextClass("search-progress-text-1 text-fade");
    await delay(500);
    setSearchTextClass("search-progress-text-2 text-fade");
    await delay(500);
    setSearchTextClass("search-progress-text-2");

    const res = await axios.post('https://r8oxhje7na.execute-api.us-east-1.amazonaws.com/dev/search/brain', {
      numGames: parseInt(searchBars[0].query),
      searchCriteria: {
        name: searchBars.filter(bar => bar.category === 'name')[0]?.query,
        description: searchBars.filter(bar => bar.category === 'description')[0]?.query,
        visits: parseInt(searchBars.filter(bar => bar.category === 'plays')[0]?.query),
        favoritedCount: parseInt(searchBars.filter(bar => bar.category === 'likes')[0]?.query),
        playing: parseInt(searchBars.filter(bar => bar.category === 'players')[0]?.query)
      }

    })
    const games = res.data['data'];
    console.log(games);
    // Filter out empty queries for API call
    const validSearchBars = searchBars.filter(bar => bar.query.trim() !== '');

    const fulfilledGames = await Promise.all(games.map(async game => {
      const imageUrl = await getImageURL(game.id);
      return { ...game, matchPercentage: 100 * game.percentMatch, imageUrl: imageUrl, gameUrl: `https://www.roblox.com/games/start?placeId=${game.rootPlaceId}` };
    }))
    
    

    // Show No Results message if no games found
    if (fulfilledGames.length === 0) {
      setSearchTextClass("search-progress-text-2 text-fade");
      await delay(500);
      setSearchTextClass("search-progress-text-no-results text-fade");
      await delay(500);
      setSearchTextClass("search-progress-text-no-results");
      // Keep the no results message visible for 3 seconds
      await delay(3000);
      setSearchTextClass("search-progress-text-no-results text-fade");
      await delay(500);
      setSearchTextClass("search-progress-text-4 text-fade");
      await delay(500);
      setSearchTextClass("search-progress-text-4");
    } else {
      // Step 4: (clear text) for successful search
      setSearchTextClass("search-progress-text-2 text-fade");
      await delay(500);
      setSearchTextClass("search-progress-text-3 text-fade");
      await delay(500);
      setSearchTextClass("search-progress-text-3");
      await delay(200);
      setSearchTextClass("search-progress-text-3 text-fade");
      await delay(500);
      setSearchTextClass("search-progress-text-4 text-fade");
      await delay(500);
      setSearchTextClass("search-progress-text-4");
    }

    // Accumulate search results instead of replacing them
    if (fulfilledGames.length > 0) {
      setSearchResults(prevResults => [...prevResults, ...fulfilledGames]);
      setHasSearched(true);
    }

    setSearchActive(false);
  };

  const handleCategoryChange = (id, newCategory) => {
    const searchBar = searchBars.find(bar => bar.id === id);

    if (searchBar.category === 'amount') {
      return;
    }


    const oldCategory = searchBar.category;
    setUsedCriteria([...usedCriteria.filter(c => c !== oldCategory), newCategory]);


    const updatedSearchBars = searchBars.map(bar =>
      bar.id === id ? { ...bar, category: newCategory, query: '' } : bar
    );
    setSearchBars(updatedSearchBars);
  };

  const handleQueryChange = (id, query) => {
    const searchBar = searchBars.find(bar => bar.id === id);
    
    // Handle numerical inputs
    if (searchBar.category === 'amount' || 
        searchBar.category === 'plays' || 
        searchBar.category === 'likes' || 
        searchBar.category === 'players') {
      
      // Prevent negative values
      if (query.startsWith('-')) {
        query = query.substring(1);
      }
      
      // For 'amount' criteria, enforce max value of 15
      if (searchBar.category === 'amount' && query !== '') {
        const numValue = parseInt(query, 10);
        if (!isNaN(numValue) && numValue > 15) {
          query = '15';
        }
      }
    }

    const updatedSearchBars = searchBars.map(bar =>
      bar.id === id ? { ...bar, query } : bar
    );
    setSearchBars(updatedSearchBars);
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  // Clear search results
  const clearSearchResults = () => {
    setSearchResults([]);
    setHasSearched(false);
  };

  const getAvailableCategories = (currentCategory) => {
    if (currentCategory === 'amount') {
      return [allCriteriaTypes.find(type => type.id === 'amount')];
    }

    // return current + available
    return [
      allCriteriaTypes.find(type => type.id === currentCategory),
      ...allCriteriaTypes.filter(type => !usedCriteria.includes(type.id))
    ];
  };


  return (
    <div className={"homepage-container"}>
      <Tooltip
        message={allCriteriaTypes.length === usedCriteria.length
          ? "You've used all available criteria types."
          : "Adding too much criteria can slow down your search. Consider narrowing your criteria for quicker searches!"}
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
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <main className="main-content">
        <div className="logo-container">
          <img
            src={logo}
            alt="ARORA Logo"
            className="responsive-logo"
          />
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
                showDeleteButton={searchBar.category !== 'amount' && searchBars.length > 1}
                availableCategories={getAvailableCategories(searchBar.category)}
                disableDropdown={searchBar.category === 'amount'}
                maxValue={searchBar.category === 'amount' ? 15 : null}
                placeholder={searchBar.category === 'amount' ? '5' : null}
              />
            ))}
          </div>

          <div className="add-search-container">
          </div>

          <div className="search-button-container">
            <button
              type="submit"
              className={"search-button " + (searchActive ? 'search-button-active' : '')}
              disabled={searchActive}
            >
              {(searchActive ? 'Searching' : 'Search')}
            </button>
            <button
              type="button"
              onClick={addSearchBar}
              className="add-search-button"
              disabled={allCriteriaTypes.length === usedCriteria.length}
            >
              <FontAwesomeIcon icon={faPlus} className="add-icon" />
              Add criteria
            </button>
          </div>
          <div className="search-progress-text-container">
            <div className={searchTextClass}>
              {searchTextClass.includes("search-progress-text-1") && 
                <FontAwesomeIcon icon={faPaperPlane} className="progress-icon" />}
              {searchTextClass.includes("search-progress-text-2") && 
                <FontAwesomeIcon icon={faBrain} className="progress-icon" />}
              {searchTextClass.includes("search-progress-text-3") && 
                <FontAwesomeIcon icon={faCheckCircle} className="progress-icon" />}
              {searchTextClass.includes("search-progress-text-no-results") && 
                <FontAwesomeIcon icon={faArrowRotateLeft} className="progress-icon rotate-icon" />}
            </div>
          </div>
        </form>

        {/* Search results */}
        {hasSearched && (
          <div className="results-container">
            <div className="results-header">
              <h2 className="results-title">Search Results</h2>
              <button 
                className="clear-results-button"
                onClick={clearSearchResults}
                aria-label="Clear results"
              >
                Clear
              </button>
            </div>
            <div className="results-list">
              {searchResults.map((game, index) => (
                <Result key={`${game.id}-${index}`} game={game} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;