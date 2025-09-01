// Reusable StarRating component for product cards
export const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className="w-4 h-4 text-amber-400 dark:text-amber-300 fill-current"
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <StarHalf
          key={i}
          className="w-4 h-4 text-amber-400 dark:text-amber-300 fill-current"
        />
      );
    } else {
      stars.push(
        <Star key={i} className="w-4 h-4 text-gray-300 dark:text-gray-700" />
      );
    }
  }
  return <div className="flex items-center space-x-1">{stars}</div>;
};
