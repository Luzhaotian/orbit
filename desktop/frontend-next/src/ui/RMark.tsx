export function RMark({ className = "rmark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <path pathLength={100} d="M8 3.2a4.8 4.8 0 1 1 0 9.6a4.8 4.8 0 1 1 0-9.6" />
      <path pathLength={100} d="M2.8 8a7.2 3.1 0 0 1 10.4 0a7.2 3.1 0 0 1-10.4 0" />
      <path pathLength={100} d="M12.4 5.2a1.1 1.1 0 1 1 0 0.01" />
    </svg>
  );
}

// Inline geometry lets the product symbol inherit the surface's theme colour.
export function SymbolMark({ className = "sym-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="currentColor" aria-hidden="true">
      <ellipse cx="40" cy="40" rx="34" ry="14" fill="none" stroke="currentColor" strokeWidth="3.2" transform="rotate(-28 40 40)" opacity="0.9" />
      <circle cx="40" cy="40" r="18" />
      <circle cx="34" cy="36" r="5" fill="none" stroke="currentColor" strokeWidth="0" opacity="0.25" />
      <circle cx="34" cy="36" r="5" fill="#fff" opacity="0.22" />
      <circle cx="62" cy="26" r="5.5" />
      <circle cx="62" cy="26" r="2.2" fill="#fff" opacity="0.55" />
    </svg>
  );
}
