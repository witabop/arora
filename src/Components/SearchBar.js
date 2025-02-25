import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import '../styles/SearchBar.css';

const SearchBar = ({ category, query, onCategoryChange, onQueryChange, onDelete, showDeleteButton }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    const categories = [
      { id: 'name', name: 'Name', placeholder: 'pick up 20 rocks simulator...', inputType: 'text' },
      { id: 'description', name: 'Description', placeholder: 'in this game you pick up 20 rocks...', inputType: 'text' },
      { id: 'plays', name: 'Plays', placeholder: '10000...', inputType: 'number' },
      { id: 'likes', name: 'Likes', placeholder: '78922...', inputType: 'number' },
      { id: 'players', name: 'Active Players', placeholder: '45...', inputType: 'number' }
      
    ];
  
    const selectedCategory = categories.find(c => c.id === category) || categories[0];
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const selectCategory = (categoryId) => {
      onCategoryChange(categoryId);
      setIsDropdownOpen(false);
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
              className="dropdown-button"
            >
              <span>{selectedCategory.name}</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {isDropdownOpen && (
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
            placeholder={selectedCategory.placeholder}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="search-input"
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