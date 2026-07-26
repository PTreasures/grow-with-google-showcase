import { Link, useOutletContext } from "react-router-dom";
import { DollarSign, Flame, Gauge, Leaf, SlidersHorizontal, Zap } from "lucide-react";
import type { EnergyContext } from "../context";
import { buildDelta, formatCurrency, formatKwh } from "../lib/calculations";
import { EnergyScoreCard } from "../components/EnergyScoreCard";
import { StatTile } from "../components/StatTile";

const STEPS = [
  {
    to: "/simulator",
    icon: SlidersHorizontal,
    title: "1. Simulate your usage",
    body: "Drag sliders for HVAC, fridge, laundry, and entertainment to match your real routine.",
  },
  {
    to: "/score",
    icon: Gauge,
    title: "2. See your score",
    body: "Get a Personalized Energy Score against a household baseline, plus your cost, usage, and carbon footprint.",
  },
  {
    to: "/hogs",
    icon: Flame,
    title: "3. Fix your energy hogs",
    body: "See your three biggest draws and a tailored tip to cut each one down.",
  },
];

export function Home() {
  const {
    score,
    baselineProfile,
    userCost,
    defaultCost,
    userKwh,
    defaultKwh,
    carbonLbs,
    defaultCarbonLbs,
  } = useOutletContext<EnergyContext>();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Tenant Power Tracker &amp; Savings Predictor</h1>
        <p className="page-subtitle">
          Estimate your monthly energy footprint from appliance usage, no smart meter required,
          and find out where your money and carbon footprint are actually going.
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

      <div className="section-label">How it works</div>
      <div className="how-it-works">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <Link to={step.to} className="card step-card" key={step.to}>
              <span className="step-icon">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <div className="step-title">{step.title}</div>
              <p className="step-body">{step.body}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
