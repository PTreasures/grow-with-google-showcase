import { NavLink, useLocation } from "react-router-dom";
import { Flame, Gauge, SlidersHorizontal } from "lucide-react";
import { BASELINE_PROFILES } from "../data/appliances";
import type { ThemePreference } from "../lib/theme";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { to: "/simulator", label: "Simulator", icon: SlidersHorizontal },
  { to: "/score", label: "Score", icon: Gauge },
  { to: "/hogs", label: "Energy Hogs", icon: Flame },
];

interface TopBarProps {
  baselineId: string;
  onBaselineChange: (id: string) => void;
  theme: ThemePreference;
  onThemeChange: (value: ThemePreference) => void;
}

export function TopBar({ baselineId, onBaselineChange, theme, onThemeChange }: TopBarProps) {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <header className="top-bar">
      <div className="top-bar-row">
        <NavLink to="/" className={onHome ? "brand active" : "brand"}>
          <img src="/favicon.svg" alt="" className="brand-logo" width={20} height={19} />
          Tenant Power Tracker
        </NavLink>

        <nav className="nav-bar" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                <Icon size={16} strokeWidth={1.75} />
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
