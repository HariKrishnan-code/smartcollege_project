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
        window.location.href="studentlogin.html";
    },1500);
}

function goStaff(){
    showLoader();
    setTimeout(()=>{
        window.location.href="stafflogin.html";
    },1500);
}
function goInstitution() {
    document.getElementById("loader").style.display = "flex";

    setTimeout(() => {
        window.location.href = "institution login.html";
    }, 1000);
}