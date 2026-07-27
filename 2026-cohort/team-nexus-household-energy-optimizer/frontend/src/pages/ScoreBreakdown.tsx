import { Link, useOutletContext } from "react-router-dom";
import { DollarSign, Leaf, Printer, SlidersHorizontal, Zap } from "lucide-react";
import type { EnergyContext } from "../context";
import { buildDelta, formatKwh } from "../lib/calculations";
import { EnergyScoreCard } from "../components/EnergyScoreCard";
import { StatTile } from "../components/StatTile";
import { UsageBreakdownBar } from "../components/UsageBreakdownBar";

export function ScoreBreakdown() {
  const {
    score,
    baselineProfile,
    region,
    formatCost,
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
      <div className="page-header page-header-actions">
        <div>
          <h1>Score &amp; breakdown</h1>
          <p className="page-subtitle">
            Your Personalized Energy Score compares your simulated usage against a regional
            household baseline, using {region.label} utility rates and grid mix.
          </p>
        </div>
        <div className="page-header-buttons">
          <button type="button" className="btn btn-secondary no-print" onClick={() => window.print()}>
            <Printer size={15} strokeWidth={2} />
            Print / Save as PDF
          </button>
          <Link to="/simulator" className="btn btn-secondary">
            <SlidersHorizontal size={15} strokeWidth={2} />
            Continue simulating
          </Link>
        </div>
      </div>

      <div className="stat-grid">
        <EnergyScoreCard score={score} baselineLabel={baselineProfile.label} />
        <StatTile
          icon={DollarSign}
          label="Monthly cost"
          value={formatCost(userCost)}
          delta={buildDelta(userCost, defaultCost, formatCost)}
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
