"use client";

import { useState, useEffect, useMemo } from "react";
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
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "title">("recent");
  const [filterMonth, setFilterMonth] = useState("");

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

  // Filter and sort logic
  const filteredAndSortedPublications = useMemo(() => {
    let result = [...publications];

    // Search by title
    if (searchQuery) {
      result = result.filter((pub) =>
        pub.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by month
    if (filterMonth) {
      result = result.filter((pub) => {
        const pubDate = new Date(pub.datePublished);
        const [year, month] = filterMonth.split("-");
        return (
          pubDate.getFullYear() === parseInt(year) &&
          pubDate.getMonth() === parseInt(month) - 1
        );
      });
    }

    // Sort
    switch (sortBy) {
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.datePublished).getTime() -
            new Date(a.datePublished).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.datePublished).getTime() -
            new Date(b.datePublished).getTime()
        );
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [publications, searchQuery, filterMonth, sortBy]);

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
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

      {/* Create Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreate}
          className="bg-[#C1A17C] text-[#2F3545] px-6 py-2 rounded-md border-2 border-gray-400 font-semibold hover:bg-[#B8945F] transition-colors"
        >
          + Create New Publication
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-semibold text-[#2F3545] mb-2">
              Search by Title
            </label>
            <input
              type="text"
              placeholder="Search publications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#C1A17C]"
            />
          </div>

          {/* Sort Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-[#2F3545] mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "recent" | "oldest" | "title")}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#C1A17C]"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#2F3545] mb-2">
              Filter by Month
            </label>
            <input
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#C1A17C]"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        {(searchQuery || filterMonth || sortBy !== "recent") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setFilterMonth("");
              setSortBy("recent");
            }}
            className="mt-4 text-sm text-[#C1A17C] hover:text-[#B8945F] underline font-semibold"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Results Count */}
      {!isLoading && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredAndSortedPublications.length} of {publications.length} publication
          {publications.length !== 1 ? "s" : ""}
        </div>
      )}

      {isLoading ? (
        <p className="text-center py-8">Loading...</p>
      ) : filteredAndSortedPublications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600 text-lg">
            {publications.length === 0
              ? "No publications yet. Create your first one!"
              : "No publications match your filters."}
          </p>
          {publications.length > 0 && (
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterMonth("");
                setSortBy("recent");
              }}
              className="mt-4 text-[#C1A17C] hover:text-[#B8945F] underline"
            >
              Reset filters
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 text-left w-1/2">Title</th>
                <th className="py-3 px-4 text-left w-1/4">Date Published</th>
                <th className="py-3 px-4 text-left w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedPublications.map((publication) => (
                <tr key={publication.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-[#2F3545]">
                    {publication.title}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {formatDate(publication.datePublished)}
                  </td>
                  <td className="py-3 px-4 flex justify-end space-x-3">
                    <button
                      className="bg-[#C1A17C] text-[#2F3545] px-3 py-1 rounded-md border-2 border-gray-400 text-sm hover:bg-[#B8945F] transition-colors"
                      onClick={() => handleEdit(publication.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-[#2F3545] text-white px-3 py-1 rounded-md border-2 border-gray-700 text-sm hover:bg-[#1a1e24] transition-colors"
                      onClick={() => handleDelete(publication.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
}