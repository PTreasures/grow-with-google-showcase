import { Refrigerator, Thermometer, Tv, WashingMachine, type LucideIcon } from "lucide-react";
import type { ApplianceCategory } from "../data/appliances";

export const APPLIANCE_ICONS: Record<ApplianceCategory, LucideIcon> = {
  hvac: Thermometer,
  fridge: Refrigerator,
  laundry: WashingMachine,
  entertainment: Tv,
};
