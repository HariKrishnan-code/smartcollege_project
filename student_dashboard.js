function loadContent(section) {
    let content = document.getElementById("content");

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

    else if (section === "documents") {
        content.innerHTML = `
            <h2>📄 My Documents</h2>
            <div class="card">
                <p>Upload Resume</p>
                <input type="file">
            </div>
        `;
    }

    else if (section === "assignments") {
    content.innerHTML = `
        <h2>📚 Assignments</h2>

        <div class="card">
            <p>Select Programming Workspace</p>

            <button onclick="openIDE('python')">🐍 Python IDE</button>
            <button onclick="openIDE('java')">☕ Java IDE</button>
        </div>
    `;
}

    else if (section === "mock") {
        content.innerHTML = `
            <h2>🎤 Mock Interview</h2>
            <div class="card">
                <button onclick="startMock()">Start Interview</button>
            </div>
        `;
    }

    else if (section === "analytics") {
        content.innerHTML = `
            <h2>📊 Performance Analytics</h2>
            <div class="card">
                <p>Score: 85%</p>
                <p>Mock Interviews: 5 completed</p>
            </div>
        `;
    }
}

function startMock() {
    alert("Mock Interview Started!");
}

function logout() {
    window.location.href = "mainpage.html";
}
 function startTyping() {
    window.location.href = "typing_workspace.html";
}
function openIDE(type) {
    if (type === "python") {
        window.location.href = "http://127.0.0.1:5001"; 
        // your Python IDE port
    } 
    else if (type === "java") {
        window.location.href = "http://127.0.0.1:5000"; 
        // your Java IDE port
    }
}
