"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import dynamic from "next/dynamic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-toastify/dist/ReactToastify.css";

// Dynamically import CKEditor to fix SSR and type errors
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);

export default function CreatePublicationClient() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const skipAuthCheck = true; // set to false when you want auth again

    if (!skipAuthCheck) {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) router.push("/admin/login");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const body = new FormData();
      body.append("title", formData.title);
      body.append("content", formData.content);
      body.append("datePublished", new Date().toISOString());
      if (formData.image) body.append("image", formData.image);

      const res = await fetch("/api/publications", {
        method: "POST",
        body,
      });

      if (res.ok) {
        toast.success("Publication created!");
        setFormData({ title: "", content: "", image: null });
        setPreviewImage(null);
        router.push("/admin/dashboard");
      } else {
        toast.error("Failed to create publication.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative bg-cover bg-top min-h-screen pt-24 flex items-center justify-center"
      style={{ backgroundImage: "url(/assets/contactbg.png)" }}
    >
      <div className="relative z-10 w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 m-8">
        <h1 className="text-3xl font-bold text-center text-[#2F3545] mb-4">
          Create Publication
        </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="text-sm font-medium text-[#2F3545]">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2F3545]">Content</label>
            <CKEditor
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              editor={ClassicEditor as any}
              data={formData.content}
              onChange={(_event, editor) => {
                const data = editor.getData();
                handleContentChange(data);
              }}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-[#2F3545]">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 p-3 rounded-md"
            />
            {previewImage && (
              <div className="mt-4 relative w-full h-64 rounded-md overflow-hidden shadow-md">
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, image: null }));
                    setPreviewImage(null);
                  }}
                  className="absolute top-2 right-2 text-sm text-red-500 hover:underline bg-white bg-opacity-75 rounded px-2"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#2F3545] text-white py-3 rounded-md hover:bg-[#3a424c]"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Publication"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}