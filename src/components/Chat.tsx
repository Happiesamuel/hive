"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // Import your Supabase instance
import { getMessage } from "@/lib/action";

const Chat = ({ userId, recipient }: { userId: number; recipient: User }) => {
  const { id: recipientId, fullName } = recipient;
  const [messages, setMessages] = useState<Message[]>([]);
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    const loadMessages = async () => {
      setLoad(true);
      const initialMessages = await getMessage(userId, recipientId);
      setMessages(initialMessages);
      setLoad(false);
    };

    loadMessages();
    const subscribeToMessages = () => {
      return supabase
        .channel("direct_messages")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "messages" },
          (payload) => {
            if (!payload.new) return;

            const newMessage = payload.new as Message;

            if (
              (newMessage.userId === userId &&
                newMessage.recipientId === recipientId) ||
              (newMessage.userId === recipientId &&
                newMessage.recipientId === userId)
            ) {
              setMessages((prevMessages) => {
                const messageExists = prevMessages.some(
                  (msg) => msg.id === newMessage.id
                );
                if (messageExists) return prevMessages;

                return [...prevMessages, newMessage];
              });
            }
          }
        )
        .subscribe();
    };

    const channel = subscribeToMessages();

    return () => {
      channel.unsubscribe(); // Cleanup on unmount
    };
  }, [userId, recipientId]);

  return (
    <div>
      <h2>Chat</h2>
      {load ? (
        <p>Loading...</p>
      ) : (
        <div>
          {messages.map((msg) => (
            <p key={msg.id}>
              <strong>{msg.userId === userId ? "You" : fullName}:</strong>{" "}
              {msg.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
