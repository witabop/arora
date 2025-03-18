import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import '../styles/SearchBar.css';

const SearchBar = ({ 
  category, 
  query, 
  onCategoryChange, 
  onQueryChange, 
  onDelete, 
  showDeleteButton,
  availableCategories,
  disableDropdown = false,
  maxValue = null,
  placeholder = null 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Default categories if not provided
  const categories = availableCategories || [
    { id: 'amount', name: 'Amount', placeholder: '5', inputType: 'number', max: 15 },
    { id: 'name', name: 'Name', placeholder: 'pick up 20 rocks simulator...', inputType: 'text' },
    { id: 'description', name: 'Description', placeholder: 'in this game you pick up 20 rocks...', inputType: 'text' },
    { id: 'plays', name: 'Plays', placeholder: '10000...', inputType: 'number' },
    { id: 'likes', name: 'Likes', placeholder: '78922...', inputType: 'number' },
    { id: 'players', name: 'Active Players', placeholder: '45...', inputType: 'number' }
  ];

  const selectedCategory = categories.find(c => c.id === category) || categories[0];

  const toggleDropdown = () => {
    if (!disableDropdown) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const selectCategory = (categoryId) => {
    onCategoryChange(categoryId);
    setIsDropdownOpen(false);
  };

  // max value
  const handleInputChange = (e) => {
    let value = e.target.value;
    
    // 
    if (selectedCategory.inputType === 'number' && maxValue !== null && value !== '') {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue > maxValue) {
        value = maxValue.toString();
      }
    }
    
    onQueryChange(value);
  };

  // Get placeholder text
  const getPlaceholder = () => {
    if (placeholder) {
      return placeholder;
    }
    return selectedCategory.placeholder;
  };

  return (
    <div 
      className="search-bar-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="search-bar">
        <div className="dropdown-container">
          <button
            type="button"
            onClick={toggleDropdown}
            className={`dropdown-button ${disableDropdown ? 'disabled' : ''}`}
            disabled={disableDropdown}
          >
            <span>{selectedCategory.name}</span>
            {!disableDropdown && <span className="dropdown-arrow">▼</span>}
          </button>
          
          {isDropdownOpen && !disableDropdown && categories.length > 1 && (
            <div className="dropdown-menu">
              <ul className="dropdown-list">
                {categories.map((cat) => (
                  <li key={cat.id} className="dropdown-item">
                    <button
                      type="button"
                      onClick={() => selectCategory(cat.id)}
                      className="dropdown-option"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Search input */}
        <input
          type={selectedCategory.inputType}
          placeholder={getPlaceholder()}
          value={query}
          onChange={handleInputChange}
          className="search-input"
          max={maxValue}
        />
      </div>
      
   
      {isHovered && showDeleteButton && (
        <button
          type="button"
          onClick={onDelete}
          className="delete-button"
          aria-label="Delete search bar"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;