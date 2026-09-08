interface TeamsIconProps {
  size?: number;
  className?: string;
}

/** Microsoft Teams logo — accurate purple/blue SVG reproduction */
export function TeamsIcon({ size = 24, className = '' }: TeamsIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Rear person — large (head + torso) */}
      <circle cx="30.5" cy="9" r="7" fill="#9EA6F1" />
      <path
        d="M18.5 31.5c0-6.351 5.149-11.5 11.5-11.5h1c6.351 0 11.5 5.149 11.5 11.5V36H18.5v-4.5z"
        fill="#9EA6F1"
      />
      {/* Front person — small (head only, peeking right) */}
      <circle cx="40" cy="12" r="4.5" fill="#7B83EB" />
      {/* Main T-square — front */}
      <rect x="1" y="14" width="29" height="28" rx="5.5" fill="#4B55C4" />
      {/* White T letter */}
      <rect x="7.5" y="21.5" width="16" height="3.5" rx="1.75" fill="white" />
      <rect x="13.75" y="21.5" width="3.5" height="15" rx="1.75" fill="white" />
    </svg>
  );
}
