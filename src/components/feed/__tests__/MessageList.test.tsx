import { render, screen, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import MessageList from '../MessageList';
import { api } from '@/lib/api';

vi.mock('@/lib/api', () => ({
  api: {
    messages: {
      list: vi.fn(),
      like: vi.fn(),
      repost: vi.fn(),
    },
  },
}));

describe('MessageList', () => {
  const mockMessages = [
    {
      id: '1',
      content: 'Test message 1',
      created_at: '2024-03-27T10:00:00Z',
      user: {
        username: 'user1',
        avatar_url: 'avatar1.jpg',
      },
      likes_count: 5,
      replies_count: 2,
      reposts_count: 1,
    },
    {
      id: '2',
      content: 'Test message 2',
      created_at: '2024-03-27T11:00:00Z',
      user: {
        username: 'user2',
        avatar_url: 'avatar2.jpg',
      },
      likes_count: 3,
      replies_count: 1,
      reposts_count: 0,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (api.messages.list as jest.Mock).mockResolvedValue({
      data: mockMessages,
      count: mockMessages.length,
    });
  });

  it('renders loading state initially', async () => {
    render(<MessageList />);
    expect(screen.getAllByTestId('message-skeleton')).toHaveLength(3);
  });

  it('renders messages after loading', async () => {
    await act(async () => {
      render(<MessageList />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test message 1')).toBeInTheDocument();
      expect(screen.getByText('Test message 2')).toBeInTheDocument();
    });
  });

  it('handles error state correctly', async () => {
    (api.messages.list as jest.Mock).mockRejectedValue(new Error('Failed to load'));
    
    await act(async () => {
      render(<MessageList />);
    });

    await waitFor(() => {
      expect(screen.getByText(/failed to load messages/i)).toBeInTheDocument();
    });
  });
});
