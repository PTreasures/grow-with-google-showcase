import { scoreStatus } from "../lib/scoreStatus";

interface MiniScoreCardProps {
  score: number;
  baselineLabel: string;
}

/** Compact score recap shown in the sticky sidebar once the full score banner scrolls out of view. */
export function MiniScoreCard({ score, baselineLabel }: MiniScoreCardProps) {
  const status = scoreStatus(score);

  return (
    <div className="card mini-score-card">
      <span className="mini-score-value" style={{ color: status.color }}>
        {score}
      </span>
      <div className="mini-score-text">
        <div className="mini-score-label">Energy Score</div>
        <div className="mini-score-sub">vs {baselineLabel}</div>
      </div>
      <span
        className="score-badge mini-score-badge"
        style={{
          color: status.color,
          background: `color-mix(in srgb, ${status.color} 14%, transparent)`,
        }}
      >
        {status.label}
      </span>
    </div>
  );
}
