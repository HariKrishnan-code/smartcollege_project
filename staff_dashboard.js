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
            {name: "Hari", roll: 101},
            {name: "Ravi", roll: 102},
            {name: "Kumar", roll: 103}
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
            {name: "Priya", roll: 201},
            {name: "Sneha", roll: 202}
        ]
    }
};

console.log("✅ STAFF JS LOADED");


// ================= MAIN NAV =================
window.loadSection = function(section) {
    let content = document.getElementById("content");

    // 🏫 MY CLASSES
    if (section === "class") {
        let html = `<h2>🏫 My Classes</h2>`;

        for (let cls in classesData) {
            html += `
                <div class="card">
                    <h3 onclick="viewClass('${cls}')">${cls}</h3>
                </div>
            `;
        }

        content.innerHTML = html;
    }

    // 📚 ASSIGNMENTS
    else if (section === "assignments") {
        let html = `<h2>📚 Assignments</h2>`;

        for (let cls in classesData) {
            html += `
                <div class="card">
                    <button onclick="assignToClass('${cls}')">${cls}</button>
                </div>
            `;
        }

        content.innerHTML = html;
    }

    // ✅ VERIFY SUBMISSIONS
    else if (section === "verify") {

        fetch("http://127.0.0.1:5000/submissions")
        .then(res => res.json())
        .then(data => {

            let html = "<h2>✅ Submissions</h2>";

            let hasData = false;

            data.forEach(a => {
                if (a.submissions.length > 0) {
                    hasData = true;

                    a.submissions.forEach(s => {
                        html += `
                            <div class="card">
                                <p><b>${s.student}</b></p>
                                <p>${a.title}</p>
                                <pre>${s.code}</pre>
                            </div>
                        `;
                    });
                }
            });

            if (!hasData) {
                html += "<p>No submissions yet</p>";
            }

            content.innerHTML = html;
        })
        .catch(() => {
            content.innerHTML = "<p>❌ Error loading submissions</p>";
        });
    }

    // 📊 ANALYTICS
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
window.viewClass = function(className) {
    let data = classesData[className];

    let students = data.students.map(s =>
        `<li>${s.name} (Roll: ${s.roll})</li>`
    ).join("");

    let timetable = data.timetable.map(t =>
        `<li>${t}</li>`
    ).join("");

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
window.assignToClass = function(className) {
    document.getElementById("content").innerHTML = `
        <h2>📚 Assign - ${className}</h2>

        <input id="title" placeholder="Assignment Title"><br><br>
        <textarea id="desc" placeholder="Description"></textarea><br><br>

        <button onclick="submitAssignment('${className}')">Assign</button>
    `;
};


// ================= SUBMIT ASSIGNMENT =================
window.submitAssignment = function(className) {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;

    fetch("http://127.0.0.1:5000/assign", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            class: className,
            title: title,
            desc: desc,
            students: ["Hari"] // later dynamic
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("✅ Assignment Assigned");
        loadSection("assignments");
    })
    .catch(() => alert("❌ Error assigning"));
};


// ================= LOGOUT =================
window.logout = function() {
    window.location.href = "mainpage.html";
};