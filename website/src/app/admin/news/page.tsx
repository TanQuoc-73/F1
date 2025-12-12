"use client"

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface News {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  author: {
    id: number;
    username: string;
  };
}

const NewsAdminPage: React.FC = () => {
  const { token, user } = useAuth();
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    authorId: ""
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/news`);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.title.trim() || !formData.content.trim() || !formData.authorId.trim()) {
        throw new Error("Title, content and author ID are required");
      }

      const url = editingNews
        ? `${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/news/${editingNews.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/news`;
      
      const method = editingNews ? "PUT" : "POST";
      const payload = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        imageUrl: formData.imageUrl.trim(),
        authorId: parseInt(formData.authorId.trim())
      };

      console.log('Sending payload:', payload);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server response:', errorData);
        throw new Error(errorData || "Failed to save news");
      }

      await fetchNews();
      setIsModalOpen(false);
      setEditingNews(null);
      setFormData({ title: "", content: "", imageUrl: "", authorId: "" });
    } catch (error) {
      console.error("Error saving news:", error);
      alert(error instanceof Error ? error.message : "Failed to save news");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://f1-1-gslk.onrender.com"}/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNews(news.filter(n => n.id !== id));
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const handleEdit = (news: News) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      content: news.content,
      imageUrl: news.imageUrl,
      authorId: news.author.id.toString()
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">News Management</h1>
          <button
            onClick={() => {
              setEditingNews(null);
              setFormData({ title: "", content: "", imageUrl: "", authorId: "" });
              setIsModalOpen(true);
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Add News
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Author</th>
                <th className="p-4 text-left">Published At</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map((n) => (
                <tr key={n.id} className="border-t border-gray-700 hover:bg-gray-700 group">
                  <td className="p-4">{n.title}</td>
                  <td className="p-4">{n.author.username}</td>
                  <td className="p-4">
                    {new Date(n.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(n)}
                        className="text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(n.id)}
                        className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* News Form Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-gray-900 rounded-xl p-8 w-[600px] relative shadow-2xl border border-gray-800">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingNews(null);
                  setFormData({ title: "", content: "", imageUrl: "", authorId: "" });
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-2xl font-bold mb-6">
                {editingNews ? "Edit News" : "Add News"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[200px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">
                    Image URL
                  </label>
                  <input
                    id="imageUrl"
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="authorId" className="block text-sm font-medium text-gray-300">
                    Author ID
                  </label>
                  <input
                    id="authorId"
                    type="number"
                    value={formData.authorId}
                    onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingNews(null);
                      setFormData({ title: "", content: "", imageUrl: "", authorId: "" });
                    }}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : editingNews ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full mx-4 border border-gray-800">
              <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this news article? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsAdminPage; 
