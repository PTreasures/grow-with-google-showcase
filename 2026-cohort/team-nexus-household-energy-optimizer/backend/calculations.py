# calculations.py
# Tenant Power Tracker - Calculations v2

ELECTRICITY_RATE = 0.16  # $ per kWh - US average
CARBON_FACTOR = 0.4  # kg CO2 per kWh


def calc_kwh(watts, hours_per_day):
    """Calculate monthly kWh"""
    return watts * hours_per_day * 30 / 1000


def calc_cost(kwh):
    """Calculate monthly cost in $"""
    return kwh * ELECTRICITY_RATE


def calc_carbon(kwh):
    """Calculate monthly CO2 in kg"""
    return kwh * CARBON_FACTOR


def process_device(device):
    """Takes an appliance dict (Appliance, Avg_Watts, Default_Hours_Per_Day)
    and returns it with Monthly_kWh, Monthly_Cost, Monthly_Carbon added"""
    kwh = calc_kwh(device["Avg_Watts"], device["Default_Hours_Per_Day"])
    device["Monthly_kWh"] = round(kwh, 2)
    device["Monthly_Cost"] = round(calc_cost(kwh), 2)
    device["Monthly_Carbon"] = round(calc_carbon(kwh), 2)
    return device


def calculate_home_totals(devices):
    """Takes a list of appliance dicts and returns whole-home monthly totals"""
    total_kwh = total_cost = total_carbon = 0
    for device in devices:
        processed = process_device(device)
        total_kwh += processed["Monthly_kWh"]
        total_cost += processed["Monthly_Cost"]
        total_carbon += processed["Monthly_Carbon"]

    return {
        "Total_Monthly_kWh": round(total_kwh, 2),
        "Total_Monthly_Cost": round(total_cost, 2),
        "Total_Monthly_Carbon": round(total_carbon, 2),
    }
