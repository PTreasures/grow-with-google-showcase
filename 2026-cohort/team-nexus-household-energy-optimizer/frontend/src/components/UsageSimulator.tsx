import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { APPLIANCES, type Appliance } from "../data/appliances";
import type { HoursByCategory } from "../lib/calculations";
import type { NewApplianceInput } from "../context";
import { getApplianceIcon } from "./applianceIcons";

interface UsageSimulatorProps {
  hours: HoursByCategory;
  onChange: (id: string, hours: number) => void;
  customAppliances: Appliance[];
  onAddCustomAppliance: (input: NewApplianceInput) => void;
  onRemoveCustomAppliance: (id: string) => void;
}

export function UsageSimulator({
  hours,
  onChange,
  customAppliances,
  onAddCustomAppliance,
  onRemoveCustomAppliance,
}: UsageSimulatorProps) {
  const [newLabel, setNewLabel] = useState("");
  const [newWatts, setNewWatts] = useState("");

  const watts = Number(newWatts);
  const canAdd = newLabel.trim().length > 0 && watts > 0 && watts <= 10000;

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!canAdd) return;
    onAddCustomAppliance({ label: newLabel.trim(), watts });
    setNewLabel("");
    setNewWatts("");
  }

  const allAppliances = [...APPLIANCES, ...customAppliances];

  return (
    <div className="card">
      <div className="card-title">Usage simulator</div>
      <p className="card-subtitle">
        Drag each slider to match how many hours a day you actually run it. Zero and 24 hour
        edges are both safe to try.
      </p>
      {allAppliances.map((appliance) => {
        const Icon = getApplianceIcon(appliance.id);
        const value = hours[appliance.id] ?? appliance.defaultHours;
        return (
          <div className="slider-row" key={appliance.id}>
            <div className="slider-row-head">
              <Icon className="slider-row-icon" size={18} strokeWidth={1.75} />
              <span className="slider-row-label">{appliance.label}</span>
              <span className="slider-row-value">{value.toFixed(0)} hrs/day</span>
              {appliance.custom && (
                <button
                  type="button"
                  className="slider-row-remove"
                  aria-label={`Remove ${appliance.label}`}
                  onClick={() => onRemoveCustomAppliance(appliance.id)}
                >
                  <Trash2 size={15} strokeWidth={1.75} />
                </button>
              )}
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

      <form className="add-appliance-form" onSubmit={handleAdd}>
        <div className="add-appliance-fields">
          <input
            type="text"
            className="input add-appliance-name"
            placeholder="Appliance name (e.g. Space heater)"
            maxLength={40}
            value={newLabel}
            onChange={(event) => setNewLabel(event.target.value)}
            aria-label="New appliance name"
          />
          <input
            type="number"
            className="input add-appliance-watts"
            placeholder="Watts"
            min={1}
            max={10000}
            value={newWatts}
            onChange={(event) => setNewWatts(event.target.value)}
            aria-label="New appliance wattage"
          />
        </div>
        <button type="submit" className="btn btn-secondary" disabled={!canAdd}>
          <Plus size={15} strokeWidth={2} />
          Add appliance
        </button>
      </form>
    </div>
  );
}
