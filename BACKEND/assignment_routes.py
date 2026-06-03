from flask import Blueprint, request, jsonify
import json
import os

assignment_bp = Blueprint('assignment', __name__)

ASSIGN_FILE = "assignments.json"

# Create file if not exists
if not os.path.exists(ASSIGN_FILE):
    with open(ASSIGN_FILE, "w") as f:
        json.dump([], f)


# 📌 ASSIGN (STAFF)
@assignment_bp.route("/assign", methods=["POST"])
def assign():
    data = request.json

    with open(ASSIGN_FILE, "r") as f:
        assignments = json.load(f)

    new_assignment = {
        "id": len(assignments),  # ✅ NEW
        "class": data["class"],
        "title": data["title"],
        "desc": data["desc"],
        "type": data["type"],  # ✅ NEW (default python)
        "students": data["students"],
        "submissions": []
    }

    assignments.append(new_assignment)

    with open(ASSIGN_FILE, "w") as f:
        json.dump(assignments, f, indent=4)

    return jsonify({"msg": "Assignment created"})


# 📌 GET ASSIGNMENTS
@assignment_bp.route("/get_assignments", methods=["GET"])
def get_assignments():
    with open(ASSIGN_FILE, "r") as f:
        assignments = json.load(f)

    return jsonify(assignments)


# 📌 SUBMIT WORK
@assignment_bp.route("/submit", methods=["POST"])
def submit():
    data = request.json

    with open(ASSIGN_FILE, "r") as f:
        assignments = json.load(f)

    for a in assignments:
        # ✅ Match using ID (SAFE)
        if str(a["id"]) == str(data.get("assignment_id")):
            a["submissions"].append({
                "student": data["student"],
                "code": data["code"]
            })

    with open(ASSIGN_FILE, "w") as f:
        json.dump(assignments, f, indent=4)

    return jsonify({"msg": "Submitted"})


# 📌 VIEW SUBMISSIONS (STAFF)
@assignment_bp.route("/submissions", methods=["GET"])
def submissions():
    with open(ASSIGN_FILE, "r") as f:
        assignments = json.load(f)

    return jsonify(assignments)