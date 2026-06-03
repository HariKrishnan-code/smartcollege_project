let students = [
    {id: 101, name: "Hari", dept: "CSE", email: "hari@mail.com", status: "Active"},
    {id: 102, name: "Priya", dept: "ECE", email: "priya@mail.com", status: "Inactive"}
];

let editIndex = -1;

// LOAD TABLE
function displayStudents(data = students) {
    let tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = "";

    data.forEach((s, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.dept}</td>
            <td>${s.email}</td>
            <td class="${s.status.toLowerCase()}">${s.status}</td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

// OPEN FORM
function openForm() {
    document.getElementById("popup").style.display = "block";
}

// CLOSE FORM
function closeForm() {
    document.getElementById("popup").style.display = "none";
    clearForm();
}

// SAVE STUDENT
function saveStudent() {
    let name = document.getElementById("name").value;
    let dept = document.getElementById("dept").value;
    let email = document.getElementById("email").value;
    let status = document.getElementById("status").value;

    if(name === "" || dept === "" || email === "") {
        alert("Fill all fields");
        return;
    }

    if(editIndex === -1) {
        students.push({
            id: Date.now(),
            name, dept, email, status
        });
    } else {
        students[editIndex] = {id: students[editIndex].id, name, dept, email, status};
        editIndex = -1;
    }

    displayStudents();
    closeForm();
}

// EDIT
function editStudent(index) {
    let s = students[index];

    document.getElementById("name").value = s.name;
    document.getElementById("dept").value = s.dept;
    document.getElementById("email").value = s.email;
    document.getElementById("status").value = s.status;

    editIndex = index;
    openForm();
}

// DELETE
function deleteStudent(index) {
    if(confirm("Delete student?")) {
        students.splice(index, 1);
        displayStudents();
    }
}

// SEARCH
function searchStudent() {
    let value = document.getElementById("search").value.toLowerCase();

    let filtered = students.filter(s =>
        s.name.toLowerCase().includes(value) ||
        s.dept.toLowerCase().includes(value)
    );

    displayStudents(filtered);
}

// INIT
displayStudents();


function updateAnalytics() {
    let total = students.length;
    let active = students.filter(s => s.status === "Active").length;
    let inactive = students.filter(s => s.status === "Inactive").length;

    document.getElementById("totalStudents").innerText = total;
    document.getElementById("activeStudents").innerText = active;
    document.getElementById("inactiveStudents").innerText = inactive;

    // STATUS CHART
    new Chart(document.getElementById("statusChart"), {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Inactive'],
            datasets: [{
                data: [active, inactive]
            }]
        }
    });

    // DEPARTMENT COUNT
    let deptCount = {};
    students.forEach(s => {
        deptCount[s.dept] = (deptCount[s.dept] || 0) + 1;
    });

    new Chart(document.getElementById("deptChart"), {
        type: 'bar',
        data: {
            labels: Object.keys(deptCount),
            datasets: [{
                label: 'Students',
                data: Object.values(deptCount)
            }]
        }
    });
}

