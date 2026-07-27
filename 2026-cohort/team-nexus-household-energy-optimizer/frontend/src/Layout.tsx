import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { APPLIANCES, BASELINE_PROFILES, type Appliance } from "./data/appliances";
import { REGIONS } from "./data/regions";
import {
  buildBreakdown,
  buildDefaultHours,
  energyScore,
  formatCurrency,
  monthlyCarbonLbs,
  topEnergyHogs,
  totalKwh,
  type HoursByCategory,
} from "./lib/calculations";
import { applyTheme, getStoredTheme, type ThemePreference } from "./lib/theme";
import { applyTextSize, getStoredTextSize, type TextSizePreference } from "./lib/textSize";
import { speak, stopSpeaking } from "./lib/readAloud";
import { TopBar } from "./components/TopBar";
import { Footer } from "./components/Footer";
import { PrintableReport } from "./components/PrintableReport";
import { AccessibilityPanel } from "./components/AccessibilityPanel";
import type { EnergyContext, NewApplianceInput } from "./context";

let customApplianceSeq = 0;

export function Layout() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<ThemePreference>(() => getStoredTheme());
  const [textSize, setTextSize] = useState<TextSizePreference>(() => getStoredTextSize());
  const [a11yOpen, setA11yOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [baselineId, setBaselineId] = useState(
    BASELINE_PROFILES.find((profile) => profile.id === "1-bed-apartment")?.id ??
      BASELINE_PROFILES[0].id,
  );
  const [regionId, setRegionId] = useState(REGIONS[0].id);
  const [appliances, setAppliances] = useState<Appliance[]>(APPLIANCES);
  const [hours, setHours] = useState<HoursByCategory>(() => buildDefaultHours(APPLIANCES));

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyTextSize(textSize);
  }, [textSize]);

  useEffect(() => {
    stopSpeaking();
    setIsReading(false);
  }, [pathname]);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  const baselineProfile =
    BASELINE_PROFILES.find((profile) => profile.id === baselineId) ?? BASELINE_PROFILES[0];
  const region = REGIONS.find((candidate) => candidate.id === regionId) ?? REGIONS[0];

  const defaultBreakdown = useMemo(
    () => buildBreakdown(buildDefaultHours(appliances), appliances, region.ratePerKwh),
    [appliances, region.ratePerKwh],
  );
  const userBreakdown = useMemo(
    () => buildBreakdown(hours, appliances, region.ratePerKwh),
    [hours, appliances, region.ratePerKwh],
  );

  const defaultCost = defaultBreakdown.reduce((sum, item) => sum + item.cost, 0);
  const userCost = userBreakdown.reduce((sum, item) => sum + item.cost, 0);
  const defaultKwh = totalKwh(defaultBreakdown);
  const userKwh = totalKwh(userBreakdown);
  const defaultCarbonLbs = monthlyCarbonLbs(defaultKwh, region.carbonLbsPerKwh);
  const carbonLbs = monthlyCarbonLbs(userKwh, region.carbonLbsPerKwh);
  const score = energyScore(userKwh, baselineProfile.monthlyKwh);
  const hogs = topEnergyHogs(userBreakdown, 3);

  function formatCost(value: number): string {
    return formatCurrency(value, region.currency, region.locale);
  }

  function handleHoursChange(id: string, value: number) {
    setHours((prev) => ({ ...prev, [id]: value }));
  }

  function handleAddAppliance(input: NewApplianceInput) {
    customApplianceSeq += 1;
    const id = `custom-${customApplianceSeq}`;
    const appliance: Appliance = {
      id,
      label: input.label,
      watts: input.watts,
      defaultHours: 1,
      minHours: 0,
      maxHours: 24,
      tip: "Consider cutting its hours or unplugging it when idle, every hour off is a direct saving.",
    };
    setAppliances((prev) => [...prev, appliance]);
    setHours((prev) => ({ ...prev, [id]: 1 }));
  }

  function handleRemoveAppliance(id: string) {
    setAppliances((prev) => prev.filter((appliance) => appliance.id !== id));
    setHours((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function handleUpdateWatts(id: string, watts: number) {
    setAppliances((prev) =>
      prev.map((appliance) => (appliance.id === id ? { ...appliance, watts } : appliance)),
    );
  }

  function handleReadAloud() {
    const text = document.querySelector<HTMLElement>(".page-content")?.innerText ?? "";
    setIsReading(true);
    speak(text, () => setIsReading(false));
  }

  function handleStopReading() {
    stopSpeaking();
    setIsReading(false);
  }

  const context: EnergyContext = {
    hours,
    onHoursChange: handleHoursChange,
    baselineProfile,
    region,
    formatCost,
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
    appliances,
    onAddAppliance: handleAddAppliance,
    onRemoveAppliance: handleRemoveAppliance,
    onUpdateWatts: handleUpdateWatts,
  };

  return (
    <div className="app-shell">
      <div className="a11y-zoom-scope">
        <TopBar
          baselineId={baselineId}
          onBaselineChange={setBaselineId}
          regionId={regionId}
          onRegionChange={setRegionId}
          theme={theme}
          onThemeChange={setTheme}
          textSize={textSize}
          onTextSizeChange={setTextSize}
          isReading={isReading}
          onReadAloud={handleReadAloud}
          onStopReading={handleStopReading}
          a11yOpen={a11yOpen}
          onA11yOpenChange={setA11yOpen}
        />
        <main className="page-content">
          <Outlet context={context} />
        </main>
        <Footer />
        <PrintableReport
          score={score}
          baselineLabel={baselineProfile.label}
          regionLabel={region.label}
          formatCost={formatCost}
          userCost={userCost}
          userKwh={userKwh}
          carbonLbs={carbonLbs}
          userBreakdown={userBreakdown}
          hogs={hogs}
        />
      </div>
      <AccessibilityPanel
        open={a11yOpen}
        onClose={() => setA11yOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
        textSize={textSize}
        onTextSizeChange={setTextSize}
        isReading={isReading}
        onReadAloud={handleReadAloud}
        onStopReading={handleStopReading}
      />
    </div>
  );
}
