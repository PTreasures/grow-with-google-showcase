import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Appliance } from "../data/appliances";
import type { HoursByCategory } from "../lib/calculations";
import type { NewApplianceInput } from "../context";
import { getApplianceIcon } from "./applianceIcons";

interface UsageSimulatorProps {
  hours: HoursByCategory;
  onChange: (id: string, hours: number) => void;
  appliances: Appliance[];
  onAddAppliance: (input: NewApplianceInput) => void;
  onRemoveAppliance: (id: string) => void;
  onUpdateWatts: (id: string, watts: number) => void;
}

interface ApplianceRowProps {
  appliance: Appliance;
  hours: number;
  onChange: (id: string, hours: number) => void;
  onRemove: (id: string) => void;
  onUpdateWatts: (id: string, watts: number) => void;
}

function ApplianceRow({ appliance, hours, onChange, onRemove, onUpdateWatts }: ApplianceRowProps) {
  const Icon = getApplianceIcon(appliance.id);
  const [wattsInput, setWattsInput] = useState(String(appliance.watts));

  function commitWatts() {
    const parsed = Number(wattsInput);
    if (Number.isFinite(parsed) && parsed > 0) {
      const clamped = Math.min(10000, Math.max(1, Math.round(parsed)));
      onUpdateWatts(appliance.id, clamped);
      setWattsInput(String(clamped));
    } else {
      setWattsInput(String(appliance.watts));
    }
  }

  return (
    <div className="slider-row">
      <div className="slider-row-head">
        <Icon className="slider-row-icon" size={18} strokeWidth={1.75} />
        <span className="slider-row-label">{appliance.label}</span>
        <span className="watts-field">
          <input
            type="number"
            className="watts-input"
            min={1}
            max={10000}
            value={wattsInput}
            onChange={(event) => setWattsInput(event.target.value)}
            onBlur={commitWatts}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.currentTarget.blur();
            }}
            aria-label={`${appliance.label} wattage`}
          />
          <span className="watts-unit">W</span>
        </span>
        <span className="slider-row-value">{hours.toFixed(0)} hrs/day</span>
        <button
          type="button"
          className="slider-row-remove"
          aria-label={`Remove ${appliance.label}`}
          onClick={() => onRemove(appliance.id)}
        >
          <Trash2 size={15} strokeWidth={1.75} />
        </button>
      </div>
      <input
        type="range"
        min={appliance.minHours}
        max={appliance.maxHours}
        step={1}
        value={hours}
        aria-label={`${appliance.label} hours per day`}
        onChange={(event) => onChange(appliance.id, Number(event.target.value))}
      />
    </div>
  );
}

export function UsageSimulator({
  hours,
  onChange,
  appliances,
  onAddAppliance,
  onRemoveAppliance,
  onUpdateWatts,
}: UsageSimulatorProps) {
  const [newLabel, setNewLabel] = useState("");
  const [newWatts, setNewWatts] = useState("");

  const watts = Number(newWatts);
  const canAdd = newLabel.trim().length > 0 && watts > 0 && watts <= 10000;

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!canAdd) return;
    onAddAppliance({ label: newLabel.trim(), watts });
    setNewLabel("");
    setNewWatts("");
  }

  return (
    <div className="card">
      <div className="card-title">Usage simulator</div>
      <p className="card-subtitle">
        Drag each slider to match how many hours a day you actually run it, and correct the
        wattage if your appliance draws differently. Remove anything you don't have.
      </p>
      {appliances.length === 0 && (
        <p className="muted-note">Nothing here yet, add an appliance below to get started.</p>
      )}
      {appliances.map((appliance) => (
        <ApplianceRow
          key={appliance.id}
          appliance={appliance}
          hours={hours[appliance.id] ?? appliance.defaultHours}
          onChange={onChange}
          onRemove={onRemoveAppliance}
          onUpdateWatts={onUpdateWatts}
        />
      ))}

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
