import type { ApplianceCategory } from "../data/appliances";

const CATEGORY_COLORS: Record<ApplianceCategory, string> = {
  hvac: "var(--series-blue)",
  fridge: "var(--series-green)",
  laundry: "var(--series-magenta)",
  entertainment: "var(--series-yellow)",
};

/** Custom (user-added) appliances all share one neutral color, distinguished by their direct labels. */
const CUSTOM_COLOR = "var(--text-secondary)";

export function getCategoryColor(id: string): string {
  return (CATEGORY_COLORS as Record<string, string>)[id] ?? CUSTOM_COLOR;
}
