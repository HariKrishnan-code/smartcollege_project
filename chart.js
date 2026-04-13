function loadCharts() {

    // BAR CHART - Student Scores
    const ctx1 = document.getElementById('barChart').getContext('2d');

    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Hari', 'Ravi', 'Kumar', 'Priya'],
            datasets: [{
                label: 'Scores',
                data: [85, 70, 90, 75]
            }]
        },
        options: {
            responsive: true
        }
    });

    // PIE CHART - Submission Status
    const ctx2 = document.getElementById('pieChart').getContext('2d');

    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Submitted', 'Pending'],
            datasets: [{
                data: [80, 20]
            }]
        }
    });
}