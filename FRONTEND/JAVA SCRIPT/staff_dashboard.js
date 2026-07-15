// ✅ CLASS DATA
const classesData = {
    "III CSE A": {
        timetable: [
            "Mon - Data Structures",
            "Tue - DBMS",
            "Wed - OS",
            "Thu - AI",
            "Fri - Networks"
        ],
        students: [
            { name: "Hari", roll: 101 },
            { name: "Ravi", roll: 102 },
            { name: "Kumar", roll: 103 }
        ]
    },

    "II CSE B": {
        timetable: [
            "Mon - Java",
            "Tue - Python",
            "Wed - DBMS",
            "Thu - Maths"
        ],
        students: [
            { name: "Priya", roll: 201 },
            { name: "Sneha", roll: 202 }
        ]
    }
};

console.log("✅ STAFF JS LOADED");


// ================= MAIN NAV =================
window.loadSection = function (section) {

    let content = document.getElementById("content");

    // ===========================================
    // MY CLASSES
    // ===========================================
    if (section === "class") {

        let html = "<h2>🏫 My Classes</h2>";

        for (let cls in classesData) {

            html += `
                <div class="card">
                    <h3 onclick="viewClass('${cls}')">${cls}</h3>
                </div>
            `;
        }

        content.innerHTML = html;
    }

    // ===========================================
    // ASSIGNMENTS
    // ===========================================
    else if (section === "assignments") {

        let html = "<h2>📚 Assignments</h2>";

        for (let cls in classesData) {

            html += `
                <div class="card">
                    <button onclick="assignToClass('${cls}')">
                        ${cls}
                    </button>
                </div>
            `;
        }

        content.innerHTML = html;
    }

    // ===========================================
    // VERIFY SUBMISSIONS (AI REPORTS)
    // ===========================================
    else if (section === "verify") {

        fetch("http://127.0.0.1:5000/submissions")
            .then(res => res.json())
            .then(data => {

                let html = "<h2>🤖 AI Verified Assignments</h2>";

                if (!data || data.length === 0) {

                    html += `
                        <div class="card">
                            No verification reports found.
                        </div>
                    `;

                    content.innerHTML = html;
                    return;
                }

                data.forEach(report => {

                    html += `

                    <div class="card">

                        <h3>👤 Student : ${report.student_id}</h3>

                        <hr>

                        <p><b>Decision :</b> ${report.decision}</p>

                        <p><b>Honest Score :</b>
                        ${Number(report.honest_score).toFixed(2)}%</p>

                        <p><b>Deep Similarity :</b>
                        ${Number(report.deep_similarity).toFixed(2)}%</p>

                        <p><b>Traditional Similarity :</b>
                        ${Number(report.traditional_similarity).toFixed(2)}%</p>

                        <p><b>Confidence :</b>
                        ${Number(report.confidence).toFixed(2)}%</p>

                        <p><b>Matched Lines :</b>
                        ${report.matched_lines}/${report.total_lines}</p>

                        <p><b>Recommendation :</b></p>

                        <p>${report.recommendation}</p>

                    </div>

                    `;
                });

                content.innerHTML = html;

            })

            .catch(error => {

                console.error(error);

                content.innerHTML = `

                    <div class="card">

                        <h2>❌ Unable to load AI reports.</h2>

                    </div>

                `;
            });
    }

    // ===========================================
    // ANALYTICS
    // ===========================================
    else if (section === "analytics") {

        content.innerHTML = `

            <h2>📊 Analytics</h2>

            <div class="card">

                <p>Coming soon...</p>

            </div>

        `;
    }

};


// ================= VIEW CLASS =================
window.viewClass = function (className) {

    let data = classesData[className];

    let students = data.students
        .map(s => `<li>${s.name} (Roll : ${s.roll})</li>`)
        .join("");

    let timetable = data.timetable
        .map(t => `<li>${t}</li>`)
        .join("");

    document.getElementById("content").innerHTML = `

        <h2>${className}</h2>

        <div class="card">

            <h3>📅 Timetable</h3>

            <ul>${timetable}</ul>

        </div>

        <div class="card">

            <h3>👨‍🎓 Students</h3>

            <ul>${students}</ul>

        </div>

    `;
};


// ================= ASSIGN =================
window.assignToClass = function (className) {

    document.getElementById("content").innerHTML = `

        <h2>📚 Assign - ${className}</h2>

        <input id="title" placeholder="Assignment Title">

        <br><br>

        <textarea
            id="desc"
            placeholder="Description"
        ></textarea>

        <br><br>

        <select id="type">

            <option value="python">🐍 Python</option>

            <option value="java">☕ Java</option>

            <option value="typing">⌨️ Typing Workspace</option>

            <option value="handwritten">✍️ Handwritten PDF</option>

        </select>

        <br><br>

        <button onclick="submitAssignment('${className}')">

            Assign

        </button>

    `;
};


// ================= SUBMIT ASSIGNMENT =================
window.submitAssignment = function (className) {

    const title = document.getElementById("title").value.trim();

    const desc = document.getElementById("desc").value.trim();

    const type = document.getElementById("type").value;

    if (!title || !desc) {

        alert("⚠️ Please fill all fields.");

        return;
    }

    fetch("http://127.0.0.1:5000/assign", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            class: className,

            title: title,

            desc: desc,

            type: type,

            students: ["Hari"]

        })

    })

    .then(res => res.json())

    .then(() => {

        alert("✅ Assignment Assigned");

        loadSection("assignments");

    })

    .catch(() => {

        alert("❌ Error assigning assignment.");

    });

};


// ================= LOGOUT =================
window.logout = function () {

    window.location.href = "mainpage.html";

};