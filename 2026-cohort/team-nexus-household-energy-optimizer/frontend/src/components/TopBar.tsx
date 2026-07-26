import { NavLink } from "react-router-dom";
import { Flame, Gauge, Home, SlidersHorizontal, Zap } from "lucide-react";
import { BASELINE_PROFILES } from "../data/appliances";
import type { ThemePreference } from "../lib/theme";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/simulator", label: "Simulator", icon: SlidersHorizontal, end: false },
  { to: "/score", label: "Score & Breakdown", icon: Gauge, end: false },
  { to: "/hogs", label: "Energy Hogs", icon: Flame, end: false },
];

interface TopBarProps {
  baselineId: string;
  onBaselineChange: (id: string) => void;
  theme: ThemePreference;
  onThemeChange: (value: ThemePreference) => void;
}

export function TopBar({ baselineId, onBaselineChange, theme, onThemeChange }: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar-row">
        <NavLink to="/" className="brand">
          <Zap size={18} strokeWidth={2} />
          Tenant Power Tracker
        </NavLink>

        <nav className="nav-bar" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                <Icon size={15} strokeWidth={1.75} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="top-bar-controls">
          <select
            className="select select-compact"
            aria-label="Household profile"
            value={baselineId}
            onChange={(event) => onBaselineChange(event.target.value)}
          >
            {BASELINE_PROFILES.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.label}
              </option>
            ))}
          </select>
          <ThemeToggle value={theme} onChange={onThemeChange} />
        </div>
      </div>
    </header>
  );
}
