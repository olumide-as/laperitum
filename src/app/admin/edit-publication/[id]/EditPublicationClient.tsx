"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TiptapEditor = dynamic(() => import("@/components/PublicationEditor"), {
  ssr: false,
});

interface Props {
  id: string;
}

const MIN_TITLE_LENGTH = 5;
const MAX_TITLE_LENGTH = 200;
const MIN_CONTENT_LENGTH = 20;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const DRAFT_STORAGE_KEY = "publication_draft_edit";

export default function EditPublicationClient({ id }: Props) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null as File | null,
    imageUrl: "",
    existingImage: null as string | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreview, setIsPreview] = useState(false);
  const [imageMode, setImageMode] = useState<'keep' | 'upload' | 'url'>('keep');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const res = await fetch(`/api/publications/${id}`);
        if (!res.ok) throw new Error("Publication not found");
        const publication = await res.json();

        setFormData({
          title: publication.title || "",
          content: publication.content || "",
          image: null,
          imageUrl: "",
          existingImage: publication.image || null,
        });

        if (publication.image) setPreviewImage(publication.image);
      } catch (error) {
        toast.error("Error fetching publication.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublication();
  }, [id]);

  // Auto-save to localStorage
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (formData.title || formData.content) {
        const draft = {
          title: formData.title,
          content: formData.content,
          imageUrl: formData.imageUrl,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(DRAFT_STORAGE_KEY + id, JSON.stringify(draft));
        setLastSaved(new Date());
      }
    }, 30000); // 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [formData, id]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.title.trim().length < MIN_TITLE_LENGTH) {
      newErrors.title = `Title must be at least ${MIN_TITLE_LENGTH} characters`;
    }
    if (formData.title.trim().length > MAX_TITLE_LENGTH) {
      newErrors.title = `Title must not exceed ${MAX_TITLE_LENGTH} characters`;
    }
    if (formData.content.trim().length < MIN_CONTENT_LENGTH) {
      newErrors.content = `Content must be at least ${MIN_CONTENT_LENGTH} characters`;
    }
    
    if (imageMode === 'upload' && !formData.image) {
      newErrors.image = "Please select a file to upload";
    } else if (imageMode === 'url' && !formData.imageUrl) {
      newErrors.image = "Please enter a valid image URL";
    } else if (imageMode === 'keep' && !formData.existingImage) {
      newErrors.image = "No existing image to keep";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image must be smaller than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      setFormData((prev) => ({ ...prev, image: file, imageUrl: "" }));
      setPreviewImage(URL.createObjectURL(file));
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, imageUrl: url, image: null }));
    if (url) {
      setPreviewImage(url);
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors above");
      return;
    }

    setIsSaving(true);

    const form = new FormData();
    form.append("title", formData.title.trim());
    form.append("content", formData.content.trim());
    form.append("datePublished", new Date().toISOString());
    
    if (imageMode === 'upload' && formData.image) {
      form.append("image", formData.image);
    } else if (imageMode === 'url' && formData.imageUrl) {
      form.append("imageUrl", formData.imageUrl);
    } else if (imageMode === 'keep' && formData.existingImage) {
      form.append("existingImage", formData.existingImage);
    }

    try {
      const res = await fetch(`/api/publications/${id}`, {
        method: "PATCH",
        body: form,
      });

      if (res.ok) {
        toast.success("Publication updated successfully!");
        localStorage.removeItem(DRAFT_STORAGE_KEY + id);
        setTimeout(() => router.push("/admin/dashboard"), 1500);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to update publication");
      }
    } catch (error) {
      toast.error("An error occurred while updating");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center">
        <p className="text-gray-500">Loading publication...</p>
      </div>
    );
  }

  const charCount = formData.content.replace(/<[^>]*>/g, "").length;
  const timeAgo = lastSaved
    ? Math.round((Date.now() - lastSaved.getTime()) / 1000)
    : null;

  return (
    <>
      <div
        className="min-h-screen pt-24 pb-12 flex justify-center items-center bg-cover bg-top"
        style={{ backgroundImage: "url(/assets/contactbg.png)" }}
      >
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg m-8 z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#2F3545] mb-2">
                Edit Publication
              </h1>
              <p className="text-gray-600 text-sm">Update your publication content</p>
            </div>
            <div className="text-right">
              {lastSaved && (
                <p className="text-xs text-green-600 mb-2">
                  ✓ Draft saved {timeAgo}s ago
                </p>
              )}
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className={`px-4 py-2 rounded text-sm font-medium transition ${
                  isPreview
                    ? "bg-[#2F3545] text-white"
                    : "bg-gray-200 text-[#2F3545] hover:bg-gray-300"
                }`}
              >
                {isPreview ? "Edit" : "Preview"}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Title Field */}
            {!isPreview && (
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-[#2F3545] mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={MAX_TITLE_LENGTH}
                  required
                  className={`w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1A17C] transition ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                  <p className="text-gray-500 text-xs ml-auto">
                    {formData.title.length}/{MAX_TITLE_LENGTH}
                  </p>
                </div>
              </div>
            )}

            {isPreview && (
              <div className="mb-6 p-4 bg-gray-50 rounded-md border-2 border-[#C1A17C]">
                <h2 className="text-2xl font-bold text-[#2F3545]">{formData.title}</h2>
                <p className="text-gray-500 text-sm mt-2">
                  By Admin • {new Date().toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Content Field */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-[#2F3545] mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <div
                className={`border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#C1A17C] transition ${
                  errors.content ? "border-red-500" : "border-gray-300"
                }`}
              >
                <TiptapEditor 
                  content={formData.content} 
                  onChange={handleContentChange}
                  isPreview={isPreview}
                />
              </div>
              <div className="flex justify-between mt-1">
                {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
                <p className="text-gray-500 text-xs ml-auto">
                  {charCount} characters
                </p>
              </div>
            </div>

            {/* Image Field */}
            {!isPreview && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2F3545] mb-2">
                  Featured Image <span className="text-red-500">*</span>
                </label>

                {/* Toggle between file upload, URL, and keeping existing */}
                <div className="mb-3 flex flex-wrap gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="imageType"
                      checked={imageMode === 'keep'}
                      onChange={() => {
                        setImageMode('keep');
                        setFormData((prev) => ({ ...prev, image: null, imageUrl: "" }));
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-[#2F3545]">Keep Current</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="imageType"
                      checked={imageMode === 'upload'}
                      onChange={() => {
                        setImageMode('upload');
                        setFormData((prev) => ({ ...prev, image: null, imageUrl: "" }));
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-[#2F3545]">Upload New File</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="imageType"
                      checked={imageMode === 'url'}
                      onChange={() => {
                        setImageMode('url');
                        setFormData((prev) => ({ ...prev, image: null }));
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-[#2F3545]">Image URL</span>
                  </label>
                </div>

                {/* File Upload */}
                {imageMode === 'upload' && (
                  <div>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={`w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1A17C] transition ${
                        errors.image ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <p className="text-gray-500 text-xs mt-1">Maximum file size: 5MB</p>
                  </div>
                )}

                {/* Image URL */}
                {imageMode === 'url' && (
                  <div>
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleImageUrlChange}
                      placeholder="https://example.com/image.jpg"
                      className={`w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1A17C] transition ${
                        errors.image ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <p className="text-gray-500 text-xs mt-1">Enter a valid image URL</p>
                  </div>
                )}

                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}

                {previewImage && (
                  <div className="mt-4 relative w-full h-64 rounded-md overflow-hidden shadow-md border-2 border-[#C1A17C]">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 800px"
                      priority
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          image: null,
                          imageUrl: "",
                          existingImage: null,
                        }));
                        setPreviewImage(null);
                      }}
                      className="absolute top-2 right-2 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded transition"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            {isPreview && previewImage && (
              <div className="mb-6 relative w-full h-64 rounded-md overflow-hidden shadow-md border-2 border-[#C1A17C]">
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            )}

            {/* Submit Button */}
            {!isPreview && (
              <button
                type="submit"
                disabled={isSaving}
                className={`w-full py-3 rounded-md font-medium transition ${
                  isSaving
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-[#2F3545] text-white hover:bg-[#3a424c]"
                }`}
              >
                {isSaving ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Updating Publication...
                  </>
                ) : (
                  "Update Publication"
                )}
              </button>
            )}

            {isPreview && (
              <button
                type="button"
                onClick={() => setIsPreview(false)}
                className="w-full py-3 rounded-md font-medium bg-gray-400 text-white hover:bg-gray-500 transition"
              >
                Back to Edit
              </button>
            )}
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}