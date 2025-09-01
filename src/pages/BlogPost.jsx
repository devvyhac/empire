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
// In a real app, this would handle routing between a list page and a single post page.
export default function BlogPostPage() {
  // This is a mock blog post data. In a real application, you would fetch this
  // from an API like `Strapi /api/blog-posts/:id`.
  const blogPost = {
    id: 1,
    title: "The Future of Web Development: A Glimpse into 2025",
    author: "Jane Doe",
    date: "August 10, 2025",
    category: "Technology",
    image:
      "https://placehold.co/1200x600/2563eb/ffffff?text=The+Future+of+Web+Dev",
    content: `
      <p>The year is 2025, and the web development landscape has evolved dramatically. We're seeing a shift towards more intelligent, personalized, and efficient user experiences. Frameworks have become even more performant, and new tools are emerging to simplify complex tasks.</p>
      
      <h2>Serverless & Edge Computing</h2>
      <p>Serverless architecture, powered by platforms like Google Cloud Functions, has become the new norm. It allows developers to focus on writing code without worrying about server management. Edge computing is also gaining traction, bringing computation and data storage closer to the users to reduce latency.</p>
      
      <blockquote>
        "The web is moving from a collection of static pages to a dynamic, interactive, and intelligent platform. The focus is no longer just on 'what' you build, but 'how' you build it and 'who' you build it for."
      </blockquote>
      
      <h3>The Rise of AI in Development</h3>
      <p>AI-powered tools are now an integral part of the development workflow, from code generation and debugging to automated testing and deployment. This has dramatically increased productivity and allowed developers to tackle more ambitious projects.</p>
      
      <ul>
        <li>AI-powered code completion.</li>
        <li>Automated UI/UX testing.</li>
        <li>Personalized content delivery.</li>
      </ul>
      
      <p>The key takeaway is that the future of web development is collaborative, with humans and machines working together to create more powerful and accessible digital experiences. It's an exciting time to be a developer!</p>
    `,
  };

  // Mock data for related posts, which would typically be fetched from
  // an API like `Strapi /api/blog-posts?filters[category]=:category`.
  const relatedPosts = [
    {
      id: 2,
      title: "Mastering React Hooks: Beyond the Basics",
      author: "John Smith",
      date: "August 8, 2025",
      snippet:
        "React hooks revolutionized component development. Learn to use custom hooks and context to manage complex state...",
      image: "https://placehold.co/400x200/f59e0b/ffffff?text=React+Hooks",
    },
    {
      id: 3,
      title: "A Beginner's Guide to Tailwind CSS",
      author: "Emily White",
      date: "August 5, 2025",
      snippet:
        "Dive into the world of utility-first CSS and discover how Tailwind CSS can supercharge your design workflow...",
      image: "https://placehold.co/400x200/059669/ffffff?text=Tailwind+CSS",
    },
    {
      id: 4,
      title: "Building a Serverless API with Google Cloud Functions",
      author: "Mike Johnson",
      date: "July 30, 2025",
      snippet:
        "Learn how to build and deploy a scalable, cost-effective API without managing any servers...",
      image: "https://placehold.co/400x200/9333ea/ffffff?text=Cloud+Functions",
    },
  ];

  return (
    <div
      className={`bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-300`}
    >
      <main className="container mx-auto px-4 py-8">
        <BlogArticle post={blogPost} relatedPosts={relatedPosts} />
      </main>
    </div>
  );
}

// BlogArticle component for the single post page layout.
function BlogArticle({ post, relatedPosts }) {
  if (!post) return null;

  // A note for custom fonts: In a real project, you would import
  // them in your index.css or a link tag in public/index.html.
  // For example: <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter:wght@400;700&display=swap" rel="stylesheet">
  const titleFont = "font-poppins";
  const contentFont = "font-inter";

  return (
    <article className="lg:flex lg:space-x-8">
      {/* Main Content Column */}
      <div className="lg:w-2/3">
        {/* Hero Image */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover rounded-xl shadow-lg mb-8"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/1200x600/2563eb/ffffff?text=Hero+Image";
          }}
        />

        <div
          className={`bg-gray-100 dark:bg-gray-800 rounded-xl p-8 shadow-md ${contentFont}`}
        >
          {/* Post Header */}
          <h1
            className={`text-4xl lg:text-5xl font-extrabold mb-4 leading-tight ${titleFont}`}
          >
            {post.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            By{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {post.author}
            </span>{" "}
            on {post.date}
          </p>

          {/* Rich Text Content */}
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Placeholder for Comments Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <p className="text-gray-500 dark:text-gray-400">
            A comment section will be added here in the future.
          </p>
        </div>
      </div>

      {/* Sidebar Column */}
      <aside className="lg:w-1/3 mt-8 lg:mt-0 space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
            Related Posts
          </h3>
          <div className="space-y-6">
            {relatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </aside>
    </article>
  );
}

// Re-using the PostCard component for the sidebar
function PostCard({ post }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-32 object-cover"
        onError={(e) => {
          e.target.src =
            "https://placehold.co/400x200/4f46e5/ffffff?text=Blog+Post";
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {post.author}
        </p>
      </div>
    </article>
  );
}
