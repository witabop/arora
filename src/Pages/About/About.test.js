import { render, screen } from '@testing-library/react';
import About from './About';

test('renders about page text', () => {
  render(<About />);
  const linkElement = screen.getByText(/about/i);
  expect(linkElement).toBeInTheDocument();
});
