// LOAD CHARTS
window.onload = function () {

    new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: ['2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Students',
                data: [500, 700, 900, 1200]
            }]
        }
    });

    new Chart(document.getElementById('pieChart'), {
        type: 'doughnut',
        data: {
            labels: ['CSE', 'ECE', 'EEE', 'MECH'],
            datasets: [{
                data: [40, 25, 20, 15]
            }]
        }
    });

};

// NAVIGATION
function loadSection(section) {
    let content = document.getElementById("content");

    content.innerHTML = `<h2>${section.toUpperCase()} SECTION</h2>`;
}

// DARK MODE
function toggleTheme() {
    document.body.classList.toggle("dark");
}

// LOGOUT
function logout() {
    window.location.href = "mainpage.html";
}
function link0(){
    window.location.href = "student_management.html";
}
function link1(){
    window.location.href = "staff_management.html";
}
function link2(){
    window.location.href = "fees.html";
}
function link3(){
    window.location.href = "ins_report.html";
}
function link4(){
    window.location.href = "ins_about.html";
}