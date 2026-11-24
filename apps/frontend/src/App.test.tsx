import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App';

describe('App', () => {
  it('renders heading and student info', () => {
    render(<App />);
    expect(screen.getByText('CI/CD React + Node Demo')).toBeInTheDocument();
    expect(screen.getByText(/2024210402002/)).toBeInTheDocument();
  });
});
