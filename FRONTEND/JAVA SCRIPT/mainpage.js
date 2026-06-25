function toggleTheme(){
    document.body.classList.toggle("dark");

}

/* LOADER */
function showLoader(){
    document.getElementById("loader").classList.add("active");
}

/* NAVIGATION */
function goStudent(){
    showLoader();
    setTimeout(()=>{
        window.location.href="../HTML/studentlogin.html";
    },1000);
}

function goStaff(){
    showLoader();
    setTimeout(()=>{
        window.location.href="../HTML/stafflogin.html";
    },1000);
}
function goInstitution() {
    document.getElementById("loader").style.display = "flex";

    setTimeout(() => {
        window.location.href = "../HTML/institution login.html";
    }, 1000);
}