from flask import Blueprint, request, jsonify
import os
import sys

# -----------------------------
# AI PROJECT PATH
# -----------------------------
AI_PROJECT = r"C:\Users\hariv\Desktop\AI _HANDWRITTING VERIFICATION"

sys.path.append(AI_PROJECT)

from ai.pipeline import HandwritingPipeline
from database.reference_manager import ReferenceManager
import database

print(database.__file__)

ai_bp = Blueprint("ai", __name__)
print(os.getcwd())
pipeline = HandwritingPipeline()
reference_manager = ReferenceManager()


@ai_bp.route("/verify_handwriting", methods=["POST"])
def verify_handwriting():
    print("\n========== AI ROUTE ==========")
    print("Request received")

    try:

        student_id = request.form.get("student_id")
        print("Student ID:", student_id)

        if not student_id:
            return jsonify({
                "success": False,
                "message": "Student ID missing."
            })

        if "assignment" not in request.files:
            return jsonify({
                "success": False,
                "message": "Assignment PDF missing."
            })

        assignment = request.files["assignment"]
        print("Assignment:", assignment.filename)

        assignment_folder = os.path.join(
            AI_PROJECT,
            "uploads",
            "assignment",
            student_id
        )

        os.makedirs(
            assignment_folder,
            exist_ok=True
        )

        assignment_path = os.path.join(
            assignment_folder,
            assignment.filename
        )

        assignment.save(assignment_path)

        reference_pdf = reference_manager.get_latest_reference(
            student_id
        )
        print("Reference PDF:", reference_pdf)

        if reference_pdf is None:

            return jsonify({
                "success": False,
                "message": "Reference PDF not found."
            })
        print("Starting AI Pipeline...")

        report = pipeline.verify(
            student_id=student_id,
        
            assignment_pdf=assignment_path
        )
        print("Pipeline Finished")

        # JSON-safe conversion
        if "_id" in report:
            report["_id"] = str(report["_id"])

        if "created_at" in report:
            report["created_at"] = str(report["created_at"])

        return jsonify({
            "success": True,
            "report": report
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })


print("✅ AI Blueprint Loaded")