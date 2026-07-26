import { useOutletContext } from "react-router-dom";
import type { EnergyContext } from "../context";
import { TopHogsCard } from "../components/TopHogsCard";

export function EnergyHogs() {
  const { hogs } = useOutletContext<EnergyContext>();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Top energy hogs</h1>
        <p className="page-subtitle">
          Your three biggest monthly draws in your current scenario, with a tailored tip for
          each.
        </p>
      </div>
      <TopHogsCard hogs={hogs} />
    </div>
  );
}
