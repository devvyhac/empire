import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Package } from "lucide-react";

// Mock data for a newly placed order with detailed items
const mockOrder = {
  id: "ORD-004",
  date: "2024-08-11",
  email: "johndoe@example.com",
  items: [
    {
      name: "Ergonomic Keyboard",
      sku: "KB-101",
      quantity: 1,
      price: 50.0,
      image: "https://placehold.co/100x100/E5E7EB/1F2937?text=Keyboard",
    },
    {
      name: "Wireless Mouse",
      sku: "MS-202",
      quantity: 2,
      price: 19.99,
      image: "https://placehold.co/100x100/E5E7EB/1F2937?text=Mouse",
    },
  ],
  shippingAddress: "789 Commerce St, Anothercity, USA 67890",
  trackingInfo: "1Z999AA10123456789",
};

// Main App component that renders the confirmation page
export default function App() {
  const [orderIdToTrack, setOrderIdToTrack] = useState("");

  // Use a useEffect hook to simulate analytics tracking when the component mounts
  useEffect(() => {
    console.log(
      `Analytics event tracked: purchase - Order ID: ${mockOrder.id}`
    );

    // Mocking an email confirmation link via a console log
    console.log(
      `Email confirmation sent to ${mockOrder.email} via Express /api/orders/:id`
    );

    // In a real application, you would add SEO meta tags here
    // Example: document.title = "Order Confirmation - Thank You";
    // Example: document.querySelector('meta[name="description"]').setAttribute('content', 'Thank you for your order. View your order details and tracking information.');
  }, []);

  // Handle the "Keep Shopping" button click
  const handleKeepShopping = () => {
    console.log("User wants to continue shopping. Navigating to homepage...");
  };

  // Handle the "Track Order" button click
  const handleTrackOrder = () => {
    if (orderIdToTrack) {
      console.log(
        `User wants to track order ID: ${orderIdToTrack}. Navigating to tracking page...`
      );
    } else {
      console.log("Please enter an Order ID to track.");
    }
  };

  return (
    <main className="flex container w-full mx-auto items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 font-inter">
      <div className="w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 md:p-10 transition-colors duration-300">
        <div className="flex flex-col items-center p-6 text-center">
          {/* Green checkmark icon */}
          <div className="bg-green-500 dark:bg-success-dark p-3 rounded-full inline-flex">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>

          {/* Thank you and order number header */}
          <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100 mt-4">
            Thank You for Your Order!
          </h1>
          <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
            Order #{mockOrder.id} has been placed.
          </p>
          <p className="font-inter text-base text-gray-700 dark:text-gray-300 mt-1">
            A confirmation has been sent to {mockOrder.email}.
          </p>

          <div className="w-full max-w-4xl mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
            <h2 className="font-poppins text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Order Summary
            </h2>

            {/* Order Details Table - Stacked rows for mobile */}
            <div className="overflow-x-auto rounded-lg shadow-md mb-6">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      SKU
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {mockOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-md"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                        {item.sku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-200">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Shipping & Tracking Info - adapts to desktop grid */}
            <div className="md:grid md:grid-cols-2 md:gap-8 text-left mt-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-4 md:mb-0">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Shipping Address
                </h3>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {mockOrder.shippingAddress}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Tracking Information
                </h3>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  Tracking Number: {mockOrder.trackingInfo}
                </p>
                <p className="text-sm mt-1">
                  {/* Mocked link */}
                  <a
                    href="#"
                    className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light"
                  >
                    View on courier website
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* New dual CTA buttons container */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8 w-full max-w-sm">
            {/* Keep Shopping Button */}
            <motion.button
              onClick={handleKeepShopping}
              className="w-full py-3 px-6 rounded-lg shadow-sm text-base font-inter text-white bg-indigo-600 dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a href="/shop">Keep Shopping</a>
            </motion.button>
            {/* Tracking Input and Button */}
            <div className="flex w-full">
              <motion.button
                onClick={handleTrackOrder}
                className="py-3 px-6 rounded-lg shadow-sm text-base font-inter text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href="/track-order">Track Order</a>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { CheckCircle, Package } from 'lucide-react';

// // Custom Tailwind CSS colors from the design brief
// const customColors = {
//   'primary-light': '#4c51bf',
//   'primary-dark': '#3a41a3',
//   'success-light': '#10b981',
//   'success-dark': '#059669',
// };

// // Mock data for a newly placed order with detailed items
// const mockOrder = {
//   id: 'ORD-004',
//   date: '2024-08-11',
//   email: 'johndoe@example.com',
//   items: [
//     {
//       name: 'Ergonomic Keyboard',
//       sku: 'KB-101',
//       quantity: 1,
//       price: 50.00,
//       image: 'https://placehold.co/100x100/E5E7EB/1F2937?text=Keyboard'
//     },
//     {
//       name: 'Wireless Mouse',
//       sku: 'MS-202',
//       quantity: 2,
//       price: 19.99,
//       image: 'https://placehold.co/100x100/E5E7EB/1F2937?text=Mouse'
//     }
//   ],
//   shippingAddress: '789 Commerce St, Anothercity, USA 67890',
//   trackingInfo: '1Z999AA10123456789',
// };

// // Checkout progress steps, copied from the shopping-cart component
// const progressSteps = ['Cart', 'Checkout', 'Confirmation'];

// // Main App component that renders the confirmation page
// export default function App() {
//   const [orderIdToTrack, setOrderIdToTrack] = useState('');

//   // Use a useEffect hook to simulate analytics tracking when the component mounts
//   useEffect(() => {
//     console.log(`Analytics event tracked: purchase - Order ID: ${mockOrder.id}`);

//     // Mocking an email confirmation link via a console log
//     console.log(`Email confirmation sent to ${mockOrder.email} via Express /api/orders/:id`);
//   }, []);

//   // Handle the "Keep Shopping" button click
//   const handleKeepShopping = () => {
//     console.log('User wants to continue shopping. Navigating to homepage...');
//   };

//   // Handle the "Track Order" button click
//   const handleTrackOrder = () => {
//     if (orderIdToTrack) {
//       console.log(`User wants to track order ID: ${orderIdToTrack}. Navigating to tracking page...`);
//     } else {
//       console.log('Please enter an Order ID to track.');
//     }
//   };

//   return (
//     <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 font-inter">
//       <div className="w-full max-w-4xl">

//         {/* Progress Bar - adapted from the shopping-cart page */}
//         <div className="flex justify-between items-center mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
//           {progressSteps.map((step, index) => (
//             <div key={step} className="flex items-center">
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${index === 2 ? 'bg-primary-light dark:bg-primary-dark' : 'bg-gray-300 dark:bg-gray-700'}`}>
//                 {index + 1}
//               </div>
//               <span className={`ml-2 text-sm hidden md:block ${index === 2 ? 'text-primary-light dark:text-primary-dark' : 'text-gray-500 dark:text-gray-400'}`}>
//                 {step}
//               </span>
//               {index < progressSteps.length - 1 && (
//                 <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700 mx-2 hidden md:block"></div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 md:p-10 transition-colors duration-300">
//           <div className="flex flex-col items-center p-6 text-center">
//             {/* Green checkmark icon */}
//             <div className="bg-success-light dark:bg-success-dark p-3 rounded-full inline-flex">
//               <CheckCircle className="w-16 h-16 text-white" />
//             </div>

//             {/* Thank you and order number header */}
//             <h1 className="font-poppins text-4xl font-extrabold text-gray-900 dark:text-gray-100 mt-4">
//               Thank You for Your Order!
//             </h1>
//             <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mt-2">
//               Order #{mockOrder.id} has been placed.
//             </p>
//             <p className="font-inter text-base text-gray-700 dark:text-gray-300 mt-1">
//               A confirmation has been sent to {mockOrder.email}.
//             </p>

//             <div className="w-full max-w-4xl mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
//               <h2 className="font-poppins text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                 Order Summary
//               </h2>

//               {/* Order Details Table - Stacked rows for mobile */}
//               <div className="overflow-x-auto rounded-lg shadow-md mb-6">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                   <thead className="bg-gray-100 dark:bg-gray-800">
//                     <tr>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                         Item
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                         SKU
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                         Quantity
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                         Price
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
//                     {mockOrder.items.map((item, index) => (
//                       <tr key={index}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10">
//                               <img className="h-10 w-10 rounded-md" src={item.image} alt={item.name} />
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
//                           {item.sku}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
//                           {item.quantity}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-200">
//                           ${(item.price * item.quantity).toFixed(2)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Shipping & Tracking Info - adapts to desktop grid */}
//               <div className="md:grid md:grid-cols-2 md:gap-8 text-left mt-6">
//                 <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-4 md:mb-0">
//                   <h3 className="font-semibold text-gray-900 dark:text-gray-100">Shipping Address</h3>
//                   <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
//                     {mockOrder.shippingAddress}
//                   </p>
//                 </div>
//                 <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
//                   <h3 className="font-semibold text-gray-900 dark:text-gray-100">Tracking Information</h3>
//                   <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
//                     Tracking Number: {mockOrder.trackingInfo}
//                   </p>
//                   <p className="text-sm mt-1">
//                     {/* Mocked link */}
//                     <a href="#" className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light">
//                       View on courier website
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* New dual CTA buttons container */}
//             <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8 w-full max-w-sm">
//               {/* Keep Shopping Button */}
//               <motion.button
//                 onClick={handleKeepShopping}
//                 className="w-full py-3 px-6 rounded-lg shadow-sm text-base font-inter text-white bg-primary-light dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light transition-colors"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Keep Shopping
//               </motion.button>
//               {/* Tracking Input and Button */}
//               <div className="flex w-full">
//                 <input
//                   type="text"
//                   placeholder="Enter Order ID"
//                   value={orderIdToTrack}
//                   onChange={(e) => setOrderIdToTrack(e.target.value)}
//                   className="flex-grow py-3 px-4 rounded-l-lg border-gray-300 dark:border-gray-700 shadow-sm text-sm dark:bg-gray-900 dark:text-gray-100 transition-colors"
//                 />
//                 <motion.button
//                   onClick={handleTrackOrder}
//                   className="py-3 px-6 rounded-r-lg shadow-sm text-base font-inter text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors flex items-center justify-center"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Track Order
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
