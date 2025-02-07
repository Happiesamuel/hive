import Chat from "@/components/Chat";
import Message from "@/components/Message";
import { getCurrentUser, getUserByEmailOrId } from "@/lib/action";
import React from "react";

const page = async ({ params }: { params: { chatId: string } }) => {
  const { chatId } = await params;
  const data = await getCurrentUser();
  const user = await getUserByEmailOrId("email", data?.email || "");
  const recipient = await getUserByEmailOrId("id", +chatId);
  return (
    <div>
      <Message user={user} recipient={recipient} />
      <Chat userId={user.id} recipient={recipient} />
    </div>
  );
};

export default page;
