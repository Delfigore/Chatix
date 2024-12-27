import { supabase } from "./supabase";
import type { Message, Like, Reply, Repost } from "@/types/models";

export const api = {
  messages: {
    async list(page = 1, limit = 20) {
      const start = (page - 1) * limit;
      const end = start + limit - 1;

      const { data, error, count } = await supabase
        .from("messages")
        .select(
          `
          *,
          user:profiles(*),
          stats:message_stats!inner(*)
        `,
          { count: "exact" },
        )
        .order("created_at", { ascending: false })
        .range(start, end);

      if (error) throw error;
      return {
        data: data.map((msg) => ({
          ...msg,
          likes_count: msg.stats.likes_count,
          replies_count: msg.stats.replies_count,
          reposts_count: msg.stats.reposts_count,
        })) as Message[],
        count,
      };
    },

    async create(content: string, media_url?: string) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("messages")
        .insert({
          content,
          media_url,
          user_id: user.id,
        })
        .select(
          `
          *,
          user:profiles(*)
        `,
        )
        .single();

      if (error) throw error;
      return {
        ...data,
        likes_count: 0,
        replies_count: 0,
        reposts_count: 0,
      } as Message;
    },

    async like(messageId: string) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("likes")
        .insert({
          message_id: messageId,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Like;
    },

    async unlike(messageId: string) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("likes")
        .delete()
        .match({ message_id: messageId, user_id: user.id });

      if (error) throw error;
    },

    async reply(messageId: string, content: string) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("replies")
        .insert({
          message_id: messageId,
          user_id: user.id,
          content,
        })
        .select(
          `
          *,
          user:profiles(*)
        `,
        )
        .single();

      if (error) throw error;
      return data as Reply;
    },

    async repost(messageId: string) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("reposts")
        .insert({
          message_id: messageId,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Repost;
    },

    async unrepost(messageId: string) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("reposts")
        .delete()
        .match({ message_id: messageId, user_id: user.id });

      if (error) throw error;
    },

    subscribeToMessages(callback: (message: Message) => void) {
      return supabase
        .channel("messages")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages" },
          (payload) => {
            const newMessage = payload.new as Message;
            callback(newMessage);
          },
        )
        .subscribe();
    },
  },
};
