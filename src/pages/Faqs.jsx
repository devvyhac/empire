import { useState, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";

// Updated component for the FAQ page
function FaqPage({ setCurrentPage }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // The code for fetching data from Strapi and setting meta tags would go here.
  // For demonstration, we'll log a mock analytics event and provide a comment.
  useEffect(() => {
    console.log("Analytics event tracked: view_faq");

    // Placeholder for SEO meta tags from a data source like Strapi.
    // In a real application, you would use a library like 'react-helmet'
    // or a similar method to dynamically update the document head with this data.
    const metaTitle = "FAQ - Find quick answers to your queries";
    const metaDescription =
      "Find quick answers to common questions about shipping, returns, and payments.";
    console.log(`SEO Title: ${metaTitle}`);
    console.log(`SEO Description: ${metaDescription}`);
  }, []);

  const faqs = [
    {
      category: "Shipping",
      question: "What are your shipping options?",
      answer:
        "We offer several shipping options, including standard, expedited, and express shipping. The cost and delivery time depend on your location and the selected method.",
    },
    {
      category: "Shipping",
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and times will be calculated at checkout.",
    },
    {
      category: "Returns",
      question: "What is your return policy?",
      answer:
        "You can return any product within 30 days of purchase for a full refund or exchange, provided it is in its original condition. Please see our full Terms of Service for more details.",
    },
    {
      category: "Returns",
      question: "How do I initiate a return?",
      answer:
        "To initiate a return, please visit our Contact page and fill out the return form with your order number and reason for the return. We will then provide you with a return shipping label.",
    },
    {
      category: "Payments",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal and Apple Pay.",
    },
    {
      category: "Payments",
      question: "Is my payment information secure?",
      answer:
        "Yes, we use industry-standard encryption and security protocols to ensure that your payment information is handled securely and confidentially. We do not store your credit card details.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const variants = {
    open: { opacity: 1, height: "auto", marginTop: 16 },
    closed: { opacity: 0, height: 0, marginTop: 0 },
  };

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
        <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2 mb-8">
          Find quick answers to your queries.
        </p>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* The main container for the accordion. It's now rendering correctly. */}
        <div className="space-y-6">
          {categories.map((category) => {
            const faqsInCategory = filteredFaqs.filter(
              (faq) => faq.category === category
            );
            if (faqsInCategory.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {category}
                </h2>
                <div className="space-y-4">
                  {faqsInCategory.map((faq, index) => (
                    <motion.div
                      key={`${category}-${index}`}
                      className={`rounded-lg border border-gray-300 dark:border-gray-700 transition-colors duration-200 ${
                        openFaq === `${category}-${index}`
                          ? "bg-gray-100 dark:bg-gray-700"
                          : "bg-white dark:bg-gray-800"
                      }`}
                    >
                      <button
                        className="flex justify-between items-center w-full p-4 text-left font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors rounded-lg"
                        onClick={() => toggleFaq(`${category}-${index}`)}
                      >
                        <span className="font-poppins text-lg">
                          {faq.question}
                        </span>
                        <motion.span
                          className="transform"
                          animate={{
                            rotate:
                              openFaq === `${category}-${index}` ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-down"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {openFaq === `${category}-${index}` && (
                          <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                              open: { opacity: 1, height: "auto" },
                              closed: { opacity: 0, height: 0 },
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 font-inter text-gray-700 dark:text-gray-300">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default FaqPage;
