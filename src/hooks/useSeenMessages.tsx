"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
export function useSeenMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const subscribeToSeen = async () => {
      const channel = supabase
        .channel("seen_messages")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "messages" },
          (payload) => {
            if (payload.new.seen) {
              console.log("Message seen:", payload.new);
              setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                  msg.id === payload.new.id ? { ...msg, seen: true } : msg
                )
              );
            }
          }
        )
        .subscribe();
      return channel;
    };

    const channelPromise = subscribeToSeen();

    return () => {
      channelPromise.then((channel) => {
        if (channel) {
          channel.unsubscribe();
        }
      });
    };
  }, []);
  return messages;
}
