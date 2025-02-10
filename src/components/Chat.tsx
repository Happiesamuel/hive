"use client";

import { useGetMessages } from "@/hooks/useGetMessages";

const Chat = ({ userId, recipient }: { userId: number; recipient: User }) => {
  const { id: recipientId, fullName } = recipient;
  const { messages, load } = useGetMessages(userId, recipientId);
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
