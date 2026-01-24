"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Password strength validation
function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("One number");
  if (!/[!@#$%^&*]/.test(password)) errors.push("One special character (!@#$%^&*)");
  return { valid: errors.length === 0, errors };
}

// Username validation
function validateUsername(username: string): { valid: boolean; error?: string } {
  if (username.length < 3) return { valid: false, error: "At least 3 characters" };
  if (username.length > 20) return { valid: false, error: "Max 20 characters" };
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) return { valid: false, error: "Only letters, numbers, underscores, hyphens" };
  return { valid: true };
}

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    inviteCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [usernameError, setUsernameError] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    if (name === "password") {
      const { errors } = validatePassword(value);
      setPasswordErrors(errors);
    } else if (name === "username") {
      const { error } = validateUsername(value);
      setUsernameError(error || "");
    }
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
                placeholder="Enter your username (3-20 chars)"
                className={`border p-3 rounded-md focus:outline-none ${
                  usernameError ? "border-red-500" : "border-lightgray"
                }`}
                required
                autoComplete="username"
              />
              {usernameError && formData.username && (
                <p className="text-red-500 text-xs mt-1">{usernameError}</p>
              )}
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
                className={`border p-3 rounded-md focus:outline-none ${
                  passwordErrors.length > 0 && formData.password
                    ? "border-red-500"
                    : "border-lightgray"
                }`}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-10 text-sm text-gray-500 select-none hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-xs font-semibold text-[#2F3545] mb-2">Password must include:</p>
                  <ul className="space-y-1">
                    <li className={`text-xs flex items-center ${formData.password.length >= 8 ? "text-green-600" : "text-red-600"}`}>
                      <span className="mr-2">{formData.password.length >= 8 ? "✓" : "✗"}</span>
                      At least 8 characters
                    </li>
                    <li className={`text-xs flex items-center ${/[A-Z]/.test(formData.password) ? "text-green-600" : "text-red-600"}`}>
                      <span className="mr-2">{/[A-Z]/.test(formData.password) ? "✓" : "✗"}</span>
                      One uppercase letter (A-Z)
                    </li>
                    <li className={`text-xs flex items-center ${/[a-z]/.test(formData.password) ? "text-green-600" : "text-red-600"}`}>
                      <span className="mr-2">{/[a-z]/.test(formData.password) ? "✓" : "✗"}</span>
                      One lowercase letter (a-z)
                    </li>
                    <li className={`text-xs flex items-center ${/[0-9]/.test(formData.password) ? "text-green-600" : "text-red-600"}`}>
                      <span className="mr-2">{/[0-9]/.test(formData.password) ? "✓" : "✗"}</span>
                      One number (0-9)
                    </li>
                    <li className={`text-xs flex items-center ${/[!@#$%^&*]/.test(formData.password) ? "text-green-600" : "text-red-600"}`}>
                      <span className="mr-2">{/[!@#$%^&*]/.test(formData.password) ? "✓" : "✗"}</span>
                      One special character (!@#$%^&*)
                    </li>
                  </ul>
                </div>
              )}
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
              className={`w-full py-3 rounded-md font-medium transition ${
                isLoading ||
                passwordErrors.length > 0 ||
                usernameError ||
                !formData.password ||
                !formData.username ||
                !formData.inviteCode
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-[#2F3545] text-white hover:bg-[#3a424c]"
              }`}
              disabled={Boolean(
                isLoading ||
                passwordErrors.length > 0 ||
                usernameError ||
                !formData.password ||
                !formData.username ||
                !formData.inviteCode
              )}
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