export interface Message {
  id: string;
  avatar: string;
  username: string;
  timestamp: string;
  content: string;
  likes: number;
  replies: number;
  reposts: number;
}

export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
  updated_at: string | null;
}

export interface AuthError {
  message: string;
  status?: number;
}
