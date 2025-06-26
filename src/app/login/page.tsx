"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: formData.username,
        password: formData.password,
      });
      if (res?.ok) {
        toast.success("Login successful!");
        router.push("/admin/dashboard");
      } else if (res?.error) {
        toast.error(res.error || "Login failed. Check credentials.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
  console.error(error); // Log the error for debugging
  toast.error("There was a problem logging in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="relative bg-cover bg-top min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(/assets/contactbg.png)` }} // adjust path if needed
      >
        <div className="relative z-10 w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-[#2F3545] mb-6">
            Admin Login
          </h1>
          <form onSubmit={handleSubmit}>
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
              />
            </div>

            <div className="flex flex-col mb-6 relative">
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
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2F3545] text-white py-3 rounded-md hover:bg-[#3a424c]"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
}