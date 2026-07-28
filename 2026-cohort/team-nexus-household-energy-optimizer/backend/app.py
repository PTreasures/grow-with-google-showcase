from flask import Flask, jsonify, request
from flask_cors import CORS

import data
from calculations import (
    build_breakdown,
    calc_carbon,
    calculate_home_totals,
    energy_score,
    build_delta,
    sum_kwh,
    top_energy_hogs,
)

app = Flask(__name__)
CORS(app)

DEFAULT_REGION_ID = "us-national"
DEFAULT_BASELINE_ID = "2-bed-apartment"


@app.route("/api/health")
def health():
    return jsonify(status="ok")


@app.route("/api/appliances")
def appliances():
    """Peace's detailed EIA dataset - 11 individual appliances with watts/hours/category."""
    return jsonify(data.load_eia_appliances())


@app.route("/api/appliances/totals")
def appliance_totals():
    """Whole-home monthly kWh/cost/carbon from the detailed EIA dataset at default hours."""
    devices = [
        {
            "Appliance": d["Appliance"],
            "Avg_Watts": d["Avg_Watts"],
            "Default_Hours_Per_Day": d["Default_Hours_Per_Day"],
        }
        for d in data.load_eia_appliances()
    ]
    return jsonify(calculate_home_totals(devices))


@app.route("/api/tenant-profiles")
def tenant_profiles():
    return jsonify(data.load_tenant_profiles())


@app.route("/api/simulator/appliance-categories")
def simulator_appliance_categories():
    return jsonify(data.load_simulator_appliance_categories())


@app.route("/api/simulator/baseline-profiles")
def simulator_baseline_profiles():
    return jsonify(data.load_simulator_baseline_profiles())


@app.route("/api/regions")
def regions():
    return jsonify(data.load_regions())


@app.route("/api/simulate", methods=["POST"])
def simulate():
    """
    Runs the simulator's math server-side, region-aware.

    Body: {
      "hours_by_appliance": {"hvac": 8, "fridge": 24, "laundry": 1, "entertainment": 4},
      "region_id": "us-california",     # optional, defaults to us-national
      "baseline_id": "2-bed-apartment"  # optional, defaults to 2-bed-apartment
    }
    """
    body = request.get_json(silent=True) or {}
    hours_by_appliance = body.get("hours_by_appliance", {})
    region_id = body.get("region_id", DEFAULT_REGION_ID)
    baseline_id = body.get("baseline_id", DEFAULT_BASELINE_ID)

    region = data.get_region(region_id)
    if region is None:
        return jsonify(error=f"Unknown region_id '{region_id}'"), 400

    baseline = data.get_baseline_profile(baseline_id)
    if baseline is None:
        return jsonify(error=f"Unknown baseline_id '{baseline_id}'"), 400

    appliance_categories = data.load_simulator_appliance_categories()
    breakdown = build_breakdown(hours_by_appliance, appliance_categories, rate=region["rate_per_kwh"])
    total_kwh = sum_kwh(breakdown)
    total_cost = total_kwh * region["rate_per_kwh"]
    total_carbon_lbs = calc_carbon(total_kwh, factor=region["carbon_lbs_per_kwh"])

    return jsonify(
        region=region,
        baseline=baseline,
        breakdown=breakdown,
        total_kwh=round(total_kwh, 2),
        total_cost=round(total_cost, 2),
        total_carbon_lbs=round(total_carbon_lbs, 2),
        top_hogs=top_energy_hogs(breakdown, 3),
        score=energy_score(total_kwh, baseline["monthly_kwh"]),
        delta_kwh=build_delta(total_kwh, baseline["monthly_kwh"]),
    )


if __name__ == "__main__":
    app.run(debug=True, port=5050)
