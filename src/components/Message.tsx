"use client";
import { useSeenMessages } from "@/hooks/useSeenMessages";
import { useTyping } from "@/hooks/useTyping";
import { addMessage, updateTypingStatus } from "@/lib/action";
import React, { useState } from "react";

export default function Message({
  user,
  recipient,
}: {
  user: User;
  recipient: User;
}) {
  const [message, setMessage] = useState<string>("");
  const isTyping = useTyping(user.id, recipient.id);
  const messages = useSeenMessages();
  console.log(messages);
  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      text: message,
      recipientId: recipient.id,
      userId: user.id,
    };
    await addMessage(data);
    alert("sent!!!");
  }

  const handleTyping = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    await updateTypingStatus({
      userId: user.id,
      recipientId: recipient.id,
      isTyping: true,
    });
    setTimeout(
      () => {
        updateTypingStatus({
          userId: user.id,
          recipientId: recipient.id,
          isTyping: false,
        });
      },

      2000
    );
  };

  return (
    <div>
      <form
        onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTyping(e)}
        />
        <button>submit</button>
        {isTyping && <p>Typing...</p>}
      </form>
    </div>
  );
}
