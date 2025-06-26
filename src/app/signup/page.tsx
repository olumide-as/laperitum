"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    inviteCode: "",  // <-- add invite code here
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const username = formData.username.trim();
    const password = formData.password.trim();
    const inviteCode = formData.inviteCode.trim();

    if (!username || !password || !inviteCode) {
      toast.error("Please fill out username, password, and invite code.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, inviteCode }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Signup successful!");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        toast.error(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("There was a problem signing up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="relative bg-cover bg-top min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(/assets/contactbg.png)` }}
      >
        <div className="relative z-10 w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-[#2F3545] mb-6">
            Admin Sign-Up
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="username"
                className="mb-2 text-sm font-medium text-[#2F3545]"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="border border-lightgray p-3 rounded-md focus:outline-none"
                required
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col mb-4 relative">
              <label
                htmlFor="password"
                className="mb-2 text-sm font-medium text-[#2F3545]"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border border-lightgray p-3 rounded-md focus:outline-none"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-10 text-sm text-gray-500 select-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Invite Code */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="inviteCode"
                className="mb-2 text-sm font-medium text-[#2F3545]"
              >
                Invite Code
              </label>
              <input
                type="text"
                id="inviteCode"
                name="inviteCode"
                value={formData.inviteCode}
                onChange={handleChange}
                placeholder="Enter invite code"
                className="border border-lightgray p-3 rounded-md focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2F3545] text-white py-3 rounded-md hover:bg-[#3a424c]"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
}