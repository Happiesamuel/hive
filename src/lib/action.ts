"use server";
import { supabase } from "./supabase";
export async function auth(
  type: string,
  email: string,
  password: string,
  username?: string
) {
  const options = {
    email: email,
    password: password,
  };

  let query;
  if (type === "signUp") {
    query = supabase.auth.signUp({
      options: {
        data: {
          "Display name": username,
        },
      },
      ...options,
    });
  }
  if (type === "signIn") query = supabase.auth.signInWithPassword(options);
  const { error } = await query!;
  if (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
  if (type === "signUp" && !error) {
    const userData = {
      displayName: "",
      fullName: username,
      email: email,
      bio: "",
    };
    const { data, error } = await supabase
      .from("guests")
      .insert([userData])
      .select();
    if (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
    return data;
  }
}
