export default function RocketIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Grid fins — small folded fins near top */}
      <rect x="21" y="22" width="3" height="6" rx="0.5" fill="#52525b" />
      <rect x="40" y="22" width="3" height="6" rx="0.5" fill="#52525b" />

      {/* Landing legs — angled struts at bottom */}
      <path d="M24 80 L18 96 L22 96 L26 82" fill="#3f3f46" stroke="#27272a" strokeWidth="0.5" />
      <path d="M40 80 L46 96 L42 96 L38 82" fill="#3f3f46" stroke="#27272a" strokeWidth="0.5" />
      {/* Leg pads */}
      <rect x="15" y="94" width="10" height="3" rx="1.5" fill="#52525b" />
      <rect x="39" y="94" width="10" height="3" rx="1.5" fill="#52525b" />

      {/* Body — tall cylindrical with slight taper at nose */}
      <path
        d="M24 18 L24 84 Q24 88 28 88 L36 88 Q40 88 40 84 L40 18 Z"
        fill="#f4f4f5"
        stroke="#d4d4d8"
        strokeWidth="1"
      />

      {/* Interstage band */}
      <rect x="24" y="68" width="16" height="3" fill="#a1a1aa" />

      {/* Body left highlight */}
      <rect x="25" y="18" width="3" height="66" rx="1" fill="white" opacity="0.5" />

      {/* Nose cone — smooth ogive */}
      <path
        d="M32 2 C30 6 24 14 24 18 L40 18 C40 14 34 6 32 2Z"
        fill="#f4f4f5"
        stroke="#d4d4d8"
        strokeWidth="1"
      />
      {/* Nose highlight */}
      <path
        d="M32 3 C31 6 27 13 26 17"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* SpaceX-style dark raceway stripe */}
      <rect x="30.5" y="18" width="3" height="50" fill="#27272a" opacity="0.15" />

      {/* Falcon logo area — small "window" / payload area */}
      <rect
        x="27"
        y="30"
        width="10"
        height="8"
        rx="2"
        fill="#e4e4e7"
        stroke="#a1a1aa"
        strokeWidth="0.8"
      />
      <rect x="28.5" y="31.5" width="7" height="5" rx="1" fill="#0ea5e9" opacity="0.5" />
      <rect x="29" y="32" width="3" height="2" rx="0.5" fill="white" opacity="0.4" />

      {/* Engine section — wider base bell */}
      <path
        d="M24 84 L22 88 L22 90 Q22 92 26 92 L38 92 Q42 92 42 90 L42 88 L40 84"
        fill="#71717a"
        stroke="#52525b"
        strokeWidth="0.8"
      />

      {/* Engine nozzles — 3 Merlin-style bells */}
      <ellipse cx="28" cy="92" rx="3" ry="1.5" fill="#3f3f46" stroke="#27272a" strokeWidth="0.5" />
      <ellipse cx="32" cy="93" rx="3.5" ry="2" fill="#3f3f46" stroke="#27272a" strokeWidth="0.5" />
      <ellipse cx="36" cy="92" rx="3" ry="1.5" fill="#3f3f46" stroke="#27272a" strokeWidth="0.5" />
      {/* Nozzle inner glow */}
      <ellipse cx="32" cy="93" rx="1.5" ry="1" fill="#52525b" />
    </svg>
  );
}
