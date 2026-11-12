const colors = { ney: "#c8902a", qalam: "#2b4c8c", set: "#14213d" };

export default function ProductArt({ category, className = "" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Product image">
      <rect width="120" height="120" fill="#dde3e8" />
      <g transform="rotate(-35 60 60)">
        <rect x="56" y="8" width="8" height="92" rx="2" fill={colors[category] || "#14213d"} />
        <path d="M56 100h8l-4 16z" fill="#14213d" />
      </g>
    </svg>
  );
}
