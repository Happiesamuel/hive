import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <div className="flex flex-col">
      <Link href={"/chat/2"}>Hs</Link>
      <Link href={"/chat/3"}>Jane</Link>
      <Link href={"/chat/4"}>Jay</Link>
    </div>
  );
};

export default page;
