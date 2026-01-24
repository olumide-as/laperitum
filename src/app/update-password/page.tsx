"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Password strength validation
  const validatePasswordStrength = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("One number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("One special character (!@#$%^&*)");
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update password errors as user types
    if (name === "newPassword") {
      setPasswordErrors(validatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const oldPassword = formData.oldPassword.trim();
    const newPassword = formData.newPassword.trim();
    const confirmPassword = formData.confirmPassword.trim();

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (passwordErrors.length > 0) {
      toast.error("Password does not meet requirements");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("New password must be different from current password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (response.ok) {
        toast.success("Password updated successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => router.push("/admin/dashboard"), 2000);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update password");
      }
    } catch (error) {
      toast.error("An error occurred while updating password");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Not authenticated - this will be redirected by useEffect
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#2F3545] mb-6">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-semibold text-[#2F3545] mb-2"
            >
              Current Password
            </label>
            <input
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#C1A17C]"
              disabled={isLoading}
            />
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-[#2F3545] mb-2"
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#C1A17C]"
              disabled={isLoading}
            />
            {/* Password Requirements Checklist */}
            <div className="mt-3 space-y-1">
              {[
                { text: "At least 8 characters", check: formData.newPassword.length >= 8 },
                { text: "One uppercase letter", check: /[A-Z]/.test(formData.newPassword) },
                { text: "One lowercase letter", check: /[a-z]/.test(formData.newPassword) },
                { text: "One number", check: /[0-9]/.test(formData.newPassword) },
                { text: "One special character (!@#$%^&*)", check: /[!@#$%^&*]/.test(formData.newPassword) },
              ].map((req, idx) => (
                <div key={idx} className="flex items-center text-xs">
                  <span
                    className={`mr-2 ${req.check ? "text-green-500" : "text-red-500"}`}
                  >
                    {req.check ? "✓" : "✗"}
                  </span>
                  <span className={req.check ? "text-green-600" : "text-gray-600"}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-[#2F3545] mb-2"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#C1A17C]"
              disabled={isLoading}
            />
            {formData.confirmPassword &&
              formData.newPassword !== formData.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
              )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || passwordErrors.length > 0}
            className={`w-full py-3 rounded-md font-semibold transition-all ${
              isLoading || passwordErrors.length > 0
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#C1A17C] text-[#2F3545] hover:bg-[#B8945F]"
            }`}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          <a href="/admin/dashboard" className="text-[#C1A17C] hover:underline">
            Back to Dashboard
          </a>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
}