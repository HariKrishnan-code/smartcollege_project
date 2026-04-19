function getAssignmentTitle() {
    const params = new URLSearchParams(window.location.search);
    return params.get("title");
}
let editor;

require.config({
    paths: { vs: "https://unpkg.com/monaco-editor@latest/min/vs" }
});

require(["vs/editor/editor.main"], function () {
    editor = monaco.editor.create(document.getElementById("editor"), {
        value: `print("start coding...")`,
        language: "python",
        theme: "vs-dark",
        automaticLayout: true
    });

   

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            alert("⚠️ Tab switching is not allowed!");
        }
    });
});

async function runCode() {
    const outputBox = document.getElementById("output");
    outputBox.innerText = "⏳ Running...";

    try {
        let response = await fetch("/run_python", {   // ✅ FIXED
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: editor.getValue(),
                input: document.getElementById("input").value
            })
        });

        if (!response.ok) {
            let text = await response.text();
            throw new Error(text);
        }

        let data = await response.json();
        outputBox.innerText = data.output || "⚠️ No output";

    } catch (err) {
        outputBox.innerText = "❌ Error: " + err.message;
    }
}

function saveCode() {
    const code = editor.getValue();
    const blob = new Blob([code], { type: "text/plain" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    let filename = prompt("Enter file name:", "my_code") || "my_code";

    a.download = filename + ".py";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// 🔥 FINAL SUBMIT FIX
async function submitCode() {
    let code = editor.getValue();
    let title = getAssignmentTitle(); 

    if (!title) {
        alert("⚠️ No assignment selected");
        return;
    }

    let res = await fetch("http://127.0.0.1:5000/submit", {   // ✅ CORRECT ROUTE
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            student: "Hari",
            code: code
        })
    });

    await res.json();
    alert("✅ Submitted Successfully");
}