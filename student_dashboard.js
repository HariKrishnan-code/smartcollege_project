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
                <input type="file">
            </div>
        `;
    }

    else if (section === "assignments") {
        content.innerHTML = `
            <h2>📚 Assignments</h2>

            <div class="card">
                <button onclick="openIDE('python')">🐍 Python IDE</button>
                <button onclick="openIDE('java')">☕ Java IDE</button>
                <button onclick="openIDE('typing')">⌨️ Typing</button>
            </div>

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
            } else {
                data.forEach(a => {
                    html += `
                        <div class="card">
                            <h3>${a.title}</h3>
                            <p>${a.desc}</p>
                            <button onclick="openSubmit('${a.title}')">Submit</button>
                        </div>
                    `;
                });
            }

            document.getElementById("assignmentList").innerHTML = html;
        });
    }
}

function openSubmit(title) {
    document.getElementById("content").innerHTML = `
        <h2>${title}</h2>
        <textarea id="code"></textarea>
        <br><br>
        <button onclick="submitWork('${title}')">Submit</button>
    `;
}

function submitWork(title) {
    let code = document.getElementById("code").value;

    fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: title,
            student: "Hari",
            code: code
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Submitted");
        loadContent("assignments");
    });
}

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