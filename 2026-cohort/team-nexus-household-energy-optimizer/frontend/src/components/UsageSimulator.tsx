import { APPLIANCES } from "../data/appliances";
import type { HoursByCategory } from "../lib/calculations";
import { APPLIANCE_ICONS } from "./applianceIcons";

interface UsageSimulatorProps {
  hours: HoursByCategory;
  onChange: (category: keyof HoursByCategory, hours: number) => void;
}

export function UsageSimulator({ hours, onChange }: UsageSimulatorProps) {
  return (
    <div className="card">
      <div className="card-title">Usage simulator</div>
      <p className="card-subtitle">
        Drag each slider to match how many hours a day you actually run it. Zero and 24 hour
        edges are both safe to try.
      </p>
      {APPLIANCES.map((appliance) => {
        const Icon = APPLIANCE_ICONS[appliance.id];
        const value = hours[appliance.id];
        return (
          <div className="slider-row" key={appliance.id}>
            <div className="slider-row-head">
              <Icon className="slider-row-icon" size={18} strokeWidth={1.75} />
              <span className="slider-row-label">{appliance.label}</span>
              <span className="slider-row-value">{value.toFixed(0)} hrs/day</span>
            </div>
            <input
              type="range"
              min={appliance.minHours}
              max={appliance.maxHours}
              step={1}
              value={value}
              aria-label={`${appliance.label} hours per day`}
              onChange={(event) => onChange(appliance.id, Number(event.target.value))}
            />
          </div>
        );
      })}
    </div>
  );
}
