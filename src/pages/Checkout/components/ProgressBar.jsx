import React from "react";

const ProgressBar = ({ progressSteps }) => {
  return (
    <div className="flex justify-between items-center mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      {progressSteps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
              index === 1
                ? "bg-primary-light dark:bg-primary-dark"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`ml-2 text-sm hidden md:block ${
              index === 1
                ? "text-primary-light dark:text-primary-dark"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {step}
          </span>
          {index < progressSteps.length - 1 && (
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700 mx-2 hidden md:block"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
