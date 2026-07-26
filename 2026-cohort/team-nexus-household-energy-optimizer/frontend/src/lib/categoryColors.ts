import type { ApplianceCategory } from "../data/appliances";

export const CATEGORY_COLORS: Record<ApplianceCategory, string> = {
  hvac: "var(--series-blue)",
  fridge: "var(--series-green)",
  laundry: "var(--series-magenta)",
  entertainment: "var(--series-yellow)",
};
