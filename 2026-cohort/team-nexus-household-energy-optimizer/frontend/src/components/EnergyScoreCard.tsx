interface EnergyScoreCardProps {
  score: number;
  baselineLabel: string;
}

function scoreStatus(score: number): { color: string; label: string } {
  if (score >= 80) return { color: "var(--status-good)", label: "Better than baseline" };
  if (score >= 50) return { color: "var(--status-warning)", label: "Room to improve" };
  return { color: "var(--status-critical)", label: "High usage" };
}

const SIZE = 116;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function EnergyScoreCard({ score, baselineLabel }: EnergyScoreCardProps) {
  const status = scoreStatus(score);
  const filled = (Math.max(1, Math.min(100, score)) / 100) * CIRCUMFERENCE;

  return (
    <div className="card score-card">
      <div className="gauge" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={status.color}
            strokeOpacity={0.16}
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={status.color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </svg>
        <div className="gauge-value" style={{ color: status.color }}>
          {score}
        </div>
      </div>
      <div className="score-caption">Personalized Energy Score vs {baselineLabel}</div>
      <span
        className="score-badge"
        style={{ color: status.color, background: `color-mix(in srgb, ${status.color} 14%, transparent)` }}
      >
        {status.label}
      </span>
    </div>
  );
}
