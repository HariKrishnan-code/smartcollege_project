from flask import Blueprint, request, jsonify
import json
import os
import sys

# ------------------------------
# AI Project
# ------------------------------

AI_PROJECT = r"C:\Users\hariv\Desktop\AI _HANDWRITTING VERIFICATION"

if AI_PROJECT not in sys.path:
    sys.path.append(AI_PROJECT)

from database.report_db import ReportDB

report_db = ReportDB()

assignment_bp = Blueprint("assignment", __name__)

ASSIGN_FILE = "assignments.json"

if not os.path.exists(ASSIGN_FILE):
    with open(ASSIGN_FILE, "w") as f:
        json.dump([], f)


# ====================================================
# STAFF ASSIGNMENT
# ====================================================

@assignment_bp.route("/assign", methods=["POST"])
def assign():

    data = request.json

    with open(ASSIGN_FILE, "r") as f:
        assignments = json.load(f)

    assignments.append({

        "id": len(assignments),

        "class": data["class"],

        "title": data["title"],

        "desc": data["desc"],

        "type": data["type"],

        "students": data["students"],

        "submissions": []

    })

    with open(ASSIGN_FILE, "w") as f:
        json.dump(assignments, f, indent=4)

    return jsonify({"success": True})


# ====================================================
# STUDENT VIEW ASSIGNMENTS
# ====================================================

@assignment_bp.route("/get_assignments", methods=["GET"])
def get_assignments():

    with open(ASSIGN_FILE, "r") as f:
        assignments = json.load(f)

    return jsonify(assignments)


# ====================================================
# TYPING / PYTHON / JAVA SUBMISSION
# ====================================================

@assignment_bp.route("/submit", methods=["POST"])
def submit():

    data = request.json

    with open(ASSIGN_FILE, "r") as f:
        assignments = json.load(f)

    for assignment in assignments:

        if str(assignment["id"]) == str(data["assignment_id"]):

            assignment["submissions"].append({

                "student": data["student"],

                "code": data["code"]

            })

    with open(ASSIGN_FILE, "w") as f:
        json.dump(assignments, f, indent=4)

    return jsonify({"success": True})


# ====================================================
# STAFF VIEW AI REPORTS
# ====================================================

@assignment_bp.route("/submissions", methods=["GET"])
def get_ai_reports():

    reports = report_db.get_all_reports()

    return jsonify(reports)