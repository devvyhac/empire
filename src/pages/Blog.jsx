import { useState } from "react";
import {
  Rss,
  Search,
  Sun,
  Moon,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  ArrowRight,
} from "lucide-react";

// Main App component that orchestrates the entire page.
// It holds the blog post data and renders all sub-components.
export default function Blogs() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Example data for blog posts. In a real application, this would be fetched from an API.
  const posts = [
    {
      id: 1,
      title: "The Future of Web Development: A Glimpse into 2025",
      author: "Jane Doe",
      date: "August 10, 2025",
      snippet:
        "Explore the exciting new trends and technologies that are shaping the web development landscape for the coming years...",
      image: "https://placehold.co/600x400/2563eb/ffffff?text=Web+Dev",
    },
    {
      id: 2,
      title: "Mastering React Hooks: Beyond the Basics",
      author: "John Smith",
      date: "August 8, 2025",
      snippet:
        "React hooks revolutionized component development. Learn to use custom hooks and context to manage complex state...",
      image: "https://placehold.co/600x400/f59e0b/ffffff?text=React+Hooks",
    },
    {
      id: 3,
      title: "A Beginner's Guide to Tailwind CSS",
      author: "Emily White",
      date: "August 5, 2025",
      snippet:
        "Dive into the world of utility-first CSS and discover how Tailwind CSS can supercharge your design workflow...",
      image: "https://placehold.co/600x400/059669/ffffff?text=Tailwind+CSS",
    },
    {
      id: 4,
      title: "Building a Serverless API with Google Cloud Functions",
      author: "Mike Johnson",
      date: "July 30, 2025",
      snippet:
        "Learn how to build and deploy a scalable, cost-effective API without managing any servers...",
      image: "https://placehold.co/600x400/9333ea/ffffff?text=Cloud+Functions",
    },
    {
      id: 5,
      title: "The Importance of Accessibility in Web Design",
      author: "Sarah Lee",
      date: "July 25, 2025",
      snippet:
        "Creating an inclusive web is more than just good practice—it's a necessity. Here's why and how to start...",
      image: "https://placehold.co/600x400/eab308/ffffff?text=Accessibility",
    },
    {
      id: 6,
      title: "10 Tips for Writing Cleaner, More Readable Code",
      author: "Alex Chen",
      date: "July 20, 2025",
      snippet:
        "A clean codebase is a happy codebase. Follow these ten practical tips to improve the quality of your code...",
      image: "https://placehold.co/600x400/db2777/ffffff?text=Clean+Code",
    },
  ];

  // The main layout of the blog page. It uses flexbox for responsive layout on different screen sizes.
  return (
    <div
      className={`${
        isDarkMode ? "dark" : ""
      } bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-300`}
    >
      <main className="container mx-auto px-4 py-8">
        {/* Featured post section at the top of the page */}
        <FeaturedPost post={posts[0]} />

        {/* The main content area with a grid of post cards and a sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          {/* Post grid section */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold mb-6">Recent Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.slice(1).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar section */}
          <Sidebar />
        </div>
      </main>
      <Footer />
    </div>
  );
}

// FeaturedPost component for the main, highlighted blog post.
function FeaturedPost({ post }) {
  if (!post) return null;
  return (
    <section className="relative rounded-xl overflow-hidden shadow-lg group">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          e.target.src =
            "https://placehold.co/1024x400/2563eb/ffffff?text=Featured+Post";
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8 text-white">
        <span className="text-sm font-semibold text-white/80 mb-2">
          {post.date}
        </span>
        <h1 className="text-4xl font-extrabold mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-lg mb-4 max-w-2xl">{post.snippet}</p>
        <div className="flex items-center text-sm font-semibold text-blue-300 group-hover:text-blue-200 transition-colors">
          Read Full Article
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </section>
  );
}

// PostCard component for displaying a summary of a single post in a grid.
function PostCard({ post }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src =
            "https://placehold.co/400x200/4f46e5/ffffff?text=Blog+Post";
        }}
      />
      <div className="p-6">
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">
          {post.date}
        </span>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {post.snippet}
        </p>
        <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
          Read More
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}

// Sidebar component for categories and an about section.
function Sidebar() {
  const categories = [
    "Technology",
    "Design",
    "Programming",
    "Lifestyle",
    "Travel",
    "Productivity",
  ];
  return (
    <aside className="lg:w-1/3 space-y-8">
      {/* About Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
          About Me
        </h3>
        <img
          src="https://placehold.co/100x100/4f46e5/ffffff?text=Avatar"
          alt="Author"
          className="rounded-full w-24 h-24 mx-auto mb-4"
        />
        <p className="text-center text-gray-600 dark:text-gray-300">
          Hi, I'm a passionate writer and developer sharing my thoughts on
          technology, design, and life.
        </p>
      </div>

      {/* Categories Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <a
                href="#"
                className="flex items-center justify-between text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>{cat}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// Footer component with copyright and social links.
function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-400">
          &copy; 2025 BlogPulse. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Dribbble size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
