import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MessageCard from '../MessageCard';
import { vi } from 'vitest';

describe('MessageCard', () => {
  const mockProps = {
    avatar: 'test-avatar.jpg',
    username: 'testuser',
    timestamp: '2h ago',
    content: 'Test message content',
    likes: 10,
    replies: 5,
    reposts: 3,
    onLike: vi.fn(),
    onRepost: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders message content correctly', () => {
    render(<MessageCard {...mockProps} />);
    expect(screen.getByText(mockProps.content)).toBeInTheDocument();
    expect(screen.getByText(mockProps.username)).toBeInTheDocument();
    expect(screen.getByText(mockProps.timestamp)).toBeInTheDocument();
  });

  it('calls onLike when like button is clicked', async () => {
    render(<MessageCard {...mockProps} />);
    const likeButton = screen.getByRole('button', { name: mockProps.likes.toString() });
    fireEvent.click(likeButton);
    expect(mockProps.onLike).toHaveBeenCalled();
  });

  it('calls onRepost when repost button is clicked', async () => {
    render(<MessageCard {...mockProps} />);
    const repostButton = screen.getByRole('button', { name: mockProps.reposts.toString() });
    fireEvent.click(repostButton);
    expect(mockProps.onRepost).toHaveBeenCalled();
  });

  it('handles image load error correctly', () => {
    render(<MessageCard {...mockProps} />);
    const img = screen.getByAltText(mockProps.username);
    fireEvent.error(img);
    expect(img.getAttribute('src')).toBe('https://api.dicebear.com/7.x/avataaars/svg?seed=fallback');
  });
});
