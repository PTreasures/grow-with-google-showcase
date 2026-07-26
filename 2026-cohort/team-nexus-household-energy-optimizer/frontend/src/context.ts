import type { BaselineProfile } from "./data/appliances";
import type { ApplianceBreakdown, HoursByCategory } from "./lib/calculations";

export interface EnergyContext {
  hours: HoursByCategory;
  onHoursChange: (category: keyof HoursByCategory, value: number) => void;
  baselineProfile: BaselineProfile;
  defaultBreakdown: ApplianceBreakdown[];
  userBreakdown: ApplianceBreakdown[];
  defaultCost: number;
  userCost: number;
  defaultKwh: number;
  userKwh: number;
  defaultCarbonLbs: number;
  carbonLbs: number;
  score: number;
  hogs: ApplianceBreakdown[];
}
