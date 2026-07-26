import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { BASELINE_PROFILES } from "./data/appliances";
import {
  DEFAULT_HOURS,
  buildBreakdown,
  energyScore,
  monthlyCarbonLbs,
  topEnergyHogs,
  totalKwh,
  type HoursByCategory,
} from "./lib/calculations";
import { applyTheme, getStoredTheme, type ThemePreference } from "./lib/theme";
import { TopBar } from "./components/TopBar";
import { Footer } from "./components/Footer";
import type { EnergyContext } from "./context";

export function Layout() {
  const [theme, setTheme] = useState<ThemePreference>(() => getStoredTheme());
  const [baselineId, setBaselineId] = useState(BASELINE_PROFILES[0].id);
  const [hours, setHours] = useState<HoursByCategory>(DEFAULT_HOURS);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const baselineProfile =
    BASELINE_PROFILES.find((profile) => profile.id === baselineId) ?? BASELINE_PROFILES[0];

  const defaultBreakdown = useMemo(() => buildBreakdown(DEFAULT_HOURS), []);
  const userBreakdown = useMemo(() => buildBreakdown(hours), [hours]);

  const defaultCost = defaultBreakdown.reduce((sum, item) => sum + item.cost, 0);
  const userCost = userBreakdown.reduce((sum, item) => sum + item.cost, 0);
  const defaultKwh = totalKwh(defaultBreakdown);
  const userKwh = totalKwh(userBreakdown);
  const defaultCarbonLbs = monthlyCarbonLbs(defaultKwh);
  const carbonLbs = monthlyCarbonLbs(userKwh);
  const score = energyScore(userKwh, baselineProfile.monthlyKwh);
  const hogs = topEnergyHogs(userBreakdown, 3);

  function handleHoursChange(category: keyof HoursByCategory, value: number) {
    setHours((prev) => ({ ...prev, [category]: value }));
  }

  const context: EnergyContext = {
    hours,
    onHoursChange: handleHoursChange,
    baselineProfile,
    defaultBreakdown,
    userBreakdown,
    defaultCost,
    userCost,
    defaultKwh,
    userKwh,
    defaultCarbonLbs,
    carbonLbs,
    score,
    hogs,
  };

  return (
    <div className="app-shell">
      <TopBar
        baselineId={baselineId}
        onBaselineChange={setBaselineId}
        theme={theme}
        onThemeChange={setTheme}
      />
      <main className="page-content">
        <Outlet context={context} />
      </main>
      <Footer />
    </div>
  );
}
