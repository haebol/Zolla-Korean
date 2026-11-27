import React from 'react';

interface RedShoesJollamanLogoSvgProps {
  className?: string;
}

/**
 * Brand mascot matching the user's signature Red-Shoes Jollaman illustration:
 * Round smiling head with top hair tuft, raised arms with round white hands,
 * crisp black stick body, and bright red oval shoes.
 */
export const RedShoesJollamanLogoSvg: React.FC<RedShoesJollamanLogoSvgProps> = ({
  className = 'w-7 h-8',
}) => (
  <svg
    viewBox="0 0 64 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Soft oval floor shadow */}
    <ellipse cx="32" cy="70" rx="18" ry="3.2" fill="#E2E8F0" />

    {/* Raised stick arms */}
    <path
      d="M32 39 L13 28 M32 39 L51 28"
      stroke="#0F172A"
      strokeWidth="4.4"
      strokeLinecap="round"
    />
    {/* Little round white hands */}
    <circle cx="11" cy="26.5" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
    <circle cx="53" cy="26.5" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />

    {/* Stick torso & legs */}
    <path
      d="M32 33 V50 L20 65 M32 50 L44 65"
      stroke="#0F172A"
      strokeWidth="4.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Signature Red Oval Shoes */}
    <ellipse cx="18.5" cy="66.5" rx="7.6" ry="4.4" fill="#DC2626" stroke="#0F172A" strokeWidth="3.2" />
    <ellipse cx="45.5" cy="66.5" rx="7.6" ry="4.4" fill="#DC2626" stroke="#0F172A" strokeWidth="3.2" />

    {/* Cute top hair tuft */}
    <path
      d="M28.5 7.5 Q32.5 1.5 36.5 6.8 Q34.5 9.2 31.5 8.5 Z"
      fill="#0F172A"
    />

    {/* White round head */}
    <circle cx="32" cy="20" r="13.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.8" />

    {/* Dot eyes + wide smile */}
    <circle cx="27.2" cy="18.2" r="2" fill="#0F172A" />
    <circle cx="36.8" cy="18.2" r="2" fill="#0F172A" />
    <path
      d="M26.5 23.2 Q32 28.2 37.5 23.2"
      stroke="#0F172A"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
