import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Configured through Vite env vars, so the keys live in Vercel's project settings
// rather than in the repository. Both are safe to ship in the bundle: the anon key
// is meant to be public, and the database denies it everything except the two
// comment functions, which want the shared password before they do anything.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** null when the env vars aren't set — the UI says so instead of crashing */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null;

export const supabaseConfigured = supabase !== null;

export type Comment = {
  id: string;
  author: string;
  body: string;
  topic: string | null;
  created_at: string;
};

/** wrong password comes back as a thrown error, which the caller turns into copy */
export async function listComments(password: string, topic?: string) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.rpc("list_comments", {
    p_password: password,
    p_topic: topic ?? null,
  });
  if (error) throw error;
  return (data ?? []) as Comment[];
}

export async function addComment(password: string, author: string, body: string, topic?: string) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.rpc("add_comment", {
    p_password: password,
    p_author: author,
    p_body: body,
    p_topic: topic ?? null,
  });
  if (error) throw error;
  return data as Comment;
}
