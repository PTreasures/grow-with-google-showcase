import { useMemo, useState } from "react";
import { DollarSign, Leaf, Zap } from "lucide-react";
import "./App.css";
import { APPLIANCES, BASELINE_PROFILES } from "./data/appliances";
import {
  buildBreakdown,
  energyScore,
  formatCurrency,
  formatKwh,
  monthlyCarbonLbs,
  topEnergyHogs,
  totalKwh,
  type HoursByCategory,
} from "./lib/calculations";
import { StatTile } from "./components/StatTile";
import { EnergyScoreCard } from "./components/EnergyScoreCard";
import { UsageSimulator } from "./components/UsageSimulator";
import { SavingsChart } from "./components/SavingsChart";
import { TopHogsCard } from "./components/TopHogsCard";

const DEFAULT_HOURS: HoursByCategory = APPLIANCES.reduce((acc, appliance) => {
  acc[appliance.id] = appliance.defaultHours;
  return acc;
}, {} as HoursByCategory);

function App() {
  const [baselineId, setBaselineId] = useState(BASELINE_PROFILES[0].id);
  const [hours, setHours] = useState<HoursByCategory>(DEFAULT_HOURS);

  const baselineProfile =
    BASELINE_PROFILES.find((profile) => profile.id === baselineId) ?? BASELINE_PROFILES[0];

  const defaultBreakdown = useMemo(() => buildBreakdown(DEFAULT_HOURS), []);
  const userBreakdown = useMemo(() => buildBreakdown(hours), [hours]);

  const defaultCost = defaultBreakdown.reduce((sum, item) => sum + item.cost, 0);
  const userCost = userBreakdown.reduce((sum, item) => sum + item.cost, 0);
  const userKwh = totalKwh(userBreakdown);
  const carbonLbs = monthlyCarbonLbs(userKwh);
  const score = energyScore(userKwh, baselineProfile.monthlyKwh);
  const hogs = topEnergyHogs(userBreakdown, 3);

  function handleHoursChange(category: keyof HoursByCategory, value: number) {
    setHours((prev) => ({ ...prev, [category]: value }));
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Tenant Power Tracker &amp; Savings Predictor</h1>
          <p className="app-subtitle">
            Estimate your monthly energy footprint from appliance usage, no smart meter
            required.
          </p>
        </div>
        <div>
          <label className="field-label" htmlFor="baseline-select">
            Household profile
          </label>
          <select
            id="baseline-select"
            className="select"
            value={baselineId}
            onChange={(event) => setBaselineId(event.target.value)}
          >
            {BASELINE_PROFILES.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="stat-grid">
        <EnergyScoreCard score={score} baselineLabel={baselineProfile.label} />
        <StatTile icon={DollarSign} label="Monthly cost" value={formatCurrency(userCost)} />
        <StatTile icon={Zap} label="Monthly usage" value={formatKwh(userKwh)} />
        <StatTile icon={Leaf} label="Carbon footprint" value={`${carbonLbs.toFixed(0)} lbs CO2`} />
      </div>

      <div className="main-grid">
        <UsageSimulator hours={hours} onChange={handleHoursChange} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SavingsChart defaultCost={defaultCost} simulatedCost={userCost} />
          <TopHogsCard hogs={hogs} />
        </div>
      </div>

      <footer className="app-footer">
        Figures are estimates benchmarked against sample EIA.gov and Kaggle usage data, not a
        live utility feed. No account, personal, or bill data is stored, everything here runs
        in this browser session only.
      </footer>
    </div>
  );
}

export default App;
