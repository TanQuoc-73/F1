"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, user, role } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsernameState] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      try {
        const success = await login(username, password);
        if (success) {
          setMessage("Login successful!");
          onClose();
        } else {
          setMessage("Invalid username or password");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }
    } else {
      // Handle registration
      try {
        const res = await fetch("http://localhost:8080/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, email }),
          credentials: "include",
        });
        const text = await res.text();

        if (!res.ok) {
          setMessage(text || "Registration failed.");
          return;
        }

        setMessage("Registration successful!");
        setIsLogin(true);
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-black rounded-lg p-6 w-[400px] relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-white"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          {isLogin ? "Sign In" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded bg-black border-gray-600 text-white"
            value={username}
            onChange={(e) => setUsernameState(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded bg-black border-gray-600 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded bg-black border-gray-600 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors font-semibold"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        {role === "admin" && (
          <button
            onClick={() => window.location.href = "/admin"}
            className="w-full text-left px-4 py-2 text-blue-400 hover:bg-blue-700 hover:text-white transition-colors rounded mt-3"
          >
            Admin
          </button>
        )}
        {message && (
          <p className="text-center mt-2 text-sm text-red-500">{message}</p>
        )}
        <div className="text-sm text-center mt-4 text-white">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-400 underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-400 underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
