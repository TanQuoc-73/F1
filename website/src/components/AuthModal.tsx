"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { setUsername } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsernameState] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = isLogin ? "/users/login" : "/users/register";
    const body = isLogin
      ? { username, password }
      : { username, passwordHash: password, email };

    try {
      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.text();

      if (res.ok) {
        setMessage(isLogin ? "Login successful!" : "Registration successful!");
        if (isLogin) {
          setUsername(username); // sẽ tự lưu vào localStorage
          onClose();
        }
      } else {
        setMessage(data);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ">
      <div className="bg-black rounded-lg p-6 w-[400px] relative shadow-xl">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black">×</button>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isLogin ? "Sign In" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded"
            value={username}
            onChange={(e) => setUsernameState(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-red-600 text-white py-2 rounded hover:bg-red-700">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        {message && <p className="text-center mt-2 text-sm text-red-600">{message}</p>}
        <div className="text-sm text-center mt-4">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => setIsLogin(false)} className="text-blue-600 underline">
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)} className="text-blue-600 underline">
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
