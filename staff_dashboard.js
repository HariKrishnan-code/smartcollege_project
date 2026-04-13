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

// MAIN NAVIGATION
function loadSection(section) {
    let content = document.getElementById("content");

    // PROFILE
    if (section === "profile") {
        content.innerHTML = `
            <h2>👤 Staff Profile</h2>
            <div class="card">
                <p><b>Name:</b> Prof. Kumar</p>
                <p><b>Department:</b> CSE</p>
                <p><b>Email:</b> staff@college.com</p>
            </div>
        `;
    }

    // MY CLASSES
    else if (section === "class") {
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

    // STUDENTS (ALL CLASSES)
    else if (section === "students") {
        let html = `<h2>👨‍🎓 All Students</h2>`;

        for (let cls in classesData) {
            html += `<div class="card"><h3>${cls}</h3><ul>`;

            classesData[cls].students.forEach(s => {
                html += `<li>${s.name} (Roll: ${s.roll})</li>`;
            });

            html += `</ul></div>`;
        }

        content.innerHTML = html;
    }

    // ASSIGNMENTS
    else if (section === "assignments") {
        let html = `<h2>📚 Assignments</h2>`;

        for (let cls in classesData) {
            html += `
                <div class="card">
                    <h3 onclick="assignToClass('${cls}')">${cls}</h3>
                </div>
            `;
        }

        content.innerHTML = html;
    }

    // VERIFY SUBMISSIONS
    else if (section === "verify") {
        content.innerHTML = `
            <h2>✅ Verify Submissions</h2>

            <div class="card">
                <p><b>Student:</b> Hari</p>
                <p><b>Assignment:</b> AI Report</p>
                <a href="#">📄 View PDF</a><br><br>
                <button onclick="approve()">Approve & Sign</button>
                <button onclick="reject()">Reject</button>
            </div>
        `;
    }

    // ANALYTICS
   else if (section === "analytics") {
    content.innerHTML = `
        <h2>📊 Analytics Dashboard</h2>

        <div class="card">
            <canvas id="barChart"></canvas>
        </div>

        <div class="card">
            <canvas id="pieChart"></canvas>
        </div>
    `;

    loadCharts();
}
}

// VIEW CLASS DETAILS
function viewClass(className) {
    let data = classesData[className];

    let studentsList = data.students.map(s => 
        `<li>${s.name} (Roll: ${s.roll})</li>`
    ).join("");

    let timetable = data.timetable.map(t => `<li>${t}</li>`).join("");

    document.getElementById("content").innerHTML = `
        <h2>🏫 ${className}</h2>

        <div class="card">
            <h3>📅 Timetable</h3>
            <ul>${timetable}</ul>
        </div>

        <div class="card">
            <h3>👨‍🎓 Students</h3>
            <ul>${studentsList}</ul>
        </div>
    `;
}

// ASSIGN TO CLASS
function assignToClass(className) {
    let students = classesData[className].students;

    let checkboxes = students.map(s => `
        <label>
            <input type="checkbox" value="${s.name}"> ${s.name}
        </label><br>
    `).join("");

    document.getElementById("content").innerHTML = `
        <h2>📚 Assign - ${className}</h2>

        <div class="card">
            <input type="text" id="title" placeholder="Assignment Title"><br><br>
            <textarea id="desc" placeholder="Description"></textarea><br><br>

            <h4>Select Students:</h4>
            <label>
                <input type="checkbox" onclick="selectAll(this)"> Assign to All
            </label><br><br>

            ${checkboxes}

            <br>
            <button onclick="submitAssignment('${className}')">Assign</button>
        </div>
    `;
}

// SELECT ALL
function selectAll(source) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = source.checked);
}

// SUBMIT ASSIGNMENT
function submitAssignment(className) {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;

    let selected = [];
    document.querySelectorAll("input[type='checkbox']:checked").forEach(cb => {
        if (cb.value !== "on") selected.push(cb.value);
    });

    alert(`Assignment "${title}" sent to ${selected.length} students in ${className}`);
}

// VERIFY ACTIONS
function approve() {
    alert("✅ Assignment Approved & Digitally Signed");
}

function reject() {
    alert("❌ Assignment Rejected");
}

// LOGOUT
function logout() {
    window.location.href = "mainpage.html";
}