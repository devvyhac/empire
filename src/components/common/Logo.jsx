import React from "react";

/**
 * High-fidelity Vector SVG Logo matching the official brand artwork
 */
export const Logo = ({
  showText = true,
  showTagline = true,
  className = "",
  size = "md", // "sm", "md", "lg", "xl"
  ...props
}) => {
  // Height presets for clear readability and presence
  const heightClasses = {
    sm: "h-9",
    md: "h-12 md:h-13",
    lg: "h-16 md:h-20",
    xl: "h-20 md:h-24",
  };

  const currentHeight = heightClasses[size] || "h-12 md:h-13";

  return (
    <div className={`inline-flex items-center select-none ${className}`} {...props}>
      <svg
        viewBox={showText ? (showTagline ? "0 0 450 120" : "0 0 450 92") : "0 0 150 120"}
        className={`${currentHeight} w-auto transition-transform duration-200`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Electric Blue Gradient for Cart Frame */}
          <linearGradient id="empCartFrame" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A3FF" />
            <stop offset="35%" stopColor="#0080FF" />
            <stop offset="70%" stopColor="#0055FF" />
            <stop offset="100%" stopColor="#0040E0" />
          </linearGradient>

          {/* Electric Blue Gradient for Infill Basket */}
          <linearGradient id="empBasket" x1="0%" y1="0%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#00A8FF" />
            <stop offset="45%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#0044DD" />
          </linearGradient>

          {/* Speed Streaks Gradients */}
          <linearGradient id="empSpeed1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00A3FF" />
          </linearGradient>
          <linearGradient id="empSpeed2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00A3FF" />
          </linearGradient>
          <linearGradient id="empSpeed3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00A3FF" />
          </linearGradient>

          {/* Wheel Gradients */}
          <linearGradient id="empWheel1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0099FF" />
            <stop offset="100%" stopColor="#0044DD" />
          </linearGradient>
          <linearGradient id="empWheel2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0099FF" />
            <stop offset="100%" stopColor="#0044DD" />
          </linearGradient>

          {/* Blue Dot Gradient on the 'i' */}
          <linearGradient id="empDotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A3FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>
        </defs>

        {/* ================= CART ICON ================= */}
        <g id="cart-icon">
          {/* Speed Lines */}
          <line
            x1="6"
            y1="40"
            x2="38"
            y2="40"
            stroke="url(#empSpeed1)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <line
            x1="16"
            y1="58"
            x2="48"
            y2="58"
            stroke="url(#empSpeed2)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <line
            x1="28"
            y1="76"
            x2="52"
            y2="76"
            stroke="url(#empSpeed3)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Outer Handle & Base Strut Frame */}
          <path
            d="M 22 28 L 44 28 C 49 28 53 31 55 36 L 68 72 C 70 77 75 80 81 80 L 128 80"
            fill="none"
            stroke="url(#empCartFrame)"
            strokeWidth="10.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stylized Infill Basket / T-Shape */}
          <path
            d="M 68 39 L 130 39 C 134 39 137 42 137 46 C 137 50 134 53 130 53 L 107 53 L 96 76 C 94 79 91 81 88 81 L 83 81 C 79 81 76 78 78 74 L 88 53 L 68 53 C 64 53 61 50 61 46 C 61 42 64 39 68 39 Z"
            fill="url(#empBasket)"
          />

          {/* Left and Right Wheels */}
          <circle cx="68" cy="100" r="10.5" fill="url(#empWheel1)" />
          <circle cx="118" cy="100" r="10.5" fill="url(#empWheel2)" />
        </g>

        {/* ================= WORDMARK & TAGLINE ================= */}
        {showText && (
          <g id="wordmark-and-tagline">
            {/* Wordmark "Empire" */}
            <g
              className="fill-gray-900 dark:fill-white"
              fontFamily="'Poppins', 'Inter', -apple-system, sans-serif"
              fontSize="68"
              fontWeight="800"
              letterSpacing="-0.8"
            >
              {/* Emp */}
              <text x="150" y="78">
                Emp
              </text>

              {/* Dotless 'ı' stem only */}
              <text x="295" y="78">
                ı
              </text>

              {/* re */}
              <text x="313" y="78">
                re
              </text>
            </g>

            {/* The ONLY Dot on the 'i' -> Electric Blue Rounded Rectangle */}
            <rect x="295.5" y="27" width="14" height="13" rx="3" fill="url(#empDotGrad)" />

            {/* Tagline "SHOP • SELL • GET IT FAST" */}
            {showTagline && (
              <g
                fontFamily="'Inter', 'Poppins', sans-serif"
                fontSize="12.5"
                fontWeight="800"
                letterSpacing="3.5"
                className="fill-gray-800 dark:fill-gray-100"
              >
                <text x="152" y="108">SHOP</text>
                <circle cx="210" cy="104" r="2.8" fill="#0080FF" />
                <text x="226" y="108">SELL</text>
                <circle cx="280" cy="104" r="2.8" fill="#0080FF" />
                <text x="296" y="108">GET IT FAST</text>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

export const LogoIcon = ({ className = "w-9 h-9", ...props }) => {
  return (
    <svg
      viewBox="0 0 150 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="iconCartFrame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A3FF" />
          <stop offset="35%" stopColor="#0080FF" />
          <stop offset="70%" stopColor="#0055FF" />
          <stop offset="100%" stopColor="#0040E0" />
        </linearGradient>

        <linearGradient id="iconBasket" x1="0%" y1="0%" x2="100%" y2="70%">
          <stop offset="0%" stopColor="#00A8FF" />
          <stop offset="45%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#0044DD" />
        </linearGradient>

        <linearGradient id="iconSpeed1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00A3FF" />
        </linearGradient>
        <linearGradient id="iconSpeed2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00A3FF" />
        </linearGradient>
        <linearGradient id="iconSpeed3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00A3FF" />
        </linearGradient>

        <linearGradient id="iconWheel1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0099FF" />
          <stop offset="100%" stopColor="#0044DD" />
        </linearGradient>
        <linearGradient id="iconWheel2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0099FF" />
          <stop offset="100%" stopColor="#0044DD" />
        </linearGradient>
      </defs>

      <line
        x1="6"
        y1="40"
        x2="38"
        y2="40"
        stroke="url(#iconSpeed1)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="58"
        x2="48"
        y2="58"
        stroke="url(#iconSpeed2)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="76"
        x2="52"
        y2="76"
        stroke="url(#iconSpeed3)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      <path
        d="M 22 28 L 44 28 C 49 28 53 31 55 36 L 68 72 C 70 77 75 80 81 80 L 128 80"
        fill="none"
        stroke="url(#iconCartFrame)"
        strokeWidth="10.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M 68 39 L 130 39 C 134 39 137 42 137 46 C 137 50 134 53 130 53 L 107 53 L 96 76 C 94 79 91 81 88 81 L 83 81 C 79 81 76 78 78 74 L 88 53 L 68 53 C 64 53 61 50 61 46 C 61 42 64 39 68 39 Z"
        fill="url(#iconBasket)"
      />

      <circle cx="68" cy="100" r="10.5" fill="url(#iconWheel1)" />
      <circle cx="118" cy="100" r="10.5" fill="url(#iconWheel2)" />
    </svg>
  );
};

export default Logo;
