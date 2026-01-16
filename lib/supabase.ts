import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface PromptRecord {
  id: string;
  json_content: Record<string, unknown>;
  vibe: string;
  provider: string;
  thumbnail_url: string | null;
  created_at: string;
}

// Helper functions
export async function savePrompt(
  prompt: Omit<PromptRecord, "id" | "created_at">,
) {
  const { data, error } = await supabase
    .from("prompts")
    .insert(prompt)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getRecentPrompts(limit = 10): Promise<PromptRecord[]> {
  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function deletePrompt(id: string) {
  const { error } = await supabase.from("prompts").delete().eq("id", id);

  if (error) throw error;
}
