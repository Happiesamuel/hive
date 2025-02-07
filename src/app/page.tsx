import Link from "next/link";
import React from "react";
// sa
const page = async () => {
  return (
    <div>
      <Link href={"/chat"}>Start chatting</Link>
    </div>
  );
};

export default page;
