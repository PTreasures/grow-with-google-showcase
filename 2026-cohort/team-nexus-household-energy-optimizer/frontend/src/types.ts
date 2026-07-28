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
}

export interface BaselineProfile {
  id: string;
  label: string;
  monthlyKwh: number;
}

export interface Region {
  id: string;
  label: string;
  /** In the region's own local currency. */
  ratePerKwh: number;
  carbonLbsPerKwh: number;
  /** ISO 4217 currency code, used with locale to format cost via Intl.NumberFormat. */
  currency: string;
  /** BCP 47 locale for currency formatting. */
  locale: string;
}
