"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
export function useTyping(userId: number, recipientId: number) {
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    const subscribeToTyping = async () => {
      const channel = supabase
        .channel("typing")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "typing" },
          (payload) => {
            if (
              payload.new.userId === recipientId &&
              payload.new.recipientId === userId
            ) {
              setIsTyping(payload.new.isTyping);
            }
          }
        )
        .subscribe();

      return channel;
    };

    const channelPromise = subscribeToTyping();

    return () => {
      channelPromise.then((channel) => {
        if (channel) {
          channel.unsubscribe();
        }
      });
    };
  }, [userId, recipientId]);
  return isTyping;
}
