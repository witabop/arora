import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Home page text', () => {
  render(<Home />);
  const linkElement = screen.getByText(/nothing/i);
  expect(linkElement).toBeInTheDocument();
});
