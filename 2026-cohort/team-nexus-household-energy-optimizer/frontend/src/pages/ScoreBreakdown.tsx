import { useOutletContext } from "react-router-dom";
import { DollarSign, Leaf, Zap } from "lucide-react";
import type { EnergyContext } from "../context";
import { buildDelta, formatCurrency, formatKwh } from "../lib/calculations";
import { EnergyScoreCard } from "../components/EnergyScoreCard";
import { StatTile } from "../components/StatTile";
import { UsageBreakdownBar } from "../components/UsageBreakdownBar";

export function ScoreBreakdown() {
  const {
    score,
    baselineProfile,
    userCost,
    defaultCost,
    userKwh,
    defaultKwh,
    carbonLbs,
    defaultCarbonLbs,
    userBreakdown,
  } = useOutletContext<EnergyContext>();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Score &amp; breakdown</h1>
        <p className="page-subtitle">
          Your Personalized Energy Score compares your simulated usage against a regional
          household baseline.
        </p>
      </div>

      <div className="stat-grid">
        <EnergyScoreCard score={score} baselineLabel={baselineProfile.label} />
        <StatTile
          icon={DollarSign}
          label="Monthly cost"
          value={formatCurrency(userCost)}
          delta={buildDelta(userCost, defaultCost, formatCurrency)}
        />
        <StatTile
          icon={Zap}
          label="Monthly usage"
          value={formatKwh(userKwh)}
          delta={buildDelta(userKwh, defaultKwh, formatKwh)}
        />
        <StatTile
          icon={Leaf}
          label="Carbon footprint"
          value={`${carbonLbs.toFixed(0)} lbs CO2`}
          delta={buildDelta(carbonLbs, defaultCarbonLbs, (v) => `${v.toFixed(0)} lbs`)}
        />
      </div>

      <UsageBreakdownBar breakdown={userBreakdown} />
    </div>
  );
}
