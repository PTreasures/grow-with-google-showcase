# Household Energy Efficiency Optimizer

## Team Nexus Collaborative
***UN SDG 7**: [Affordable and Clean Energy](https://www.un.org/sustainabledevelopment/energy/)*  
***Project Topic**: Household Energy Efficiency Optimizer*

---

## 1. Problem Statement

Apartment tenants lack clear, actionable metrics to calculate and reduce their personal energy footprints without expensive hardware.

---

## 2. Proposed Solution

A web app where tenants input basic appliance usage or sample bill data to get a **Personalized Energy Score**, explore "What-If" savings scenarios via sliders, and receive automated, personalized tips, all benchmarked against real-world datasets (EIA.gov, Kaggle) instead of live hardware readings.

---

## 3. MVP Feature Checklist

Tracking against the team's MVP scope doc. Frontend items below are built and running on mock/placeholder data until the Data track hands off the cleaned dataset.

**Phase 1: Data & Baseline Logic**
- [ ] Cleaned EIA.gov appliance dataset (CSV/JSON)
- [ ] 3–5 synthetic tenant baseline profiles from Kaggle benchmarks (frontend currently ships 3 placeholder profiles, to be swapped for real data)
- [x] Core calculation functions: kWh, cost, carbon footprint (implemented client-side in `frontend/src/lib/calculations.ts`, pending backend parity)

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
- [ ] Live public URL
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
- **Deployment**: Render (backend), Netlify/Vercel (frontend) (TBD once we're ready to deploy)

---

## 6. Project Structure

```bash
team-nexus-household-energy-optimizer/
├── backend/                 # Flask API
│   ├── app.py                # App entry point
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Environment variable template
├── frontend/                 # React + TypeScript app (Vite)
│   └── src/
│       ├── data/appliances.ts    # Mock appliance + baseline profile data
│       ├── lib/calculations.ts   # kWh / cost / carbon / score math
│       ├── components/           # UsageSimulator, SavingsChart, EnergyScoreCard, TopHogsCard, StatTile
│       └── App.tsx               # Page layout and state
├── docs/                    # Project documentation and reports
├── .gitignore               # Ignored files (env, deps, build output, etc.)
├── LICENSE                  # MIT License
└── README.md                # Project overview and documentation
```

---

## 7. Setup / Run Instructions

### Backend (Flask)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

The API will run at `http://127.0.0.1:5000/api/health`. There's no root route, so hit `/api/health` directly, not `/`.

### Frontend (React + TypeScript)

```bash
cd frontend
npm install
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`). The app currently runs entirely on mock appliance and baseline data defined in `frontend/src/data/appliances.ts`, no backend connection yet, that's the next step once the Data track's dataset is ready.

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

| Name | Track | Contact | Responsibilities |
|------|-------|---------|------------------|
| Ashenafi Demssie | Cybersecurity Track | | |
| [Peace Kahunde](https://www.linkedin.com/in/pkahunde) | Data Analytics Track | peacek301@gmail.com | |
| [Priscilla Gyepi-Garbrah](https://www.linkedin.com/in/priscilla-gyepi-garbrah-5190031ab/) | Digital Marketing Track | gyepigarbrahpriscilla@gmail.com | |
| [Sehr Abrar](https://www.linkedin.com/in/sehr-abrar/) | UX Design Track | sehr.abrar1@gmail.com | |

---

## 11. Demo

> *Coming soon.*

---

## 12. License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
