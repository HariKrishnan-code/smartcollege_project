from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from assignment_routes import assignment_bp
import subprocess
import tempfile
import os

app = Flask(__name__)
CORS(app)

# ✅ REGISTER ASSIGNMENT ROUTES
app.register_blueprint(assignment_bp)


# ================= HOME ROUTES =================

@app.route('/')
def home():
    return render_template("index.html")   # Java IDE

@app.route('/python')
def python_ide():
    return render_template("ws.html")      # Python IDE


# ================= JAVA RUN =================

@app.route('/run_java', methods=['POST'])
def run_java():
    data = request.get_json()
    code = data.get("code", "")

    filename = "Main.java"

    try:
        with open(filename, "w") as f:
            f.write(code)

        compile_process = subprocess.run(
            ["javac", filename],
            capture_output=True,
            text=True
        )

        if compile_process.returncode != 0:
            return jsonify({"output": compile_process.stderr})

        run_process = subprocess.run(
            ["java", "Main"],
            capture_output=True,
            text=True
        )

        output = run_process.stdout if run_process.stdout else run_process.stderr

    except Exception as e:
        output = str(e)

    finally:
        if os.path.exists("Main.java"):
            os.remove("Main.java")
        if os.path.exists("Main.class"):
            os.remove("Main.class")

    return jsonify({"output": output})


# ================= PYTHON RUN =================

@app.route('/run_python', methods=['POST'])
def run_python():
    try:
        data = request.get_json(force=True)

        code = data.get("code", "")
        user_input = data.get("input", "")

        if not code.strip():
            return jsonify({"output": "⚠️ No code provided"}), 400

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
            output = "⏱️ Timeout!"

        finally:
            os.remove(filename)

        return jsonify({"output": output})

    except Exception as e:
        return jsonify({"output": str(e)}), 500


# ================= VIOLATION =================

@app.route('/violation', methods=['POST'])
def violation():
    print("⚠️ Tab switch detected")
    return jsonify({"status": "ok"})


# ================= RUN =================

if __name__ == '__main__':
    app.run(debug=True)