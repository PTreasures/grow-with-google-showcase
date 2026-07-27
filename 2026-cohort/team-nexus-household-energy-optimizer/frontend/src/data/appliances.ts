export type ApplianceCategory = "hvac" | "fridge" | "laundry" | "entertainment";

export interface Appliance {
  /** One of the four built-in categories, or a generated id for a user-added appliance. */
  id: string;
  label: string;
  watts: number;
  defaultHours: number;
  minHours: number;
  maxHours: number;
  tip: string;
  custom?: boolean;
}

/**
 * Placeholder wattage and default-hour figures modeled loosely on EIA.gov
 * appliance benchmarks. Swap for the cleaned dataset once Data has it ready.
 */
export const APPLIANCES: Appliance[] = [
  {
    id: "hvac",
    label: "HVAC (heating / cooling)",
    watts: 3000,
    defaultHours: 7,
    minHours: 0,
    maxHours: 24,
    tip: "Shift your thermostat 2 degrees toward the outdoor temperature to trim cooling and heating load.",
  },
  {
    id: "fridge",
    label: "Refrigerator",
    watts: 150,
    defaultHours: 24,
    minHours: 0,
    maxHours: 24,
    tip: "Keep the fridge coils clear and set the temperature to 37 to 40 degrees Fahrenheit, colder wastes energy.",
  },
  {
    id: "laundry",
    label: "Laundry (washer + dryer)",
    watts: 1800,
    defaultHours: 1,
    minHours: 0,
    maxHours: 24,
    tip: "Wash full loads on cold and air-dry when possible, the dryer's heating element is the biggest draw.",
  },
  {
    id: "entertainment",
    label: "Entertainment (TV, consoles, streaming devices)",
    watts: 250,
    defaultHours: 4,
    minHours: 0,
    maxHours: 24,
    tip: "Use a smart power strip to cut standby draw on consoles and streaming boxes when they're idle.",
  },
];

export interface BaselineProfile {
  id: string;
  label: string;
  monthlyKwh: number;
}

/**
 * Sample regional baselines, standing in for the Kaggle-benchmarked
 * profiles until the Data track hands off the real dataset.
 */
export const BASELINE_PROFILES: BaselineProfile[] = [
  { id: "studio", label: "Studio", monthlyKwh: 400 },
  { id: "1-bed-apartment", label: "1-bedroom apartment", monthlyKwh: 540 },
  { id: "2-bed-apartment", label: "2-bedroom apartment", monthlyKwh: 780 },
  { id: "3-bed-house", label: "3-bedroom house", monthlyKwh: 1080 },
  { id: "4-bed-house", label: "4+ bedroom house", monthlyKwh: 1400 },
];

export const UTILITY_RATE_PER_KWH = 0.16;
export const CARBON_LBS_PER_KWH = 0.855;
