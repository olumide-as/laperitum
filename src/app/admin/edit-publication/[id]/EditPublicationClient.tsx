"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Props {
  id: string;
}

export default function EditPublicationClient({ id }: Props) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null as File | null,
    existingImage: null as string | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const res = await fetch(`/api/publications/${id}`);
        if (!res.ok) throw new Error("Publication not found");
        const publication = await res.json();

        setFormData({
          title: publication.title || "",
          content: publication.content || "",
          existingImage: publication.image || null,
          image: null,
        });

        if (publication.image) setPreviewImage(publication.image);
      } catch (error) {
        toast.error("Error fetching publication.");
        console.error(error);
      }
    };

    fetchPublication();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("id", id);
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("datePublished", new Date().toISOString());
    if (formData.image) {
      form.append("image", formData.image);
    } else if (formData.existingImage) {
      form.append("existingImage", formData.existingImage);
    }

    try {
      const res = await fetch(`/api/publications/${id}`, {
        method: "PATCH",
        body: form,
      });

      if (res.ok) {
        toast.success("Publication updated!");
        router.push("/admin/dashboard");
      } else {
        toast.error("Failed to update publication.");
      }
    } catch (error) {
      toast.error("An error occurred while updating.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="min-h-screen pt-24 flex justify-center items-center bg-cover bg-top"
        style={{ backgroundImage: "url(/assets/contactbg.png)" }}
      >
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg m-8 z-10">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#2F3545]">
            Edit Publication
          </h1>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label className="block mb-2 font-medium text-[#2F3545]">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none"
            />

            <label className="block mb-2 font-medium text-[#2F3545]">Content</label>
            <div className="mb-6">
              <CKEditor
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                editor={ClassicEditor as any}
                data={formData.content}
                onChange={(_event, editor) => {
                  const data = editor.getData();
                  setFormData((prev) => ({ ...prev, content: data }));
                }}
              />
            </div>

            <label className="block mb-2 font-medium text-[#2F3545]">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none"
            />

            {previewImage && (
              <div className="mb-6 relative w-full h-64 rounded overflow-hidden shadow-md">
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      image: null,
                      existingImage: null,
                    }));
                    setPreviewImage(null);
                  }}
                  className="absolute top-2 right-2 bg-white bg-opacity-75 px-2 py-1 text-red-500 rounded hover:underline"
                >
                  Remove Image
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2F3545] text-white py-3 rounded hover:bg-[#3a424c]"
            >
              {isLoading ? "Updating..." : "Update Publication"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}