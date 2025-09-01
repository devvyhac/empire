function NotFoundPage() {
  return (
    <div className="flex-grow flex items-center justify-center text-center p-8">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg max-w-lg w-full transform hover:scale-105 transition-transform duration-300">
        {/* Playful illustration with a subtle bounce animation */}
        <span className="text-8xl md:text-9xl text-gray-700 dark:text-gray-300 inline-block animate-bounce-slow">
          🤔
        </span>

        {/* Header section with Poppins and Inter fonts */}
        <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100 mt-6 leading-tight">
          Oops! Page Not Found
        </h1>
        <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-4">
          Looks like you’re lost!
        </p>

        {/* Call-to-action button */}
        <a
          href="/"
          className="font-inter text-base text-white mt-8 inline-flex items-center px-8 py-4 border border-transparent font-medium rounded-full shadow-sm bg-indigo-500 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
