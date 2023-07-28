import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from './Form';

test('renders and test form', () => {
  render(<Form/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
