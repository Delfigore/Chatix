import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './lib/auth';

// Mock the auth hook
vi.mock('./lib/auth', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => ({
    user: null,
    loading: false
  })
}));

describe('App', () => {
  it('redirects to login when not authenticated', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Should show login form for unauthenticated users
    expect(window.location.pathname).toBe('/login');
  });
});