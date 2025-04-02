import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faInfoCircle, faChartBar, faPlus, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import SearchBarComponent from '../../Components/SearchBar';
import Tooltip from '../../Components/Tooltip';
import Result from '../../Components/Result';
import '../../styles/Home.css';
import logo from '../../assets/aroralogo.png';

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

// Define all available criteria types
const allCriteriaTypes = [
  { id: 'amount', name: 'Amount', placeholder: '5', inputType: 'number', max: 15 },
  { id: 'name', name: 'Name', placeholder: 'pick up 20 rocks simulator...', inputType: 'text' },
  { id: 'description', name: 'Description', placeholder: 'in this game you pick up 20 rocks...', inputType: 'text' },
  { id: 'plays', name: 'Plays', placeholder: '10000...', inputType: 'number' },
  { id: 'likes', name: 'Likes', placeholder: '78922...', inputType: 'number' },
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

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchActive) return;
    
    setSearchActive(true);

    console.log('Search Criteria:', searchBars);

    // Step 1: Request received
    setSearchTextClass("search-progress-text-4 text-fade");
    await delay(500); // These two 500ms delays act as a 1s minimum delay to prevent rapid graphic changes for each of these steps
    setSearchTextClass("search-progress-text-1 text-fade");
    await delay(500);
    setSearchTextClass("search-progress-text-1");

    await delay(2000); // Additional delay to simulate loading for now
                       // This is probably where the code would be to await a signal to move to the next step

    // Step 2: Thinking
    setSearchTextClass("search-progress-text-1 text-fade");
    await delay(500);
    setSearchTextClass("search-progress-text-2 text-fade");
    await delay(500);
    setSearchTextClass("search-progress-text-2");

    await delay(2000); // Another loading simulation delay

    // Step 3: Data received
    setSearchTextClass("search-progress-text-2 text-fade");
    await delay(500);
    setSearchTextClass("search-progress-text-3 text-fade");
    await delay(500);
    setSearchTextClass("search-progress-text-3");

    await delay(2000); // Processing simulation delay (?)
    
    // Filter out empty queries for API call
    const validSearchBars = searchBars.filter(bar => bar.query.trim() !== '');
    
    // In the future, we would make an API call here
    // For now, we'll just use our dummy data
    setSearchResults(dummyGames);
    setHasSearched(true);

    // Step 4: (clear text)
    setSearchTextClass("search-progress-text-3 text-fade");
    await delay(500);
    setSearchTextClass("search-progress-text-4 text-fade");
    await delay(500);
    setSearchTextClass("search-progress-text-4");
    
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
    // For 'amount' criteria, enforce max value of 15
    const searchBar = searchBars.find(bar => bar.id === id);
    if (searchBar.category === 'amount' && query !== '') {
      const numValue = parseInt(query, 10);
      if (!isNaN(numValue) && numValue > 15) {
        query = '15';
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
    <div className="homepage-container">
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
          <div class="search-progress-text-container">
            <p class={searchTextClass}/>
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