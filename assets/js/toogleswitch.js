var divs = document.querySelectorAll('.show-section section');
var now = 0; // currently shown div

// Hide all divs except the first one
divs.forEach(function(div, index) {
    if (index !== 0) {
        div.style.display = 'none';
    }
});

// Function to handle next button click
function next() {
    divs[now].style.display = 'none';
    now = (now + 1 < divs.length) ? now + 1 : 0;
    divs[now].style.display = 'block'; // show next
    showActiveStep();
}

// Adding click event listener to elements with class "prev"
document.querySelectorAll('.prev').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of anchor tag
        divs[now].style.display = 'none';
        now = (now > 0) ? now - 1 : divs.length - 1;
        divs[now].style.display = 'block'; // show previous
        showActiveStep();
    });
});

// Adding click event listener to button with class "next"
document.querySelector('.next').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of anchor tag
    next();
});

// Function to show active step
function showActiveStep() {
    var stepCounterDivs = document.querySelectorAll(".step-counter-inner div");
    stepCounterDivs.forEach(function(stepCounterDiv, index) {
        stepCounterDiv.classList.remove("active");
        if (index === now) {
            stepCounterDiv.classList.add("active");
        }
    });
}