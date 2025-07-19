import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders blockchain supply chain tracker', () => {
  render(<App />);
  const titleElement = screen.getByText(/Blockchain Supply Chain Tracker/i);
  expect(titleElement).toBeInTheDocument();
});
