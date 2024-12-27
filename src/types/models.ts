export interface User {
  id: string;
  username: string;
  avatar_url?: string;
  email: string;
  created_at: string;
}

export interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  replies_count: number;
  reposts_count: number;
  media_url?: string;
  user?: User;
}

export interface Like {
  id: string;
  user_id: string;
  message_id: string;
  created_at: string;
}

export interface Reply {
  id: string;
  content: string;
  user_id: string;
  message_id: string;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Repost {
  id: string;
  user_id: string;
  message_id: string;
  created_at: string;
}