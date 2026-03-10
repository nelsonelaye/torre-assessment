import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchExplorer } from '@/components/SearchExplorer';
import { searchTorreUsers } from '@/lib/api';

jest.mock('@/lib/api', () => ({
  searchTorreUsers: jest.fn(),
  getTorreProfile: jest.fn(),
}));


jest.mock('use-debounce', () => ({
  useDebounce: (value: any) => [value],
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <SearchExplorer />
    </QueryClientProvider>
  );

describe('SearchExplorer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        queryClient.clear();
    });

  it('renders initial state without search query', () => {
    renderComponent();

    // Verify search input is present
    expect(screen.getByPlaceholderText(/Search talent on Torre.ai.../i)).toBeInTheDocument();

    // Verify initial "Home" prompt is displayed
    expect(screen.getByText(/Search for team members/i)).toBeInTheDocument();
    expect(screen.getByText(/Type a name, role, or department above/i)).toBeInTheDocument();
  });

  it('displays results when user searches with a query', async () => {
    const mockUsers = [
      {
        id: '1',
        name: 'Jane Smith',
        role: 'Fullstack Dev',
        avatar: 'https://via.placeholder.com/150',
        username: 'jsmith',
        organization: 'Orbit'
      }
    ];

    // Mock search function to call the update callback
    (searchTorreUsers as jest.Mock).mockImplementation(async (_query, _limit, updateCb) => {
        // Wait a tick to let the "clear results" effect run first
        await new Promise(resolve => setTimeout(resolve, 0));
        if(updateCb) updateCb(mockUsers);
        return mockUsers;
    });

    renderComponent();

    const input = screen.getByPlaceholderText(/Search talent on Torre.ai.../i);
    fireEvent.change(input, { target: { value: 'Jane' } });

    // Verify loading/streaming state
    await waitFor(() => {
        expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
        expect(screen.getByText(/Fullstack Dev/i)).toBeInTheDocument();
        expect(screen.getByText(/1 Results found/i)).toBeInTheDocument();
    });
  });

  it('shows appropriate empty state when API returns no results', async () => {
    // Mock search function to return empty results
    (searchTorreUsers as jest.Mock).mockResolvedValue([]);

    renderComponent();

    const input = screen.getByPlaceholderText(/Search talent on Torre.ai.../i);
    fireEvent.change(input, { target: { value: 'NonExistentUser' } });

    await waitFor(() => {
      expect(screen.getByText(/No matches found/i)).toBeInTheDocument();
      expect(screen.getByText(/We couldn't find anyone matching/i)).toBeInTheDocument();
    });
  });
});
