import type { ApplianceBreakdown } from "../lib/calculations";
import { formatCurrency, formatKwh } from "../lib/calculations";
import { APPLIANCE_ICONS } from "./applianceIcons";

interface TopHogsCardProps {
  hogs: ApplianceBreakdown[];
}

export function TopHogsCard({ hogs }: TopHogsCardProps) {
  return (
    <div className="card">
      <div className="card-title">Top energy hogs</div>
      <p className="card-subtitle">Your three biggest draws, with a tip for each.</p>
      <ol className="hog-list">
        {hogs.map((hog, index) => {
          const Icon = APPLIANCE_ICONS[hog.appliance.id];
          return (
            <li className="hog-item" key={hog.appliance.id}>
              <span className="hog-rank">{index + 1}</span>
              <div className="hog-body">
                <div className="hog-name-row">
                  <span className="hog-name">
                    <Icon size={14} strokeWidth={1.75} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                    {hog.appliance.label}
                  </span>
                  <span className="hog-metric">
                    {formatKwh(hog.kwh)} / {formatCurrency(hog.cost)}
                  </span>
                </div>
                <p className="hog-tip">{hog.appliance.tip}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
