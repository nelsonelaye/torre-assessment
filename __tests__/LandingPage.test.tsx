import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/components/SearchExplorer', () => ({
  SearchExplorer: () => <div data-testid="search-explorer">Search Explorer</div>,
}));


describe('Landing Page', () => {
  const queryClient = new QueryClient();

  it('renders the landing page correctly at initial state', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    // Verify header/logo
    expect(screen.getAllByText(/Orbit Talent/i).length).toBeGreaterThanOrEqual(1);

    // Verify HERO section content
    expect(screen.getByText(/Find your next/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore world-class talent/i)).toBeInTheDocument();

    // Verify SearchExplorer component is present
    expect(screen.getByTestId('search-explorer')).toBeInTheDocument();

    // Verify Footer
    expect(screen.getByText(/© 2026 Orbit Talent Systems/i)).toBeInTheDocument();
  });
});
