"use client";
import { auth } from "@/lib/action";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    await auth("signUp", email, password, username);
  }
  return (
    <div>
      <h1>Sign up page</h1>
      <form
        onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <div>
          <label>Username: </label>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Page;
