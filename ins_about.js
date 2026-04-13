// COUNTER ANIMATION
let counters = document.querySelectorAll(".count");

counters.forEach(counter => {
    let update = () => {
        let target = +counter.getAttribute("data-target");
        let count = +counter.innerText;

        let speed = target / 100;

        if(count < target){
            counter.innerText = Math.ceil(count + speed);
            setTimeout(update, 20);
        } else {
            counter.innerText = target;
        }
    };
    update();
});



// AOS INIT
AOS.init({
    duration: 1000
});

let backToTopBtn = document.getElementById("backToTopBtn");

if(backToTopBtn){
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };
}