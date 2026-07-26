import { useOutletContext } from "react-router-dom";
import type { EnergyContext } from "../context";
import { UsageSimulator } from "../components/UsageSimulator";
import { SavingsChart } from "../components/SavingsChart";
import { ScoreSummaryBar } from "../components/ScoreSummaryBar";

export function Simulator() {
  const { hours, onHoursChange, defaultCost, userCost, score, baselineProfile } =
    useOutletContext<EnergyContext>();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Usage simulator</h1>
        <p className="page-subtitle">
          Adjust hours per day for each appliance category and watch your monthly cost update
          live.
        </p>
      </div>

      <ScoreSummaryBar score={score} baselineLabel={baselineProfile.label} />

      <div className="main-grid">
        <UsageSimulator hours={hours} onChange={onHoursChange} />
        <SavingsChart defaultCost={defaultCost} simulatedCost={userCost} />
      </div>
    </div>
  );
}
