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

## 3. Grow with Google Resources Used

- Applied Digital Skills
- Google Cybersecurity Professional Certificate
- Google Data Analytics Professional Certificate
- Google Digital Marketing Professional Certificate
- Google UX Design Professional Certificate

---

## 4. Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: React + TypeScript
- **Deployment**: Render (backend), Netlify/Vercel (frontend) (TBD once we're ready to deploy)

---

## 5. Project Structure

```bash
team-nexus-household-energy-optimizer/
├── backend/               # Flask API
│   ├── app.py             # App entry point
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Environment variable template
├── frontend/              # React + TypeScript app (scaffold pending, see Setup below)
├── docs/                  # Project documentation and reports
├── .gitignore             # Ignored files (env, deps, build output, etc.)
├── LICENSE                # MIT License
└── README.md              # Project overview and documentation
```

---

## 6. Setup / Run Instructions

### Backend (Flask)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

The API will run at `http://localhost:5000`. A `/api/health` route is included as a starting point.

### Frontend (React + TypeScript)

Not scaffolded yet. When ready to start:

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm run dev
```

---

## 7. Project Timeline

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

## 8. Future Ideas

> *Coming soon.*

---

## 9. Team Members

| Name | Track | Contact | Responsibilities |
|------|-------|---------|------------------|
| Ashenafi Demssie | Cybersecurity Track | | |
| [Peace Kahunde](https://www.linkedin.com/in/pkahunde) | Data Analytics Track | peacek301@gmail.com | |
| [Priscilla Gyepi-Garbrah](https://www.linkedin.com/in/priscilla-gyepi-garbrah-5190031ab/) | Digital Marketing Track | gyepigarbrahpriscilla@gmail.com | |
| [Sehr Abrar](https://www.linkedin.com/in/sehr-abrar/) | UX Design Track | sehr.abrar1@gmail.com | |

---

## 10. Demo

> *Coming soon.*

---

## 11. License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
