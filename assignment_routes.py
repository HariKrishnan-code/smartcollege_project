from flask import Blueprint, request, jsonify
import json
import os

assignment_bp = Blueprint('assignment', __name__)

ASSIGN_FILE = "assignments.json"

if not os.path.exists(ASSIGN_FILE):
    with open(ASSIGN_FILE, "w") as f:
        json.dump([], f)


@assignment_bp.route("/assign", methods=["POST"])
def assign():
    data = request.json

    with open(ASSIGN_FILE, "r") as f:
        assignments = json.load(f)

    assignments.append({
        "class": data["class"],
        "title": data["title"],
        "desc": data["desc"],
        "students": data["students"],
        "submissions": []
    })

    with open(ASSIGN_FILE, "w") as f:
        json.dump(assignments, f, indent=4)

    return jsonify({"msg": "Assignment created"})


@assignment_bp.route("/get_assignments", methods=["GET"])
def get_assignments():
    with open(ASSIGN_FILE, "r") as f:
        assignments = json.load(f)

    return jsonify(assignments)


@assignment_bp.route("/submit", methods=["POST"])
def submit():
    data = request.json

    with open(ASSIGN_FILE, "r") as f:
        assignments = json.load(f)

    for a in assignments:
        if a["title"] == data["title"]:
            a["submissions"].append({
                "student": data["student"],
                "code": data["code"]
            })

    with open(ASSIGN_FILE, "w") as f:
        json.dump(assignments, f, indent=4)

    return jsonify({"msg": "Submitted"})


@assignment_bp.route("/submissions", methods=["GET"])
def submissions():
    with open(ASSIGN_FILE, "r") as f:
        assignments = json.load(f)

    return jsonify(assignments)