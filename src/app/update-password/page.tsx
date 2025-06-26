"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdatePasswordPage() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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

    const oldPassword = formData.oldPassword.trim();
    const newPassword = formData.newPassword.trim();
    const confirmPassword = formData.confirmPassword.trim();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
const response = await fetch("/api/update-password", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ oldPassword, newPassword }),
});

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Password updated successfully!");
        setTimeout(() => router.push("/dashboard"), 3000);
      } else {
        toast.error(result.message || "Error updating password.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("There was a problem updating the password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="relative bg-cover bg-top min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(/assets/contactbg.jpg)` }}
      >
        <div className="relative z-10 w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-[#2F3545] mb-6">
            Update Password
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="oldPassword"
                className="mb-2 text-sm font-medium text-[#2F3545]"
              >
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Enter your old password"
                className="border border-lightgray p-3 rounded-md focus:outline-none"
                required
                autoComplete="current-password"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="newPassword"
                className="mb-2 text-sm font-medium text-[#2F3545]"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                className="border border-lightgray p-3 rounded-md focus:outline-none"
                required
                autoComplete="new-password"
              />
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="confirmPassword"
                className="mb-2 text-sm font-medium text-[#2F3545]"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                className="border border-lightgray p-3 rounded-md focus:outline-none"
                required
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#2F3545] text-white py-3 rounded-md hover:bg-[#3a424c]"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
}