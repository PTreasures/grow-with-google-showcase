import type { LucideIcon } from "lucide-react";

interface StatTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function StatTile({ icon: Icon, label, value }: StatTileProps) {
  return (
    <div className="card stat-tile">
      <Icon className="stat-icon" size={20} strokeWidth={1.75} />
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
