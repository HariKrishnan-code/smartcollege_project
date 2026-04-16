from flask_cors import CORS
from assignment_routes import assignment_bp
from flask import Flask, request, jsonify, render_template
import subprocess
import os

app = Flask(__name__)
CORS(app)
app.register_blueprint(assignment_bp)


# 🏠 Home Page
@app.route('/')
def home():
    return render_template("index.html")


# ▶️ Run Java Code
@app.route('/run', methods=['POST'])
def run_code():
    data = request.get_json()
    code = data.get("code", "")

    filename = "Main.java"

    try:
        # ✍️ Write Java code to file
        with open(filename, "w") as f:
            f.write(code)

        # ⚙️ Compile
        compile_process = subprocess.run(
            ["javac", filename],
            capture_output=True,
            text=True
        )

        # ❌ Compilation Error
        if compile_process.returncode != 0:
            return jsonify({"output": compile_process.stderr})

        # ▶️ Run Program
        run_process = subprocess.run(
            ["java", "Main"],
            capture_output=True,
            text=True
        )

        output = run_process.stdout if run_process.stdout else run_process.stderr

    except Exception as e:
        output = f"Server Error: {str(e)}"

    finally:
        # 🧹 Cleanup files
        if os.path.exists("Main.java"):
            os.remove("Main.java")

        if os.path.exists("Main.class"):
            os.remove("Main.class")

    return jsonify({"output": output})


# 🚨 Tab Switch / Violation Route
@app.route('/violation', methods=['POST'])
def violation():
    print("⚠️ Tab switch detected - code cleared")
    return jsonify({"status": "ok"})


# 🚀 Run Server
if __name__ == '__main__':
    app.run(debug=True)