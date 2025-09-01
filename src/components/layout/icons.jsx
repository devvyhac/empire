// A simple flex container to hold the icons and provide a clean background.
const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-6 bg-gray-800 rounded-2xl shadow-xl">
        <BlogIconFeatherPen />
        <BlogIconOpenBook />
        <BlogIconSpeechBubble />
        <BlogIconMegaphone />
        <BlogIconAbstractLogo />
      </div>
    </div>
  );
};

// Define the common icon styling for hover effects.
const iconClass =
  "w-24 h-24 p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-110";

// Icon 1: A classic feather pen for writing.
const BlogIconFeatherPen = () => (
  <div className={`${iconClass} bg-indigo-500 hover:bg-indigo-600`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  </div>
);

// Icon 2: An open book, representing stories and knowledge.
const BlogIconOpenBook = () => (
  <div className={`${iconClass} bg-green-500 hover:bg-green-600`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6.253v13m0-13C10.832 5.462 9.492 5 8 5c-3.314 0-6 2.898-6 6s2.686 6 6 6c1.492 0 2.832-.462 4-1.253M12 6.253c1.168-.79 2.508-1.253 4-1.253 3.314 0 6 2.898 6 6s-2.686 6-6 6c-1.492 0-2.832-.462-4-1.253"
      />
    </svg>
  </div>
);

// Icon 3: A speech bubble, representing conversation and communication.
const BlogIconSpeechBubble = () => (
  <div className={`${iconClass} bg-yellow-500 hover:bg-yellow-600`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
      />
    </svg>
  </div>
);

// Icon 4: A megaphone, for broadcasting and sharing news.
const BlogIconMegaphone = () => (
  <div className={`${iconClass} bg-red-500 hover:bg-red-600`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11 5.882V19.64m-9-1.925L10 20v-5.276a2 2 0 011-1.732l7.734-4.502L18 2h-7.618M11 5.882L2 2.657"
      />
    </svg>
  </div>
);

// Icon 5: An abstract symbol combining paper and a cursor.
const BlogIconAbstractLogo = () => (
  <div className={`${iconClass} bg-blue-500 hover:bg-blue-600`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  </div>
);
