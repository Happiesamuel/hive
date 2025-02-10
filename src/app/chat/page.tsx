import {
  countUnseen,
  getCurrentUser,
  getUserByEmailOrId,
  sam,
} from "@/lib/action";
import Link from "next/link";
import React from "react";

const page = async () => {
  const data = await getCurrentUser();
  const user = await getUserByEmailOrId("email", data?.email || "");
  const count = await countUnseen(user.id);
  const sams = await sam(user.id);
  console.log(count, "sksd", sams);
  return (
    <div className="flex flex-col">
      <Link href={"/chat/2"}>Hs</Link>
      <Link href={"/chat/3"}>Jane</Link>
      <Link href={"/chat/4"}>Jay</Link>
    </div>
  );
};

export default page;
