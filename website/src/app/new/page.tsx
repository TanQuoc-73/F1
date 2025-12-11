"use client";

import Link from "next/link";

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

// Mock data for demonstration
const mockNews: News[] = [
  {
    id: 1,
    title: "Max Verstappen Secures Fourth Consecutive Championship",
    content: "In a thrilling season finale, Max Verstappen clinched his fourth consecutive World Championship title, cementing his place among F1's greatest drivers. The Red Bull Racing star delivered a masterclass performance throughout the season.",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop",
    publishedAt: "2024-11-24T10:00:00Z",
    author: {
      id: 1,
      username: "F1 Editorial",
      email: "editorial@f1news.com",
      role: "ADMIN",
      createdAt: "2024-01-01T00:00:00Z"
    }
  },
  {
    id: 2,
    title: "Ferrari Unveils Revolutionary 2025 Car Design",
    content: "Scuderia Ferrari has revealed their ambitious 2025 challenger, featuring groundbreaking aerodynamic innovations. Team Principal Frédéric Vasseur expressed confidence that this design will bring them back to championship contention.",
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop",
    publishedAt: "2024-11-22T14:30:00Z",
    author: {
      id: 2,
      username: "Tech Analyst",
      email: "tech@f1news.com",
      role: "EDITOR",
      createdAt: "2024-01-15T00:00:00Z"
    }
  },
  {
    id: 3,
    title: "Lewis Hamilton's Move to Ferrari Confirmed for 2025",
    content: "In one of the most shocking transfers in F1 history, seven-time world champion Lewis Hamilton will join Scuderia Ferrari for the 2025 season. The British driver will partner with Charles Leclerc in what promises to be an exciting lineup.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    publishedAt: "2024-11-20T09:15:00Z",
    author: {
      id: 1,
      username: "F1 Editorial",
      email: "editorial@f1news.com",
      role: "ADMIN",
      createdAt: "2024-01-01T00:00:00Z"
    }
  },
  {
    id: 4,
    title: "New Las Vegas Grand Prix Circuit Receives Rave Reviews",
    content: "The inaugural Las Vegas Grand Prix has been hailed as a spectacular success, with drivers and fans praising the stunning night race through the iconic Strip. The event has set new standards for F1 entertainment.",
    imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600&fit=crop",
    publishedAt: "2024-11-18T16:45:00Z",
    author: {
      id: 3,
      username: "Race Reporter",
      email: "reporter@f1news.com",
      role: "EDITOR",
      createdAt: "2024-02-01T00:00:00Z"
    }
  },
  {
    id: 5,
    title: "McLaren's Resurgence Continues with Constructors' Battle",
    content: "McLaren Racing has emerged as a serious contender for the Constructors' Championship, with Lando Norris and Oscar Piastri consistently delivering podium finishes. The team's technical upgrades have proven highly effective.",
    imageUrl: "https://images.unsplash.com/photo-1583900985737-6d0495555783?w=800&h=600&fit=crop",
    publishedAt: "2024-11-15T11:20:00Z",
    author: {
      id: 2,
      username: "Tech Analyst",
      email: "tech@f1news.com",
      role: "EDITOR",
      createdAt: "2024-01-15T00:00:00Z"
    }
  },
  {
    id: 6,
    title: "FIA Announces Major Regulation Changes for 2026",
    content: "The FIA has unveiled comprehensive regulation changes for the 2026 season, including new power unit specifications and enhanced sustainability measures. Teams are already preparing for the biggest technical shake-up in years.",
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop",
    publishedAt: "2024-11-12T13:00:00Z",
    author: {
      id: 1,
      username: "F1 Editorial",
      email: "editorial@f1news.com",
      role: "ADMIN",
      createdAt: "2024-01-01T00:00:00Z"
    }
  }
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="relative h-[45vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90 z-10" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent animate-fade-in">
            Latest News
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
            Stay updated with the latest news, updates, and insights from the world of Formula 1
          </p>
        </div>
      </header>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockNews.map((item, index) => (
            <div 
              key={item.id} 
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:-translate-y-2 border border-gray-700/50 hover:border-red-500/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    NEWS
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mt-2 mb-3 group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                  <div className="flex flex-col">
                    <p className="text-gray-500 text-xs">
                      {new Date(item.publishedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      By {item.author.username}
                    </p>
                  </div>
                  <Link 
                    href={`/news/${item.id}`}
                    className="text-red-500 hover:text-red-400 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Message */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg px-8 py-4 shadow-xl">
            <p className="text-gray-400 text-sm">
              Showing {mockNews.length} latest articles
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}