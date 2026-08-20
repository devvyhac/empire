import React from "react";

export const LogoIcon = ({ className = "w-8 h-8", ...props }) => {
  return (
    <svg
      viewBox="0 0 160 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Cart Outer Frame Gradient */}
        <linearGradient id="cartFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A3FF" />
          <stop offset="40%" stopColor="#0066FF" />
          <stop offset="80%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Cart Basket / Monogram Gradient */}
        <linearGradient id="basketGrad" x1="0%" y1="0%" x2="100%" y2="60%">
          <stop offset="0%" stopColor="#0084FF" />
          <stop offset="45%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Speed Lines Gradient */}
        <linearGradient id="speedLineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00A3FF" />
        </linearGradient>
        <linearGradient id="speedLineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00A3FF" />
        </linearGradient>
        <linearGradient id="speedLineGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00A3FF" />
        </linearGradient>

        {/* Left Wheel Gradient */}
        <linearGradient id="leftWheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C6FF" />
          <stop offset="100%" stopColor="#0066FF" />
        </linearGradient>

        {/* Right Wheel Gradient */}
        <linearGradient id="rightWheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </defs>

      {/* Speed Lines on the left */}
      <line
        x1="6"
        y1="52"
        x2="38"
        y2="52"
        stroke="url(#speedLineGrad1)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="70"
        x2="48"
        y2="70"
        stroke="url(#speedLineGrad2)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="26"
        y1="88"
        x2="52"
        y2="88"
        stroke="url(#speedLineGrad3)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Cart Frame (Handle & Base Tray) */}
      <path
        d="M 18 36 L 44 36 C 50 36 54 40 56 46 L 70 88 C 72 94 77 98 83 98 L 132 98"
        fill="none"
        stroke="url(#cartFrameGrad)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Stylized Angular Basket (T / E Infill) */}
      <path
        d="M 66 48 L 138 48 C 143 48 146 51 146 55.5 C 146 60 143 63 138 63 L 112 63 L 97 90 C 95 94 91 96 87 96 L 81 96 C 77 96 74 92 76 88 L 87 63 L 66 63 C 62 63 59 60 59 55.5 C 59 51 62 48 66 48 Z"
        fill="url(#basketGrad)"
      />

      {/* Left and Right Wheels */}
      <circle cx="68" cy="120" r="11" fill="url(#leftWheelGrad)" />
      <circle cx="122" cy="120" r="11" fill="url(#rightWheelGrad)" />
    </svg>
  );
};

export const Logo = ({
  showText = true,
  showTagline = false,
  className = "",
  iconClassName = "w-9 h-9",
  textClassName = "text-2xl font-bold",
  taglineClassName = "text-[9px] tracking-[0.25em] font-semibold mt-0.5",
  ...props
}) => {
  return (
    <div className={`flex items-center space-x-2.5 ${className}`} {...props}>
      <LogoIcon className={iconClassName} />
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center">
            <span
              className={`font-poppins font-bold tracking-tight text-gray-900 dark:text-white ${textClassName}`}
            >
              Emp
              <span className="inline-block relative">
                i
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-sm bg-[#0091FF] dark:bg-[#38BDF8]" />
              </span>
              re
            </span>
          </div>
          {showTagline && (
            <div className={`flex items-center space-x-1.5 uppercase ${taglineClassName}`}>
              <span className="text-[#38BDF8] font-bold">SHOP</span>
              <span className="text-[#38BDF8] font-black">•</span>
              <span className="text-[#A855F7] font-bold">SELL</span>
              <span className="text-[#A855F7] font-black">•</span>
              <span className="text-[#38BDF8] font-bold">GET IT FAST</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
