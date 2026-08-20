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
  // Height presets
  const heightClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-16",
  };

  const currentHeight = heightClasses[size] || "h-10";

  return (
    <div className={`inline-flex items-center select-none ${className}`} {...props}>
      <svg
        viewBox={showText ? (showTagline ? "0 0 520 160" : "0 0 520 125") : "0 0 180 155"}
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
            x1="10"
            y1="56"
            x2="48"
            y2="56"
            stroke="url(#empSpeed1)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <line
            x1="22"
            y1="78"
            x2="60"
            y2="78"
            stroke="url(#empSpeed2)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <line
            x1="36"
            y1="100"
            x2="66"
            y2="100"
            stroke="url(#empSpeed3)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Outer Handle & Base Strut Frame */}
          <path
            d="M 28 42 L 56 42 C 62 42 67 46 69 52 L 84 96 C 86 102 92 106 99 106 L 158 106"
            fill="none"
            stroke="url(#empCartFrame)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stylized Infill Basket / T-Shape */}
          <path
            d="M 84 56 L 160 56 C 165 56 169 60 169 65 C 169 70 165 74 160 74 L 132 74 L 118 102 C 116 106 112 108 108 108 L 102 108 C 97 108 94 104 96 99 L 108 74 L 84 74 C 79 74 76 70 76 65 C 76 60 79 56 84 56 Z"
            fill="url(#empBasket)"
          />

          {/* Left and Right Wheels */}
          <circle cx="84" cy="132" r="13" fill="url(#empWheel1)" />
          <circle cx="146" cy="132" r="13" fill="url(#empWheel2)" />
        </g>

        {/* ================= WORDMARK & TAGLINE ================= */}
        {showText && (
          <g id="wordmark-and-tagline">
            {/* Wordmark "Empire" */}
            <g
              className="fill-gray-900 dark:fill-white"
              fontFamily="'Poppins', 'Inter', -apple-system, sans-serif"
              fontSize="78"
              fontWeight="800"
              letterSpacing="-0.8"
            >
              {/* Emp */}
              <text x="188" y="104">
                Emp
              </text>

              {/* Dotless 'ı' stem only */}
              <text x="354" y="104">
                ı
              </text>

              {/* re */}
              <text x="375" y="104">
                re
              </text>
            </g>

            {/* The ONLY Dot on the 'i' -> Electric Blue Rounded Rectangle */}
            <rect x="354.5" y="44" width="16" height="15" rx="3.5" fill="url(#empDotGrad)" />

            {/* Tagline "SHOP • SELL • GET IT FAST" */}
            {showTagline && (
              <g
                fontFamily="'Inter', 'Poppins', sans-serif"
                fontSize="13"
                fontWeight="700"
                letterSpacing="4.2"
                className="fill-gray-700 dark:fill-gray-200"
              >
                <text x="190" y="142">SHOP</text>
                <circle cx="261" cy="138" r="3.2" fill="#0080FF" />
                <text x="281" y="142">SELL</text>
                <circle cx="347" cy="138" r="3.2" fill="#0080FF" />
                <text x="367" y="142">GET IT FAST</text>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

export const LogoIcon = ({ className = "w-8 h-8", ...props }) => {
  return (
    <svg
      viewBox="0 0 180 155"
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
        x1="10"
        y1="56"
        x2="48"
        y2="56"
        stroke="url(#iconSpeed1)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="78"
        x2="60"
        y2="78"
        stroke="url(#iconSpeed2)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="36"
        y1="100"
        x2="66"
        y2="100"
        stroke="url(#iconSpeed3)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <path
        d="M 28 42 L 56 42 C 62 42 67 46 69 52 L 84 96 C 86 102 92 106 99 106 L 158 106"
        fill="none"
        stroke="url(#iconCartFrame)"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M 84 56 L 160 56 C 165 56 169 60 169 65 C 169 70 165 74 160 74 L 132 74 L 118 102 C 116 106 112 108 108 108 L 102 108 C 97 108 94 104 96 99 L 108 74 L 84 74 C 79 74 76 70 76 65 C 76 60 79 56 84 56 Z"
        fill="url(#iconBasket)"
      />

      <circle cx="84" cy="132" r="13" fill="url(#iconWheel1)" />
      <circle cx="146" cy="132" r="13" fill="url(#iconWheel2)" />
    </svg>
  );
};

export default Logo;
