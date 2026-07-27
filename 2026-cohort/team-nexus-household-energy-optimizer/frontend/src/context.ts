import type { Appliance, BaselineProfile } from "./data/appliances";
import type { Region } from "./data/regions";
import type { ApplianceBreakdown, HoursByCategory } from "./lib/calculations";

export interface NewApplianceInput {
  label: string;
  watts: number;
}

export interface EnergyContext {
  hours: HoursByCategory;
  onHoursChange: (id: string, hours: number) => void;
  baselineProfile: BaselineProfile;
  region: Region;
  /** Formats a number as currency in the selected region's local currency and locale. */
  formatCost: (value: number) => string;
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
  /** The full live list, built-in and user-added alike, all editable and removable. */
  appliances: Appliance[];
  onAddAppliance: (input: NewApplianceInput) => void;
  onRemoveAppliance: (id: string) => void;
  onUpdateWatts: (id: string, watts: number) => void;
}
