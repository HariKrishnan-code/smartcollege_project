// Chart
const ctx = document.getElementById('myChart').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['CSE-A', 'CSE-B', 'ECE'],
        datasets: [{
            label: 'Average Marks',
            data: [75, 70, 65]
        }]
    },
    options: {
        responsive: true
    }
});

// Filter
const filter = document.getElementById("classFilter");
const rows = document.querySelectorAll("#studentTable tbody tr");

filter.addEventListener("change", () => {
    const value = filter.value;

    rows.forEach(row => {
        const cls = row.getAttribute("data-class");

        if (value === "all" || value === cls) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

// Download Report
function downloadReport() {
    let csv = "Name,Class,Marks,Status\n";

    rows.forEach(row => {
        if (row.style.display !== "none") {
            const cols = row.querySelectorAll("td");
            const data = Array.from(cols).map(td => td.innerText).join(",");
            csv += data + "\n";
        }
    });

    // Subject Chart Data
const subjectCtx = document.getElementById('subjectChart').getContext('2d');

let subjectData = {
    "CSE-A": [80, 75, 85],
    "CSE-B": [70, 65, 72],
    "ECE": [60, 70, 65]
};

let currentClass = "all";

let subjectChart = new Chart(subjectCtx, {
    type: 'bar',
    data: {
        labels: ['Math', 'Physics', 'CS'],
        datasets: [{
            label: 'Average Marks',
            data: [75, 70, 74]
        }]
    },
    options: {
        responsive: true
    }
});

// Update Chart based on Filter
document.getElementById("classFilter").addEventListener("change", function () {
    currentClass = this.value;

    if (currentClass === "all") {
        subjectChart.data.datasets[0].data = [75, 70, 74];
    } else {
        subjectChart.data.datasets[0].data = subjectData[currentClass];
    }

    subjectChart.update();

    filterSubjectTable(currentClass);
});

// Filter Subject Table
function filterSubjectTable(cls) {
    const rows = document.querySelectorAll("#subjectTable tbody tr");

    rows.forEach(row => {
        if (cls === "all" || row.getAttribute("data-class") === cls) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "student_report.csv";
    link.click();
}