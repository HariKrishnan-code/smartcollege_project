// Initialize editor
var quill = new Quill('#editor', {
    theme: 'snow'
});

// ❌ Disable copy-paste
document.addEventListener("paste", e => e.preventDefault());
document.addEventListener("copy", e => e.preventDefault());

// ❌ Disable right click
document.addEventListener("contextmenu", e => e.preventDefault());

// 🔥 Typing Pattern Tracking
let timings = [];
let lastTime = Date.now();

document.addEventListener("keydown", () => {
    let now = Date.now();
    let gap = now - lastTime;
    timings.push(gap);
    lastTime = now;
});

// Calculate typing speed
function getTypingScore() {
    let avg = timings.reduce((a,b)=>a+b,0) / timings.length;

    if (avg < 150) return 90;   // fast
    else if (avg < 300) return 75;
    else return 60;             // slow
}

// SUBMIT FUNCTION
function submitAssignment() {

    let content = quill.root.innerHTML;

    if (content.trim() === "<p><br></p>") {
        alert("Write something before submitting!");
        return;
    }

    let typingScore = getTypingScore();

    alert("Assignment Submitted!\nTyping Score: " + typingScore + "%");

    // send to backend (Flask later)
    /*
    fetch('/submit', {
        method: 'POST',
        body: JSON.stringify({
            text: content,
            typingScore: typingScore
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    */
}