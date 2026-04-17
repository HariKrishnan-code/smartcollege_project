let editor;

require.config({
    paths: { vs: "https://unpkg.com/monaco-editor@latest/min/vs" }
});

require(["vs/editor/editor.main"], function () {
    editor = monaco.editor.create(document.getElementById("editor"), {
        value: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java IDE");
    }
}`,
        language: "java",
        theme: "vs-dark",
        automaticLayout: true
    });
});

async function runCode() {
    let output = document.getElementById("output");
    output.innerText = "⏳ Running...";

    let res = await fetch("/run", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            code: editor.getValue()
        })
    });

    let data = await res.json();
    output.innerText = data.output;
}
 // 🔒 BLOCK COPY, CUT, PASTE
document.addEventListener("copy", e => e.preventDefault());
document.addEventListener("cut", e => e.preventDefault());
document.addEventListener("paste", e => e.preventDefault());

// 🔒 BLOCK RIGHT CLICK
document.addEventListener("contextmenu", e => e.preventDefault());

// 🔒 BLOCK KEY SHORTCUTS
document.addEventListener("keydown", function (e) {

    // Ctrl shortcuts
    if (e.ctrlKey && ["c", "v", "x", "a", "u", "s"].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }

    // DevTools shortcuts
    if (
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) ||
        e.key === "F12"
    ) {
        e.preventDefault();
    }

    // Refresh block
    if (e.key === "F5") {
        e.preventDefault();
    }
});
let switched = false;

document.addEventListener("visibilitychange", () => {
    if (document.hidden && !switched) {
        switched = true;

        alert("⚠️ Tab switch detected! Your code will be cleared.");

        // 🧹 Clear Monaco editor
        if (editor) {
            editor.setValue("");
        }

        // 🧹 Clear output
        document.getElementById("output").innerText = "❌ Code deleted due to tab switching";

        // 🔐 Disable Run button
        document.querySelector("button").disabled = true;

        // 📡 Notify backend (optional)
        fetch("/violation", { method: "POST" });
    }
});
 window.addEventListener("blur", () => {
    alert("⚠️ You left the window! Code will be cleared.");

    if (editor) editor.setValue("");
});
function submitCode() {
    let code = editor.getValue();
    let title = localStorage.getItem("assignmentTitle");

    fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            student: "Hari",
            code: code
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("✅ Submitted Successfully");
    });
}