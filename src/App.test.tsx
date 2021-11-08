import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Battelship app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Batteship/i);
  expect(linkElement).toBeInTheDocument();
});
