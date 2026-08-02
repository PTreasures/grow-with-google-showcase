# Household Energy Efficiency Optimizer — Project Summary

**Team Nexus Collaborative**
UN SDG 7: [Affordable and Clean Energy](https://www.un.org/sustainabledevelopment/energy/)

**Live Site**: [tenant-power-tracker.onrender.com](https://tenant-power-tracker.onrender.com/): Hosted on Render's free tier, so it spins down when idle. Give the first load about a minute to wake the server back up.

---

## 1. Research

### Problem

Apartment tenants lack clear, actionable metrics to calculate and reduce their personal energy footprints without expensive hardware (smart meters, plug monitors, etc.). Most existing tools assume either detailed appliance-level data the average renter doesn't have, or physical sensors they can't install.

### Methodology

To validate our assumptions about how tenants would actually want to interact with an energy tool, we ran lightweight, informal user research before building the core input flow:

- **Who**: People who currently rent and pay their own utility bills
- **How**: 15-minute informal interviews (in person, call, or async over text)
- **When**: July 25–28, 2026
- **Conducted by**: Sehr Abrar (UX/UI Lead)

Interviews covered four questions: whether tenants know what drives their energy bill, whether they've tried to reduce usage before, what would make them trust an energy "score," and how they'd prefer to input their usage data.

### Key Findings

- **Nobody tracks appliance hours.** No interviewee could estimate how many hours a day they run their AC, laundry, or entertainment devices. Manual kWh/hour entry is a non-starter — lifestyle-style questions ("how often do you use your AC?") are answerable; raw usage logs are not.
- **Score trust depends on explanation, not just a number.** Users said they'd distrust a score unless it's clear how it's calculated and what it's driving toward.
- **Motivation splits into two currencies: money and impact.** Some users only care about the bill; others want to see the environmental payoff. The product needs to speak to both without forcing users to pick a "mode."
- **Effort tolerance is low.** Busy professionals and students in particular abandon anything that feels like data entry — convenience beats precision for this audience.
- **Shared/family living complicates attribution.** Students and parents both flagged that usage isn't just "mine" — it's split across roommates or driven by household size, so the tool needs to work off personal habits and household context, not assumed full control over usage.

We synthesized these findings into five personas — Budget-Conscious Renter, Eco-Conscious Renter, Busy Professional, Student in Shared Accommodation, and Family-Oriented User — spanning different motivations (cost vs. impact), input tolerances, and living situations. Full interview notes and persona detail live in [`docs/user-research.md`](./user-research.md).

---

## 2. Proposed Solution

A web app where tenants input basic appliance usage or sample bill data to get a **Personalized Energy Score**, explore "What-If" savings scenarios via sliders, and receive automated, personalized tips — all benchmarked against real-world datasets (EIA.gov, Kaggle) instead of live hardware readings.

Research directly shaped the design:

| Finding | Design Decision |
|---|---|
| Nobody tracks appliance hours; lifestyle questions are answerable | Usage Simulator uses per-appliance sliders (11 built-in appliances, e.g. fridge, AC, washer/dryer) instead of manual kWh/hour entry |
| Score trust depends on explanation | Score breakdown shown alongside the Personalized Energy Score, not just the number alone |
| Motivation splits between cost-savers and impact-driven users | Tips reference both cost and environmental framing rather than picking one |
| Effort tolerance is low | Top 3 "energy hog" detection surfaces the highest-impact fixes instead of requiring review of every category |
| Shared/family living complicates attribution | Baseline profiles and regional comparison are framed around personal habits, not assumed full-household control |

### Core Features

- **Usage Simulator** — individual sliders for 11 built-in appliances (fridge, AC, washer/dryer, TV, and more), plus the ability to add custom appliances
- **Savings Visualizer** — bar chart comparing default usage vs. the user's scenario
- **Personalized Energy Score (1–100)** — benchmarked against a regional baseline
- **Top 3 "Energy Hog" Detection** — tailored, actionable tips targeting the highest-impact categories

---

## 3. Implementation Plan

### Tech Stack

- **Backend**: Flask (Python) — serves appliance, tenant-profile, and region data, and exposes a `/api/simulate` endpoint for parity with frontend calculations
- **Frontend**: React + TypeScript (Vite), plain CSS with a shared color/typography system, [lucide-react](https://lucide.dev/) for icons
- **Deployment**: Render (backend web service + frontend static site)

### Data & Calculations

- `data/eia_appliances.csv` — 11 appliances with wattage, default hours/day, and category, cleaned from EIA.gov
- `data/tenant_profiles.json` — 3 synthetic baseline profiles (1-Bed / 2-Bed / 3-Bed) derived from Kaggle benchmarks
- `data/regions.json` — rate and carbon-intensity table across 15 regions
- Core kWh / cost / carbon math is implemented once in TypeScript (`frontend/src/lib/calculations.ts`, driving the live simulator) and mirrored in Python (`backend/calculations.py`) so the API stays in sync with what the UI computes

### Team & Ownership

| Name | Role | MVP Responsibility |
|---|---|---|
| Ashenafi Demssie | Cybersecurity Lead | Security considerations doc, input validation review, dependency audit |
| Peace Kahunde | Data Lead | Dataset cleaning, baseline profiles, calculation functions |
| Priscilla Gyepi-Garbrah | Digital Marketing Lead | Launch messaging, demo narrative, social/email ad (stretch) |
| Sehr Abrar | UX/UI Lead & Full-Stack/Integration | Input flow, sliders/forms, layout, score feedback design; app structure, connecting calc logic to UI, deployment |

### Timeline

**Submission Deadline: August 14, 2026** (kickoff slipped to July 25, so the roadmap is compressed)

| Phase | Timeline | Focus |
|---|---|---|
| Days 1–3 | Jul 25 – Jul 27 | Confirm MVP scope + tech stack, assign owners, start dataset cleaning & calc functions |
| Days 4–7 | Jul 28 – Jul 31 | Usage simulator + score logic in parallel |
| Days 8–14 | Aug 1 – Aug 7 | Simulator, savings visualizer, top-3 tips complete; UI polish & security review begin |
| Days 15–18 | Aug 8 – Aug 11 | Deployment, README finalized |
| Days 19–21 | Aug 12 – Aug 14 | Final testing, demo/pitch prep, submission |

### Status

As of July 31, 2026: Phases 1, 2, and deployment are complete: the frontend runs on real backend data (not mocks), the simulator, savings visualizer, score, and energy-hog detection are all implemented, and the app is live at [tenant-power-tracker.onrender.com](https://tenant-power-tracker.onrender.com/). Remaining work is the Security Considerations section and the demo narrative.

### Grow with Google Resources Used

Applied Digital Skills; Google Cybersecurity Professional Certificate; Google Data Analytics Professional Certificate; Google Digital Marketing Professional Certificate; Google UX Design Professional Certificate.
