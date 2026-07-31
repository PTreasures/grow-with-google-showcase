# Household Energy Efficiency Optimizer

## Team Nexus Collaborative
***UN SDG 7**: [Affordable and Clean Energy](https://www.un.org/sustainabledevelopment/energy/)*  
***Project Topic**: Household Energy Efficiency Optimizer*

**Live Site**: [tenant-power-tracker.onrender.com](https://tenant-power-tracker.onrender.com/) — hosted on Render's free tier, so it spins down when idle. If the page looks stuck loading, give it about a minute to spin back up.

---

## 1. Problem Statement

Apartment tenants lack clear, actionable metrics to calculate and reduce their personal energy footprints without expensive hardware.

---

## 2. Proposed Solution

A web app where tenants input basic appliance usage or sample bill data to get a **Personalized Energy Score**, explore "What-If" savings scenarios via sliders, and receive automated, personalized tips, all benchmarked against real-world datasets (EIA.gov, Kaggle) instead of live hardware readings.

---

## 3. MVP Feature Checklist

Tracking against the team's MVP scope doc. The frontend now runs on real data served by the backend, not mock/placeholder data.

**Phase 1: Data & Baseline Logic**
- [x] Cleaned EIA.gov appliance dataset (CSV/JSON) - `data/eia_appliances.csv`, served via `/api/appliances` and `/api/simulator/appliances`
- [x] 3–5 synthetic tenant baseline profiles from Kaggle benchmarks - `data/tenant_profiles.json` (1-Bed / 2-Bed / 3-Bed), served via `/api/simulator/baseline-profiles`
- [x] Core calculation functions: kWh, cost, carbon footprint - implemented in `frontend/src/lib/calculations.ts` (drives the live simulator) with a matching Python port in `backend/calculations.py` (served via `/api/simulate` for parity)

**Phase 2: Core App Features**
- [x] Usage Simulator: sliders for HVAC, fridge, laundry, entertainment
- [x] Savings Visualizer: bar chart, default usage vs. your scenario
- [x] Personalized Energy Score (1–100) vs. regional baseline
- [x] Top 3 "energy hog" detection with tailored tips

**Phase 3: Integration & Polish**
- [x] Basic cohesive UI (color palette, typography, metric cards)
- [x] Edge-case handling: 0 hrs / 24 hrs input doesn't crash or return negative numbers
- [x] README.md with install steps + requirements.txt
- [ ] Security Considerations section

**Phase 4: Deployment**
- [x] Live public URL - deployed on Render: [tenant-power-tracker.onrender.com](https://tenant-power-tracker.onrender.com/)
- [ ] Demo narrative

---

## 4. Grow with Google Resources Used

- Applied Digital Skills
- Google Cybersecurity Professional Certificate
- Google Data Analytics Professional Certificate
- Google Digital Marketing Professional Certificate
- Google UX Design Professional Certificate

---

## 5. Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: React + TypeScript (Vite), plain CSS with a shared color/typography system, [lucide-react](https://lucide.dev/) for icons
- **Deployment**: Render (backend web service + frontend static site)

---

## 6. Project Structure

```bash
team-nexus-household-energy-optimizer/
├── backend/                        # Flask API
│   ├── app.py                       # Routes: appliances, tenant profiles, regions, /api/simulate
│   ├── data.py                      # Loads/reshapes the datasets in data/ for the API and simulator
│   ├── calculations.py              # kWh / cost / carbon / score math (Python port of the frontend engine)
│   ├── requirements.txt             # Python dependencies
│   └── .env.example                 # Environment variable template
├── data/                           # Peace's cleaned datasets, consumed by backend/data.py
│   ├── eia_appliances.csv           # 11 appliances: watts, default hours/day, category
│   ├── tenant_profiles.json         # 3 baseline profiles (1-Bed / 2-Bed / 3-Bed)
│   └── regions.json                 # Rate/carbon table across 15 regions
├── docs/                           # Project documentation and reports (e.g. user-research.md)
├── frontend/                       # React + TypeScript app (Vite)
│   ├── .env.example                 # VITE_API_URL template
│   └── src/
│       ├── main.tsx, App.tsx         # App entry point and route definitions
│       ├── Layout.tsx                # Shared shell + all simulator/session state
│       ├── context.ts                # Shape of the state Layout hands down to pages
│       ├── types.ts                  # Appliance / BaselineProfile / Region shapes
│       ├── pages/                    # Home, Simulator, ScoreBreakdown, EnergyHogs
│       ├── components/               # UsageSimulator, SavingsChart, EnergyScoreCard, TopHogsCard, StatTile, accessibility panel, etc.
│       └── lib/                      # calculations.ts, api.ts, theme/textSize/readAloud, applianceColors, scoreStatus
├── .gitignore                      # Ignored files (env, deps, build output, etc.)
├── LICENSE                         # MIT License
└── README.md                       # Project overview and documentation
```

---

## 7. Setup / Run Instructions

New to running a project locally? Here's what to install first:

- **[Python 3.9+](https://www.python.org/downloads/)** — needed to run the Flask backend
- **[Node.js 18+](https://nodejs.org/)** (npm comes bundled with it) — needed to run the React frontend
- **[Git](https://git-scm.com/downloads)** — needed to clone this repository, if you haven't already

Once those are installed, open a terminal and clone the repo (skip this step if you already have the project folder):

```bash
git clone <this-repo-url>                       # download the project files to your computer
cd team-nexus-household-energy-optimizer        # move into the project folder
```

The backend and frontend run as two separate servers, so you'll want two terminal tabs/windows open at the same time, one for each set of steps below.

### Backend (Flask)

```bash
cd backend                          # move into the backend folder
python3 -m venv venv                # create an isolated Python environment for this project
source venv/bin/activate            # activate it (Windows: venv\Scripts\activate)
pip install -r requirements.txt     # install the Python packages the backend needs
cp .env.example .env                # copy the environment variable template to a real .env file
python app.py                       # start the Flask server
```

The API will run at `http://127.0.0.1:5050/api/health` (the root `/` just returns a small pointer message, no actual UI lives there).

### Frontend (React + TypeScript)

```bash
cd frontend         # move into the frontend folder (in your second terminal tab/window)
npm install          # download the JavaScript packages the frontend needs
cp .env.example .env # points the frontend at the backend above (VITE_API_URL)
npm run dev          # start the local development server
```

Vite will print a local URL in the terminal (typically `http://localhost:5173`), open it in your browser to view the app. The frontend fetches its appliance, baseline profile, and region data live from the backend started above, so both servers need to be running.

---

## 8. Project Timeline

**Submission Deadline: August 14, 2026**

Kickoff slipped to July 25, so the roadmap below is compressed.

| Phase | Timeline | Focus |
| ------ | -------- | ----- |
| Days 1–3 | July 25 – July 27 | Confirm MVP scope + tech stack, assign owners, start dataset cleaning & calc functions |
| Days 4–7 | July 28 – July 31 | Usage simulator + score logic in parallel |
| Days 8–14 | August 1 – August 7 | Simulator, savings visualizer, top-3 tips complete; UI polish & security review begin |
| Days 15–18 | August 8 – August 11 | Deployment, README finalized |
| Days 19–21 | August 12 – August 14 | Final testing, demo/pitch prep, submission |

---

## 9. Future Ideas

> *Coming soon.*

---

## 10. Team Members

| Name | Role | Contact | MVP Responsibility |
|------|------|---------|---------------------|
| Ashenafi Demssie | Cybersecurity Lead | | Security considerations doc, input validation review, dependency audit |
| [Peace Kahunde](https://www.linkedin.com/in/pkahunde) | Data Lead | peacek301@gmail.com | Dataset cleaning, baseline profiles, calculation functions |
| [Priscilla Gyepi-Garbrah](https://www.linkedin.com/in/priscilla-gyepi-garbrah-5190031ab/) | Digital Marketing Lead | gyepigarbrahpriscilla@gmail.com | Launch messaging, demo narrative, social/email ad (stretch) |
| [Sehr Abrar](https://www.linkedin.com/in/sehr-abrar/) | UX/UI Lead & Full-Stack/Integration | sehr.abrar1@gmail.com | Input flow, sliders/forms, layout, score feedback design; app structure, connecting calc logic to UI, deployment |

---

## 11. Demo

Live app: [tenant-power-tracker.onrender.com](https://tenant-power-tracker.onrender.com/)

> Hosted on Render's free tier, which spins down after inactivity, the first load after a period of idle time can take up to a minute while the server wakes back up. Subsequent loads are fast.

Demo narrative: *Coming soon.*

---

## 12. License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
