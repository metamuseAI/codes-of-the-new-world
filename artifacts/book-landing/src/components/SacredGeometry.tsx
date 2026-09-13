type Props = {
  variant?: "circles" | "fan" | "seed" | "dotline";
  className?: string;
  size?: number;
};

export function SacredGeometry({ variant = "circles", className, size = 240 }: Props) {
  if (variant === "circles") {
    return (
      <svg
        viewBox="0 0 240 240"
        width={size}
        height={size}
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.6}
        aria-hidden="true"
      >
        <circle cx="120" cy="100" r="60" />
        <circle cx="100" cy="110" r="60" />
        <circle cx="140" cy="110" r="60" />
        <g strokeWidth={0.4}>
          <circle cx="120" cy="150" r="50" />
          {Array.from({ length: 40 }).map((_, i) => {
            const a = (Math.PI / 40) * i + Math.PI;
            const r1 = 12;
            const r2 = 50;
            return (
              <line
                key={i}
                x1={120 + Math.cos(a) * r1}
                y1={150 + Math.sin(a) * r1 * -1 + 12}
                x2={120 + Math.cos(a) * r2}
                y2={150 + Math.sin(a) * r2 * -1 + 12}
              />
            );
          })}
        </g>
        <g fill="currentColor">
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (Math.PI * 2 * i) / 24;
            return (
              <circle
                key={i}
                cx={120 + Math.cos(a) * 78}
                cy={100 + Math.sin(a) * 78}
                r={0.6}
                opacity={0.45}
              />
            );
          })}
        </g>
      </svg>
    );
  }

  if (variant === "fan") {
    return (
      <svg
        viewBox="0 0 240 120"
        width={size}
        height={size / 2}
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.5}
        aria-hidden="true"
      >
        <g>
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (Math.PI / 36) * i + Math.PI;
            return (
              <line
                key={i}
                x1={120}
                y1={110}
                x2={120 + Math.cos(a) * 100}
                y2={110 + Math.sin(a) * 100}
              />
            );
          })}
        </g>
        <path d="M 20 110 A 100 100 0 0 1 220 110" />
      </svg>
    );
  }

  if (variant === "seed") {
    const cx = 120;
    const cy = 120;
    const r = 40;
    return (
      <svg
        viewBox="0 0 240 240"
        width={size}
        height={size}
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.6}
        aria-hidden="true"
      >
        <circle cx={cx} cy={cy} r={r} />
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (Math.PI * 2 * i) / 6;
          return (
            <circle
              key={i}
              cx={cx + Math.cos(a) * r}
              cy={cy + Math.sin(a) * r}
              r={r}
            />
          );
        })}
        <circle cx={cx} cy={cy} r={r * 2} opacity={0.4} />
      </svg>
    );
  }

  // dotline — small horizontal ornament: dot · line · dot
  return (
    <svg
      viewBox="0 0 240 12"
      width={size}
      height={12}
      className={className}
      stroke="currentColor"
      strokeWidth={0.6}
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="40" cy="6" r="1.5" />
      <line x1="56" y1="6" x2="184" y2="6" strokeWidth={0.5} />
      <circle cx="200" cy="6" r="1.5" />
    </svg>
  );
}
