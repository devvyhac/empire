// New component for the Privacy Policy page with detailed content.
function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      {/* Placeholder for SEO meta tags from Strapi - react-helmet is not available. */}

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
        <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
          Privacy Policy
        </h1>
        {/* Updated tagline based on user request */}
        <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2 mb-8">
          Your data, our responsibility.
        </p>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from
            our site.
          </p>

          {/* Updated heading based on user request */}
          <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Data Collection
          </h2>
          <p>
            When you visit the site, we automatically collect certain
            information about your device, including information about your web
            browser, IP address, time zone, and some of the cookies that are
            installed on your device. Additionally, as you browse the site, we
            collect information about the individual web pages or products that
            you view, what websites or search terms referred you to the site,
            and information about how you interact with the site. We refer to
            this automatically-collected information as **Device Information**.
          </p>
          <p>
            When you make a purchase or attempt to make a purchase through the
            site, we collect certain information from you, including your name,
            billing address, shipping address, payment information (including
            credit card numbers), email address, and phone number. We refer to
            this information as **Order Information**.
          </p>
          <p>
            **Personal Information** in this Privacy Policy refers to both
            Device Information and Order Information.
          </p>

          {/* Updated heading based on user request */}
          <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            How We Use Your Data
          </h2>
          <p>
            We use the Order Information we collect generally to fulfill any
            orders placed through the site (including processing your payment
            information, arranging for shipping, and providing you with invoices
            and/or order confirmations). Additionally, we use this Order
            Information to communicate with you, screen our orders for potential
            risk or fraud, and, when in line with the preferences you have
            shared with us, provide you with information or advertising relating
            to our products or services.
          </p>
          <p>
            We use the Device Information that we collect to help us screen for
            potential risk and fraud (in particular, your IP address), and more
            generally to improve and optimize our site (for example, by
            generating analytics about how our customers browse and interact
            with the site, and to assess the success of our marketing and
            advertising campaigns).
          </p>

          <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Sharing Your Personal Information
          </h2>
          <p>
            We share your Personal Information with third parties to help us use
            your Personal Information, as described above. For example, we use a
            payment processor to handle transactions. We may also share your
            Personal Information to comply with applicable laws and regulations,
            to respond to a subpoena, search warrant or other lawful request for
            information we receive, or to otherwise protect our rights.
          </p>

          <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Your Rights
          </h2>
          <p>
            If you are a European resident, you have the right to access
            personal information we hold about you and to ask that your personal
            information be corrected, updated, or deleted. If you would like to
            exercise this right, please contact us through the contact
            information below.
          </p>

          <p className="mt-8">
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please feel
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

export default PrivacyPolicyPage;
