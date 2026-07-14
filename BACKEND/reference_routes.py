from flask import Blueprint, jsonify

reference_bp = Blueprint(
    "reference",
    __name__
)


@reference_bp.route("/upload_reference", methods=["POST"])
def upload_reference():

    return jsonify({

        "success": False,

        "message":
        "AI Handwriting Server is not integrated yet."

    })


@reference_bp.route("/reference_status/<student_id>")
def reference_status(student_id):

    return jsonify({

        "success": False,

        "student_id": student_id,

        "message":
        "Reference system not connected."

    })