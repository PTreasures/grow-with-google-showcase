import { Gauge } from "lucide-react";

interface EnergyScoreCardProps {
  score: number;
  baselineLabel: string;
}

function scoreStatus(score: number): { color: string; label: string } {
  if (score >= 80) return { color: "var(--status-good)", label: "Better than baseline" };
  if (score >= 50) return { color: "var(--status-warning)", label: "Room to improve" };
  return { color: "var(--status-critical)", label: "High usage" };
}

export function EnergyScoreCard({ score, baselineLabel }: EnergyScoreCardProps) {
  const status = scoreStatus(score);
  return (
    <div className="card score-card">
      <Gauge size={20} strokeWidth={1.75} color="var(--text-muted)" />
      <div className="score-value" style={{ color: status.color }}>
        {score}
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
