import { render, screen } from '@testing-library/react';
import Result from './Result';

describe('Result Component', () => {
  const mockGame = {
    id: 1,
    name: 'Test Game',
    description: 'This is a test game description',
    matchPercentage: 90,
    imageUrl: 'https://via.placeholder.com/120x120',
    gameUrl: 'https://test-game-url.com'
  };

  test('renders game information correctly', () => {
    render(<Result game={mockGame} />);
    
    // Check if game name is rendered
    expect(screen.getByText('Test Game')).toBeInTheDocument();
    
    // Check if description is rendered
    expect(screen.getByText('This is a test game description')).toBeInTheDocument();
    
    // Check if match percentage is rendered
    expect(screen.getByText('90% Match')).toBeInTheDocument();
    
    // Check if image is rendered with correct alt text
    const image = screen.getByAltText('Test Game');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/120x120');
    
    // Check if join button is rendered with correct link
    const joinButton = screen.getByText('Join');
    expect(joinButton).toBeInTheDocument();
    expect(joinButton).toHaveAttribute('href', 'https://test-game-url.com');
  });
});