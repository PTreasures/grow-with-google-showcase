import { Link, useOutletContext } from "react-router-dom";
import { DollarSign, Flame, Gauge, Leaf, SlidersHorizontal, Zap } from "lucide-react";
import type { EnergyContext } from "../context";
import { buildDelta, formatCurrency, formatKwh } from "../lib/calculations";
import { EnergyScoreCard } from "../components/EnergyScoreCard";
import { StatTile } from "../components/StatTile";

const STEPS = [
  {
    to: "/simulator",
    num: "01",
    icon: SlidersHorizontal,
    title: "Simulate your usage",
    body: "Drag sliders for HVAC, fridge, laundry, and entertainment to match your real routine.",
  },
  {
    to: "/score",
    num: "02",
    icon: Gauge,
    title: "See your score",
    body: "Get a Personalized Energy Score against a household baseline, plus your cost, usage, and carbon footprint.",
  },
  {
    to: "/hogs",
    num: "03",
    icon: Flame,
    title: "Fix your energy hogs",
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
      <section className="hero">
        <img src="/favicon.svg" alt="" className="hero-logo" width={44} height={42} />
        <h1 className="hero-title">Know exactly where your energy dollars go.</h1>
        <p className="hero-subtitle">
          Tenant Power Tracker estimates your monthly energy footprint from appliance usage,
          no smart meter required, and shows you where your money and carbon footprint are
          actually going.
        </p>
        <div className="hero-actions">
          <Link to="/simulator" className="btn btn-primary">
            <Zap size={16} strokeWidth={2} />
            Open the simulator
          </Link>
          <Link to="/score" className="btn btn-secondary">
            See your score
          </Link>
        </div>
      </section>

      <div className="section-label">Your current snapshot</div>
      <p className="section-intro">
        Based on the default appliance schedule until you customize it in the simulator.
      </p>
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
      <p className="section-intro">Three steps to a clearer picture of your bill.</p>
      <div className="how-it-works">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <Link to={step.to} className="card step-card" key={step.to}>
              <div className="step-top">
                <span className="step-icon">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <span className="step-num">{step.num}</span>
              </div>
              <div className="step-title">{step.title}</div>
              <p className="step-body">{step.body}</p>
            </Link>
          );
        })}
      </div>

      <div className="narrative-card">
        <div className="narrative-eyebrow">Why it matters</div>
        <p className="narrative-text">
          Meet Alex, a tenant who noticed their laundry routine was quietly adding to their
          bill every month. A few slider adjustments in the simulator later, they found a
          routine that could save nearly $45 a month, without giving up hot showers or air
          conditioning.
        </p>
      </div>
    </div>
  );
}
