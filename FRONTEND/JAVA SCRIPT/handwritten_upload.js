async function uploadAssignment() {

    const studentId = localStorage.getItem("student_id");

    if (!studentId) {

        alert("Student not logged in.");

        return;

    }

    const pdf = document.getElementById("assignment").files[0];

    if (!pdf) {

        alert("Please select a PDF.");

        return;

    }

    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML =
        "<h3>🤖 AI Verification Running...</h3><p>Please wait...</p>";

    const formData = new FormData();

    formData.append(
        "student_id",
        studentId
    );

    formData.append(
        "assignment",
        pdf
    );

    try {

        const response = await fetch(

            "http://127.0.0.1:5000/verify_handwriting",

            {

                method: "POST",

                body: formData

            }

        );

       const text = await response.text();

console.log(text);

const data = JSON.parse(text);
        if (!data.success) {

            resultDiv.innerHTML =

                "<h3>❌ Verification Failed</h3>" +

                "<p>" + data.message + "</p>";

            return;

        }

        const report = data.report;

        resultDiv.innerHTML = `

            <h2>✅ AI Verification Completed</h2>

            <hr>

            <p><b>Student ID :</b> ${report.student_id}</p>

            <p><b>Decision :</b> ${report.decision}</p>

            <p><b>Honest Score :</b> ${report.honest_score}%</p>

            <p><b>Deep Similarity :</b> ${report.deep_similarity}%</p>

            <p><b>Traditional Similarity :</b> ${report.traditional_similarity}%</p>

            <p><b>Confidence :</b> ${report.confidence}%</p>

            <p><b>Matched Lines :</b>

            ${report.matched_lines}

            /

            ${report.total_lines}</p>

            <p><b>Recommendation :</b>

            ${report.recommendation}</p>

        `;

    }

   catch (err) {

    console.error(err);

    resultDiv.innerHTML = `
        <h2>❌ Server Error</h2>
        <pre>${err}</pre>
    `;

}

}