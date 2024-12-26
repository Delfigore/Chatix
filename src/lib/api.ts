import { supabase } from './supabase';
import type { Message, User, Like, Reply, Repost } from '@/types/models';

export const api = {
  messages: {
    async list(page = 1, limit = 20) {
      const start = (page - 1) * limit;
      const end = start + limit - 1;

      const { data, error, count } = await supabase
        .from('messages')
        .select(`
          *,
          user:users(*)
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(start, end);

      if (error) throw error;
      return { data: data as Message[], count };
    },

    async create(content: string, media_url?: string) {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('messages')
        .insert({
          content,
          media_url,
          user_id: user.user.id,
        })
        .select(`
          *,
          user:users(*)
        `)
        .single();

      if (error) throw error;
      return data as Message;
    },

    async like(messageId: string) {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('likes')
        .insert({
          message_id: messageId,
          user_id: user.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Like;
    },

    async unlike(messageId: string) {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('likes')
        .delete()
        .match({ message_id: messageId, user_id: user.user.id });

      if (error) throw error;
    },

    async reply(messageId: string, content: string) {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('replies')
        .insert({
          message_id: messageId,
          user_id: user.user.id,
          content,
        })
        .select(`
          *,
          user:users(*)
        `)
        .single();

      if (error) throw error;
      return data as Reply;
    },

    async repost(messageId: string) {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('reposts')
        .insert({
          message_id: messageId,
          user_id: user.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Repost;
    },
  },
};