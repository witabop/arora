import React from 'react';
import '../styles/Result.css';

const Result = ({ game }) => {
  
  const getMatchColor = (percentage) => {
    if (percentage >= 85) return '#3cc75a'; // Green
    if (percentage >= 50) return '#e6c926'; // Yellow
    return '#e63946'; // Red
  };

  return (
    <div className="result-item">
      <div className="result-image-container">
        <img src={game.imageUrl} alt={game.name} className="result-image" />
      </div>
      <div className="result-content">
        <div className="result-header">
          <h3 className="result-title">{game.name}</h3>
          <span 
            className="result-match" 
            style={{ color: getMatchColor(game.matchPercentage) }}
          >
            {game.matchPercentage}% Match
          </span>
        </div>
        <p className="result-description">{game.description}</p>
        <div className="result-actions">
          <a 
            href={game.gameUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="join-button"
          >
            Join
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;