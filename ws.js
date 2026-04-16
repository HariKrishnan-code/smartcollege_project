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
        let response = await fetch("http://127.0.0.1:5000/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: editor.getValue(),
                input: document.getElementById("input").value
            })
        });

        // 🔥 IMPORTANT FIX (prevents JSON error)
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
    const lang = document.getElementById("language")?.value || "python";

    // 📄 Set file extension
    let extension = "txt";

    if (lang === "python") extension = "py";
    else if (lang === "c") extension = "c";
    else if (lang === "cpp") extension = "cpp";
    else if (lang === "java") extension = "java";

    // 📄 Create file
    const blob = new Blob([code], { type: "text/plain" });

    // 📥 Create download link
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    let filename = prompt("Enter file name:", "my_code");
    if (!filename) filename = "my_code";

    a.download = filename + "." + extension;

    // 🔽 Trigger download
    document.body.appendChild(a);
    a.click();

    // 🧹 Cleanup
    document.body.removeChild(a);
}
// 🔒 Disable keyboard shortcuts
document.addEventListener("keydown", function (e) {

    // Block Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A
    if (e.ctrlKey && ["c", "v", "x", "a"].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }

    // Block Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
    }

    // Block F12
    if (e.key === "F12") {
        e.preventDefault();
    }
});


// 🔒 Disable right click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});


// 🔒 Disable paste
document.addEventListener("paste", function (e) {
    e.preventDefault();
});


// 🔒 Disable drag & drop
document.addEventListener("drop", function (e) {
    e.preventDefault();
});

