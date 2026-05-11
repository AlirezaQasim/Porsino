import { render, screen } from '@testing-library/react';
import App from './App';

test('renders language selection page', () => {
  render(<App />);
  expect(screen.getByText(/english/i)).toBeInTheDocument();
});
