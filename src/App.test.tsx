import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/欢迎来到我的数字花园/i);
  expect(linkElement).toBeInTheDocument();
});
