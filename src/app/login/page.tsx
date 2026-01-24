"use client";

import { useState, useEffect } from "react";
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
  const [lockoutTime, setLockoutTime] = useState(0);
  const router = useRouter();

  // Countdown timer for account lockout
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setTimeout(() => setLockoutTime(lockoutTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [lockoutTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent submission if account is locked
    if (lockoutTime > 0) {
      toast.error(`Account locked. Try again in ${lockoutTime} seconds.`);
      return;
    }

    // Validate inputs
    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error("Please enter username and password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: formData.username.trim(),
        password: formData.password.trim(),
      });

      if (res?.ok) {
        toast.success("Login successful!");
        setTimeout(() => router.push("/admin/dashboard"), 1500);
      } else if (res?.error) {
        // Check if it's a lockout error
        if (res.error.includes("locked")) {
          const match = res.error.match(/(\d+)\s*seconds/);
          if (match) {
            setLockoutTime(parseInt(match[1]));
          }
        }
        toast.error(res.error || "Invalid username or password");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("There was a problem logging in.");
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
          <h1 className="text-3xl font-bold text-center text-[#2F3545] mb-2">
            Admin Login
          </h1>
          <p className="text-center text-gray-600 text-sm mb-6">
            Secure access to your admin dashboard
          </p>

          {/* Lockout Warning */}
          {lockoutTime > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm font-medium">
                ⚠️ Account temporarily locked
              </p>
              <p className="text-red-600 text-xs mt-1">
                Too many failed attempts. Try again in {lockoutTime} seconds.
              </p>
            </div>
          )}

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
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1A17C] transition"
                disabled={isLoading || lockoutTime > 0}
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}
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
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1A17C] transition"
                disabled={isLoading || lockoutTime > 0}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading || lockoutTime > 0}
                className="absolute right-3 top-10 text-sm text-gray-500 hover:text-gray-700 disabled:text-gray-300 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Security Info */}
            <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-600 text-xs">
                🔒 <strong>Security:</strong> Account locks after 5 failed login attempts for 15 minutes.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-md font-medium transition ${
                isLoading || lockoutTime > 0
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-[#2F3545] text-white hover:bg-[#3a424c]"
              }`}
              disabled={isLoading || lockoutTime > 0}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Logging in...
                </>
              ) : lockoutTime > 0 ? (
                `Locked (${lockoutTime}s)`
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 text-center text-gray-400 text-xs">
            Need admin access? Contact your administrator
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
}