import { useState, useEffect } from "react";


// New component for the Terms of Service page.
function TermsOfServicePage({ setCurrentPage }) {
  // Simulate analytics event on page load.
  useEffect(() => {
    console.log("Analytics event tracked: view_terms");
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      {/* Placeholder for SEO meta tags - removed react-helmet import to fix compilation error */}

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
        {/* Header section with Poppins and Inter fonts */}
        <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
          Terms of Service
        </h1>
        <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2 mb-8">
          Our commitment to fair use.
        </p>

        {/* The main content, styled with prose for readability. */}
        <div className="prose dark:prose-invert max-w-none">
          {/* User Responsibilities Section */}
          <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            User Responsibilities
          </h2>
          <p className="font-inter text-gray-700 dark:text-gray-300">
            By using our e-commerce services, you agree to provide accurate and
            complete information for all purchases. This includes your name,
            shipping address, billing address, and payment details. You are
            responsible for safeguarding your account password and for all
            activities that occur under your account. You agree not to use our
            site for any fraudulent or illegal activities, including purchasing
            products for resale without explicit permission, or submitting false
            information.
          </p>
          <p className="font-inter text-gray-700 dark:text-gray-300">
            All user-generated content, such as product reviews and comments,
            must be truthful and respectful. We reserve the right to remove any
            content that we deem inappropriate, offensive, or in violation of
            these terms.
          </p>

          {/* Limitations of Liability Section */}
          <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Limitations of Liability
          </h2>
          <p className="font-inter text-gray-700 dark:text-gray-300">
            We strive to provide accurate product descriptions, images, and
            pricing. However, we do not warrant that all information is free of
            errors. We reserve the right to correct any errors, inaccuracies, or
            omissions and to change or update information at any time without
            prior notice. In the event of a pricing error, we may, at our
            discretion, refuse or cancel any orders placed for that product.
          </p>
          <p className="font-inter text-gray-700 dark:text-gray-300">
            We are not responsible for delays in shipping or delivery caused by
            the courier service, natural disasters, or other factors beyond our
            control. We are not liable for any direct, indirect, incidental, or
            consequential damages resulting from the use or inability to use our
            products or services, including damages for loss of profits, data,
            or goodwill.
          </p>

          {/* Call-to-action to a contact page */}
          <p className="mt-8">
            If you have any questions or concerns about these terms, please feel
            free to{" "}
            <a
              href="#"
              onClick={() => setCurrentPage("contact")}
              className="font-semibold text-indigo-500 dark:text-indigo-700 hover:underline transition-colors"
            >
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

export default TermsOfServicePage;
