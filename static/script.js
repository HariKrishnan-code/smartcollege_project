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

    let res = await fetch("/run_java", {   // ✅ FIXED
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