import type { ApplianceBreakdown } from "../lib/calculations";
import { formatCurrency, formatKwh } from "../lib/calculations";
import { CATEGORY_COLORS } from "../lib/categoryColors";
import { APPLIANCE_ICONS } from "./applianceIcons";

interface TopHogsCardProps {
  hogs: ApplianceBreakdown[];
}

export function TopHogsCard({ hogs }: TopHogsCardProps) {
  return (
    <div className="hogs-grid">
      {hogs.map((hog, index) => {
        const Icon = APPLIANCE_ICONS[hog.appliance.id];
        const color = CATEGORY_COLORS[hog.appliance.id];
        return (
          <div className="card hog-card" key={hog.appliance.id}>
            <div className="hog-card-top">
              <span className="hog-rank">{index + 1}</span>
              <span
                className="hog-card-icon"
                style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
              >
                <Icon size={18} strokeWidth={1.75} />
              </span>
            </div>
            <div className="hog-card-name">{hog.appliance.label}</div>
            <div className="hog-card-metric">
              {formatKwh(hog.kwh)} &middot; {formatCurrency(hog.cost)}/mo
            </div>
            <p className="hog-card-tip">{hog.appliance.tip}</p>
          </div>
        );
      })}
    </div>
  );
}
