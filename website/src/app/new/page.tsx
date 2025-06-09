"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "../../config/axios";

interface Author {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

interface News {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  author: Author;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`/news?page=${page}&size=${itemsPerPage}`);
      
      // Kiểm tra và xử lý dữ liệu
      const newNews = response.data || [];
      setNews(prev => page === 1 ? newNews : [...prev, ...newNews]);
      
      // Kiểm tra xem còn tin tức để tải không
      setHasMore(newNews.length === itemsPerPage);
      
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news. Please try again later.');
      setNews([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (isLoading && page === 1) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative h-[40vh] bg-red-600">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Latest News</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Stay updated with the latest news, updates, and insights from the world of Formula 1
          </p>
        </div>
      </header>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {error && (
          <div className="text-red-500 text-center mb-8">
            {error}
          </div>
        )}

        {news.length === 0 && !isLoading && !error && (
          <div className="text-center text-gray-400 text-xl">
            No news available at the moment.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
              <div className="relative h-48">
                <img
                  src={item.imageUrl || '/img/default-news.jpg'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-red-500 text-sm font-semibold">News</span>
                <h2 className="text-xl font-bold mt-2 mb-2">{item.title}</h2>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {item.content}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-sm">
                    {new Date(item.publishedAt).toLocaleDateString()} • By {item.author.username}
                  </p>
                  <Link 
                    href={`/news/${item.id}`}
                    className="text-red-500 hover:text-red-400 font-semibold"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && !isLoading && news.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && page > 1 && (
          <div className="text-center mt-8">
            <div className="text-white">Loading more news...</div>
          </div>
        )}
      </main>
    </div>
  );
} 