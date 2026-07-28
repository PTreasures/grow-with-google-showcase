import csv
import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def load_eia_appliances():
    """Peace's detailed EIA dataset: Appliance, Avg_Watts, Default_Hours_Per_Day, Category."""
    with open(DATA_DIR / "eia_appliances.csv", newline="") as f:
        rows = list(csv.DictReader(f))
    for row in rows:
        row["Avg_Watts"] = float(row["Avg_Watts"])
        row["Default_Hours_Per_Day"] = float(row["Default_Hours_Per_Day"])
    return rows


def load_tenant_profiles():
    """Peace's 3 tenant baselines (1-Bed / 2-Bed / 3-Bed), hours per appliance."""
    with open(DATA_DIR / "tenant_profiles.json") as f:
        return json.load(f)


def load_simulator_appliance_categories():
    """The simulator's 4 broad appliance categories (HVAC, fridge, laundry, entertainment)."""
    with open(DATA_DIR / "simulator_appliance_categories.json") as f:
        return json.load(f)


def load_simulator_baseline_profiles():
    """The simulator's 5 home-size baselines, in total monthly kWh."""
    with open(DATA_DIR / "simulator_baseline_profiles.json") as f:
        return json.load(f)


def load_regions():
    """Rate/carbon table across 15 regions, used to make the simulator global rather than US-only."""
    with open(DATA_DIR / "regions.json") as f:
        return json.load(f)


def get_region(region_id):
    return next((r for r in load_regions() if r["id"] == region_id), None)


def get_baseline_profile(baseline_id):
    return next((p for p in load_simulator_baseline_profiles() if p["id"] == baseline_id), None)
