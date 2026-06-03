from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import subprocess
import tempfile
import os

app = Flask(__name__)
CORS(app)


# 🏠 HOME ROUTE (VERY IMPORTANT)
@app.route('/')
def home():
    return render_template("ws.html")   # your python IDE frontend file


# ▶️ RUN PYTHON CODE
@app.route('/run', methods=['POST'])
def run_code():
    try:
        data = request.get_json(force=True)

        code = data.get("code", "")
        user_input = data.get("input", "")

        if not code.strip():
            return jsonify({"output": "⚠️ No code provided"}), 400

        # 📄 Create temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".py", mode="w") as f:
            f.write(code)
            filename = f.name

        try:
            result = subprocess.run(
                ["python", filename],
                input=user_input,
                capture_output=True,
                text=True,
                timeout=5
            )

            output = result.stdout if result.stdout else result.stderr

        except subprocess.TimeoutExpired:
            output = "⏱️ Error: Code execution timed out!"

        finally:
            os.remove(filename)

        return jsonify({"output": output})

    except Exception as e:
        return jsonify({"output": f"Server Error: {str(e)}"}), 500


# 🚨 OPTIONAL (if using tab switch tracking)
@app.route('/violation', methods=['POST'])
def violation():
    print("⚠️ Python IDE tab switch detected")
    return jsonify({"status": "ok"})


# 🚀 RUN SERVER (IMPORTANT PORT CHANGE)
if __name__ == '__main__':
    app.run(port=5001, debug=True)