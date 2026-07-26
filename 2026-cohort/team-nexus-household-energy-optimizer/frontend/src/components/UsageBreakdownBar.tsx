import type { ApplianceBreakdown } from "../lib/calculations";
import { CATEGORY_COLORS } from "../lib/categoryColors";

interface UsageBreakdownBarProps {
  breakdown: ApplianceBreakdown[];
}

export function UsageBreakdownBar({ breakdown }: UsageBreakdownBarProps) {
  const total = breakdown.reduce((sum, item) => sum + item.kwh, 0);

  return (
    <div className="card">
      <div className="card-title">Usage breakdown</div>
      <p className="card-subtitle">Share of your total monthly kWh by category.</p>
      <div className="breakdown-bar">
        {breakdown.map((item) => {
          const share = total > 0 ? item.kwh / total : 0;
          if (share <= 0) return null;
          return (
            <div
              key={item.appliance.id}
              className="breakdown-segment"
              style={{ width: `${share * 100}%`, background: CATEGORY_COLORS[item.appliance.id] }}
              title={`${item.appliance.label}: ${Math.round(share * 100)}%`}
            />
          );
        })}
      </div>
      <div className="breakdown-legend">
        {breakdown.map((item) => {
          const share = total > 0 ? item.kwh / total : 0;
          return (
            <div className="legend-item" key={item.appliance.id}>
              <span className="legend-swatch" style={{ background: CATEGORY_COLORS[item.appliance.id] }} />
              {item.appliance.label.split(" (")[0]}
              <span className="breakdown-pct">{Math.round(share * 100)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
