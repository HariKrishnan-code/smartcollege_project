let staff = [
    {id: 1, name: "Kumar", dept: "CSE", email: "kumar@mail.com", status: "Active"},
    {id: 2, name: "Anita", dept: "ECE", email: "anita@mail.com", status: "Inactive"}
];

let editIndex = -1;

// DISPLAY
function displayStaff(data = staff) {
    let tbody = document.querySelector("#staffTable tbody");
    tbody.innerHTML = "";

    data.forEach((s, i) => {
        tbody.innerHTML += `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.dept}</td>
            <td>${s.email}</td>
            <td class="${s.status.toLowerCase()}">${s.status}</td>
            <td>
                <button onclick="editStaff(${i})">Edit</button>
                <button onclick="deleteStaff(${i})">Delete</button>
            </td>
        </tr>`;
    });
}

// ADD / EDIT
function openForm() {
    document.getElementById("popup").style.display = "block";
}

function closeForm() {
    document.getElementById("popup").style.display = "none";
}

function saveStaff() {
    let name = document.getElementById("name").value;
    let dept = document.getElementById("dept").value;
    let email = document.getElementById("email").value;
    let status = document.getElementById("status").value;

    if(editIndex === -1) {
        staff.push({id: Date.now(), name, dept, email, status});
    } else {
        staff[editIndex] = {id: staff[editIndex].id, name, dept, email, status};
        editIndex = -1;
    }

    displayStaff();
    updateAnalytics();
    closeForm();
}

// EDIT
function editStaff(i) {
    let s = staff[i];
    document.getElementById("name").value = s.name;
    document.getElementById("dept").value = s.dept;
    document.getElementById("email").value = s.email;
    document.getElementById("status").value = s.status;

    editIndex = i;
    openForm();
}

// DELETE
function deleteStaff(i) {
    if(confirm("Delete staff?")) {
        staff.splice(i, 1);
        displayStaff();
        updateAnalytics();
    }
}

// SEARCH
function searchStaff() {
    let val = document.getElementById("search").value.toLowerCase();

    let filtered = staff.filter(s =>
        s.name.toLowerCase().includes(val) ||
        s.dept.toLowerCase().includes(val)
    );

    displayStaff(filtered);
}

// ANALYTICS
function updateAnalytics() {
    let total = staff.length;
    let active = staff.filter(s => s.status === "Active").length;
    let inactive = staff.filter(s => s.status === "Inactive").length;

    document.getElementById("total").innerText = total;
    document.getElementById("active").innerText = active;
    document.getElementById("inactive").innerText = inactive;

    new Chart(document.getElementById("statusChart"), {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Inactive'],
            datasets: [{ data: [active, inactive] }]
        }
    });

    let deptCount = {};
    staff.forEach(s => {
        deptCount[s.dept] = (deptCount[s.dept] || 0) + 1;
    });

    new Chart(document.getElementById("deptChart"), {
        type: 'bar',
        data: {
            labels: Object.keys(deptCount),
            datasets: [{ data: Object.values(deptCount) }]
        }
    });
}

// INIT
displayStaff();
updateAnalytics();

