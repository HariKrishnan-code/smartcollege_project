function loadContent(section) {
    let content = document.getElementById("content");

    // ================= PROFILE =================
    if (section === "profile") {
        content.innerHTML = `
            <h2>👤 Profile</h2>
            <div class="card">
                <p>Name: Hari</p>
                <p>Email: student@email.com</p>
                <p>Department: CSE</p>
            </div>
        `;
    }

    // ================= DOCUMENTS =================
    else if (section === "documents") {
        content.innerHTML = `
            <h2>📄 My Documents</h2>
            <div class="card">
                <input type="file">
            </div>
        `;
    }

    // ================= ASSIGNMENTS =================
    else if (section === "assignments") {
        content.innerHTML = `
            <h2>📚 Assignments</h2>

            <!-- Manual IDE Access -->
            <div class="card">
                <button onclick="openIDE('python')">🐍 Python IDE</button>
                <button onclick="openIDE('java')">☕ Java IDE</button>
                <button onclick="openIDE('typing')">⌨️ Typing</button>
            </div>

            <!-- Assignment List -->
            <div id="assignmentList">
                <p>Loading...</p>
            </div>
        `;

        fetch("http://127.0.0.1:5000/get_assignments")
        .then(res => res.json())
        .then(data => {

            let html = "";

            if (data.length === 0) {
                html = "<p>No assignments</p>";
            } 
            else {
                data.forEach(a => {
                    html += `
                        <div class="card">
                            <h3>${a.title}</h3>
                            <p>${a.desc}</p>
                            <p><b>Type:</b> ${a.type}</p>

                            <button onclick="openAssignment('${a.title}', '${a.type}')">
                                🚀 Open Assignment
                            </button>
                        </div>
                    `;
                });
            }

            document.getElementById("assignmentList").innerHTML = html;
        })
        .catch(() => {
            document.getElementById("assignmentList").innerHTML = "<p>❌ Error loading assignments</p>";
        });
    }
}

///////////////////////////////////////////////////////////
// ✅ OPEN ASSIGNMENT (MAIN LOGIC)
///////////////////////////////////////////////////////////
function openAssignment(title, type) {

    // Save assignment title (used in IDE submission)
    localStorage.setItem("assignmentTitle", title);

    if (type === "python") {
        window.location.href = "http://127.0.0.1:5001";
    } 
    else if (type === "java") {
        window.location.href = "http://127.0.0.1:5000";
    } 
    else {
        window.location.href = "typing_workspace.html";
    }
}

///////////////////////////////////////////////////////////
// ✅ MANUAL IDE OPEN (NO CHANGE)
///////////////////////////////////////////////////////////
function openIDE(type) {
    if (type === "python") {
        window.location.href = "http://127.0.0.1:5001";
    } 
    else if (type === "java") {
        window.location.href = "http://127.0.0.1:5000";
    } 
    else {
        window.location.href = "typing_workspace.html";
    }
}

///////////////////////////////////////////////////////////
// ✅ LOGOUT (NO CHANGE)
///////////////////////////////////////////////////////////
function logout() {
    window.location.href = "mainpage.html";
}