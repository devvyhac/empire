import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// This is a placeholder for a responsive image component.
// In a real application, you might use a more sophisticated image library.
const ResponsiveImage = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={`w-full h-auto object-cover rounded-xl shadow-lg ${className}`}
  />
);

export default function AboutPage() {
  // Simulating analytics and SEO data from Strapi on component mount.
  useEffect(() => {
    console.log("Analytics event tracked: view_about");
    // Placeholder for SEO meta tags from a data source like Strapi.
    const metaTitle = "About Us - Our Story & Mission";
    const metaDescription =
      "Learn about our company's mission, values, and the team behind our quality products.";
    console.log(`SEO Title: ${metaTitle}`);
    console.log(`SEO Description: ${metaDescription}`);
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <main className="flex-grow">
      {/* Hero Section with Parallax Effect */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-gray-900 dark:bg-gray-800">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          {/* Placeholder for the hero image from a source like Strapi. */}
          <img
            src="https://placehold.co/1920x1080/4A5568/CBD5E0?text=Hero+Image"
            alt="About Us Hero"
            className="w-full h-full object-cover opacity-70"
          />
        </motion.div>
        <div className="relative z-10 container mx-auto flex items-center justify-center h-full px-4 text-center">
          <div className="text-white dark:text-gray-100">
            <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Our Story
            </h1>
            <p className="font-inter text-lg md:text-xl text-gray-100 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Crafting quality products with passion.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Mission Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 mb-16 lg:mb-24">
          <div className="md:w-1/2">
            <h2 className="font-poppins text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Our Mission
            </h2>
            <p className="font-inter text-lg text-gray-700 dark:text-gray-300">
              Our mission is to deliver exceptional value and service by
              creating high-quality, sustainable products that enhance the lives
              of our customers. We are committed to innovation, ethical
              practices, and fostering a community around our brand.
            </p>
          </div>
          <div className="md:w-1/2">
            <ResponsiveImage
              src="https://placehold.co/600x400/3182CE/EBF8FF?text=Our+Mission"
              alt="Our Mission"
            />
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 md:p-16 flex flex-col md:flex-row-reverse items-center gap-12 mb-16 lg:mb-24">
          <div className="md:w-1/2">
            <h2 className="font-poppins text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Our Values
            </h2>
            <p className="font-inter text-lg text-gray-700 dark:text-gray-300">
              We believe in transparency, integrity, and continuous improvement.
              We value our customers and are dedicated to building long-lasting
              relationships based on trust and mutual respect. Our team is
              passionate about what we do, and we strive to create a positive
              impact on the world.
            </p>
          </div>
          <div className="md:w-1/2">
            <ResponsiveImage
              src="https://placehold.co/600x400/9F7AEA/E9D8FD?text=Our+Values"
              alt="Our Values"
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="font-poppins text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Meet the Team
            </h2>
            <p className="font-inter text-lg text-gray-700 dark:text-gray-300">
              Our team is a diverse group of talented individuals united by a
              shared vision. We bring together a wide range of skills and
              experiences, all dedicated to bringing you the best possible
              products. We are more than just a company; we are a family.
            </p>
          </div>
          <div className="md:w-1/2">
            <ResponsiveImage
              src="https://placehold.co/600x400/F6AD55/FFF5E9?text=Our+Team"
              alt="Our Team"
            />
          </div>
        </section>

        {/* CTA Section */}
        <div className="mt-16 lg:mt-24 text-center">
          <a
            href="#"
            className="inline-block py-3 px-8 rounded-full text-lg font-bold text-white bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Our Collection
          </a>
        </div>
      </div>
    </main>
  );
}
