interface CowrieLogoProps {
  size?: number;
  className?: string;
}

export function CowrieLogo({ size = 40, className = "" }: CowrieLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cowrie shell body */}
      <ellipse cx="40" cy="40" rx="28" ry="34" fill="#1B4332" />
      <ellipse cx="40" cy="40" rx="22" ry="28" fill="#255541" />
      {/* Shell opening/slit */}
      <path
        d="M40 18 C34 24, 30 32, 30 40 C30 48, 34 56, 40 62 C46 56, 50 48, 50 40 C50 32, 46 24, 40 18Z"
        fill="#D4A017"
        opacity="0.9"
      />
      {/* Shell teeth (ridges) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={36 + i * 1.5}
          y1={24 + i * 2}
          x2={36 + i * 1.5}
          y2={56 - i * 2}
          stroke="#1B4332"
          strokeWidth="1"
          opacity="0.6"
        />
      ))}
      {/* Gleam */}
      <ellipse cx="33" cy="28" rx="4" ry="6" fill="white" opacity="0.15" />
    </svg>
  );
}

export function CowreeWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display font-bold tracking-tight text-forest-900 ${className}`}
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      Cowree
    </span>
  );
}
