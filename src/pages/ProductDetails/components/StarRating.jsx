import React from "react";
import { Star, StarHalf } from "lucide-react";

// StarRating component to display star ratings

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const getStar = (type, key) => {
    const baseClasses = "w-5 h-5 transition-colors";
    const starClasses = {
      full: "text-amber-400 dark:text-amber-300 fill-current",
      half: "text-amber-400 dark:text-amber-300 fill-current",
      empty: "text-gray-300 dark:text-gray-700",
    };
    const StarComponent = type === "half" ? StarHalf : Star;

    return (
      <StarComponent
        key={key}
        className={`${baseClasses} ${starClasses[type]}`}
        aria-label={`${type} star`}
      />
    );
  };

  const stars = [];
  for (let i = 0; i < fullStars; i++) stars.push(getStar("full", i));
  if (hasHalfStar) stars.push(getStar("half", "half"));
  for (let i = stars.length; i < 5; i++) stars.push(getStar("empty", i));

  return (
    <div
      className="flex items-center space-x-1"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {stars}
    </div>
  );
};

export default StarRating;
