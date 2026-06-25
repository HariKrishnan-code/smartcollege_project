let fees = JSON.parse(localStorage.getItem("fees")) || [
    {name:"Hari", total:50000, paid:20000},
    {name:"Priya", total:50000, paid:50000}
];

let currentIndex = -1;

// DISPLAY
function display(){
    let tbody = document.querySelector("#table tbody");
    tbody.innerHTML = "";

    fees.forEach((f,i)=>{
        let due = f.total - f.paid;

        tbody.innerHTML += `
        <tr>
            <td>${f.name}</td>
            <td>${f.total}</td>
            <td>${f.paid}</td>
            <td>${due}</td>

    <td>
        <button class="add-fee" onclick="openAddFee(${i})">+ Fee</button>
        <button class="pay-fee" onclick="openPay(${i})">Pay</button>
    </td>

    <td>
        <button class="receipt" onclick="receipt(${i})">PDF</button>
    </td>
</tr>`;
    });

    update();
}

// ANALYTICS
function update(){
    let total = fees.reduce((a,b)=>a+b.total,0);
    let paid = fees.reduce((a,b)=>a+b.paid,0);
    let due = total - paid;

    document.getElementById("total").innerText = total;
    document.getElementById("paid").innerText = paid;
    document.getElementById("due").innerText = due;

    new Chart(document.getElementById("chart"), {
        type: 'doughnut',
        data: {
            labels:['Paid','Due'],
            datasets:[{data:[paid,due]}]
        },
        options:{ maintainAspectRatio:false }
    });
}

// PAYMENT
function openPay(i){
    currentIndex = i;
    document.getElementById("popup").style.display="block";
    document.getElementById("pname").value = fees[i].name;
}

function closePop(){
    document.getElementById("popup").style.display="none";
}

function pay(){
    let amt = +document.getElementById("amount").value;

    let due = fees[currentIndex].total - fees[currentIndex].paid;

    if(amt <= 0 || amt > due){
        alert("Invalid amount!");
        return;
    }

    fees[currentIndex].paid += amt;

    localStorage.setItem("fees", JSON.stringify(fees));

    display();
    closePop();
}

// PDF RECEIPT
function receipt(i){
    let { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    let f = fees[i];
    let due = f.total - f.paid;

    doc.text("Fee Receipt", 20, 20);
    doc.text(`Name: ${f.name}`, 20, 40);
    doc.text(`Total: ${f.total}`, 20, 50);
    doc.text(`Paid: ${f.paid}`, 20, 60);
    doc.text(`Due: ${due}`, 20, 70);

    doc.save("receipt.pdf");
}

// OPEN ADD FORM
function openAddStudent(){
    document.getElementById("addPopup").style.display="block";
}

function closeAdd(){
    document.getElementById("addPopup").style.display="none";
}

// ADD NEW STUDENT
function addStudent(){
    let name = document.getElementById("sname").value;
    let total = +document.getElementById("stotal").value;

    if(name === "" || total <= 0){
        alert("Enter valid data");
        return;
    }

    fees.push({
        name: name,
        total: total,
        paid: 0
    });

    localStorage.setItem("fees", JSON.stringify(fees));

    display();
    closeAdd();
}

function openAddFee(i){
    currentIndex = i;
    document.getElementById("addFeePopup").style.display = "flex";
    document.getElementById("addName").value = fees[i].name;
}

function closeAddFee(){
    document.getElementById("addFeePopup").style.display = "none";
}

function addFee(){
    let amt = +document.getElementById("addAmount").value;

    if(amt <= 0){
        alert("Invalid amount");
        return;
    }

    fees[currentIndex].total += amt;

    localStorage.setItem("fees", JSON.stringify(fees));

    display();
    closeAddFee();
}

function openPay(i){
    currentIndex = i;
    document.getElementById("payPopup").style.display = "flex";
    document.getElementById("payName").value = fees[i].name;
}

function closePay(){
    document.getElementById("payPopup").style.display = "none";
}

function payFee(){
    let amt = +document.getElementById("payAmount").value;

    let due = fees[currentIndex].total - fees[currentIndex].paid;

    if(amt <= 0 || amt > due){
        alert("Invalid payment amount");
        return;
    }

    fees[currentIndex].paid += amt;

    localStorage.setItem("fees", JSON.stringify(fees));

    display();
    closePay();
}



// INIT
display();