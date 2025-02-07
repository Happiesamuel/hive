"use client";

import React, { useState } from "react";
import { auth } from "@/lib/action";
const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    await auth("signIn", email, password);
  }
  return (
    <div>
      <h1>Sign up page</h1>
      <form
        onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <div>
          <label>Email: </label>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <label>Password: </label>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Page;
