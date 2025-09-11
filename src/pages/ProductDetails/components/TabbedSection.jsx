import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import StarRating from "./StarRating.jsx";

const TabbedSection = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12">
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <motion.button
          onClick={() => setActiveTab("description")}
          className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
            activeTab === "description"
              ? "border-b-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
              : "text-gray-500 dark:text-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-primary-light`}
          whileHover={{ y: -2 }}
        >
          Description
        </motion.button>
        <motion.button
          onClick={() => setActiveTab("specifications")}
          className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
            activeTab === "specifications"
              ? "border-b-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
              : "text-gray-500 dark:text-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-primary-light`}
          whileHover={{ y: -2 }}
        >
          Specifications
        </motion.button>
        <motion.button
          onClick={() => setActiveTab("reviews")}
          className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
            activeTab === "reviews"
              ? "border-b-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
              : "text-gray-500 dark:text-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-primary-light`}
          whileHover={{ y: -2 }}
        >
          Reviews ({reviews.length})
        </motion.button>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        {activeTab === "description" && (
          <div>
            <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100">
              Product Details
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: product?.description.replace(/\n/g, "<br />"),
              }}
            />
          </div>
        )}
        {activeTab === "specifications" && (
          <div className="space-y-2">
            <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100">
              Specifications
            </h2>
            <ul className="list-disc list-inside">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === "reviews" && (
          <div id="reviews">
            <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100">
              What Customers Say
            </h2>
            <p className="font-inter text-base text-gray-700 dark:text-gray-300">
              Share your experience.
            </p>

            {/* Review Form (for authenticated users) */}
            <div className="mt-6 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              {/* The original review form JSX remains unchanged */}
              <form>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Write a Review
                </h3>
                <div className="flex space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        star <= (product.userReview?.rating || 0)
                          ? "text-amber-400 dark:text-amber-300 fill-current"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <textarea
                  placeholder="Your review..."
                  className="w-full mt-4 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows="4"
                  required
                ></textarea>
                <motion.button
                  type="submit"
                  className="mt-4 py-2 px-4 rounded-lg bg-primary-light dark:bg-primary-dark text-white font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Review
                </motion.button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="mt-8 space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <StarRating rating={review.rating} />
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {review.author}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        - {review.date}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  There are no reviews yet. Be the first to review!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedSection;
