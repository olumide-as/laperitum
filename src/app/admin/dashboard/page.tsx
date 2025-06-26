"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Publication {
  id: number;
  title: string;
  datePublished: string;
}

export default function Dashboard() {

  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch("/api/publications");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setPublications(data);
        } else {
          toast.error("No publications found");
        }
      } catch (error) {
        toast.error("Error fetching publications");
        console.error("Error fetching publications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublications();
  }, []);

const handleEdit = (id: number) => {
  router.push(`/admin/edit-publication/${id}`);
};

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this publication?")) {
      try {
        const response = await fetch(`/api/publications/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPublications((prev) => prev.filter((pub) => pub.id !== id));
          toast.success("Publication deleted successfully");
        } else {
          toast.error("Error deleting publication");
        }
      } catch (error) {
        toast.error("Error deleting publication");
        console.error("Error deleting publication:", error);
      }
    }
  };

  const handleCreate = () => {
    router.push("/admin/create-publication");
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="relative bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="bg-[#C1A17C] text-[#2F3545] px-4 py-2 rounded-md border-2 border-gray-400"
        >
          Create New Publication
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 text-left w-1/3">Title</th>
                <th className="py-3 px-4 text-left w-1/4">Date Published</th>
                <th className="py-3 px-4 text-left w-1/6"></th>
              </tr>
            </thead>
            <tbody>
              {publications.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-3 px-4 text-center">
                    No publications available
                  </td>
                </tr>
              ) : (
                publications.map((publication) => (
                  <tr key={publication.id} className="border-b">
                    <td className="py-3 px-4">{publication.title}</td>
                    <td className="py-3 px-4">
                      {formatDate(publication.datePublished)}
                    </td>
                    <td className="py-3 px-4 flex justify-end space-x-4">
                      <button
                        className="bg-[#C1A17C] text-[#2F3545] px-4 py-2 rounded-md border-2 border-gray-400"
                        onClick={() => handleEdit(publication.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-[#2F3545] text-white px-4 py-2 rounded-md border-2 border-gray-700"
                        onClick={() => handleDelete(publication.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
}