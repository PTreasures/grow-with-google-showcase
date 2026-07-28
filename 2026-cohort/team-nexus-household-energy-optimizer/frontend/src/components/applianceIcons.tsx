import {
  Package,
  Refrigerator,
  Thermometer,
  Tv,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";
import type { ApplianceCategory } from "../types";

const APPLIANCE_ICONS: Record<ApplianceCategory, LucideIcon> = {
  hvac: Thermometer,
  fridge: Refrigerator,
  laundry: WashingMachine,
  entertainment: Tv,
};

/** Custom (user-added) appliances fall back to a generic device icon. */
export function getApplianceIcon(id: string): LucideIcon {
  return (APPLIANCE_ICONS as Record<string, LucideIcon>)[id] ?? Package;
}
