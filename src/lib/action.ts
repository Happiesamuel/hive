"use server";
import { redirect } from "next/navigation";
// import { supabase } from "./supabaseClient";
import { createClient } from "./supabaseServer";
import { revalidatePath } from "next/cache";

export async function auth(
  type: string,
  email: string,
  password: string,
  username?: string
) {
  const supabase = await createClient();

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
  const { data: session, error } = await query!;
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
    const { error } = await supabase.from("guests").insert([userData]).select();
    if (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
    redirect("/auth/sign-in");
  }
  redirect("/");
  return session;
}
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return user;
}
export async function getUserByEmailOrId(
  type: string | number,
  userArg: string | number
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq(type === "email" ? "email" : "id", userArg);
  if (error) throw new Error(error.message);
  return data.at(0);
}
export async function addMessage(messageData: Message) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .insert([messageData])
    .select();
  if (error) throw new Error(error.message);
  revalidatePath("/");
  return data;
}

export async function getMessage(userId: number, recipientId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(
      `and(userId.eq.${userId},recipientId.eq.${recipientId}),and(userId.eq.${recipientId},recipientId.eq.${userId})`
    )
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  return data;
}

export const updateTypingStatus = async (typingData: TypingData) => {
  const supabase = await createClient();
  await supabase.from("typing").upsert([typingData]);
};
