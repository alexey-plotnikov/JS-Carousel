const carousel = document.querySelector(".carousel");

// SELECT NEXT BUTTON
const nextButton = document.querySelector(".right-btn");

// SELECT LEFT BUTTON
const previousButton = document.querySelector(".left-btn");

const nav = document.querySelector(".nav");

const dots = [...nav.children];

// select all the slides inside the carousel
const slides = [...carousel.children];

// calculate the slide width
let slideWidth = slides[0].getBoundingClientRect().width;

function positionSlides(slides) {
    for (let index = 0; index < slides.length; index++ ) {
        slides[index].style.left = slideWidth * index + "px";
    }
}

positionSlides(slides);

// right button click
nextButton.addEventListener("click", function(){
    const currentSlide = carousel.querySelector(".active");
    const nextSlide = currentSlide.nextElementSibling;
    
    moveToSlide(carousel, currentSlide, nextSlide);
    hideButton(nextSlide, slides);
    moveToDot(nextSlide, slides, nav , dots)
    
});

// left button click
previousButton.addEventListener("click", function(){
    const currentSlide = carousel.querySelector(".active");
    const previousSlide = currentSlide.previousElementSibling;
    
    moveToSlide(carousel, currentSlide, previousSlide);
    hideButton(previousSlide, slides);
    moveToDot(previousSlide, slides, nav , dots)
});

// navigation on dot
nav.addEventListener("click", function(e) {
    
    if (e.target === nav) return;
    // select the clicked dot
    const targetDot = e.target;
    
    // select the crurrent dot 
    const currentDot = nav.querySelector(".active");
          
    // select the current slide
    const currentSlide = carousel.querySelector(".active");
    
    let targetDotIndex = findIndex(targetDot, dots);
    
    const targetSlide = slides[targetDotIndex];
    
    moveToSlide(carousel, currentSlide, targetSlide)
    toggleActive(currentDot, targetDot)
    hideButton(targetSlide, slides)
})

// move to dot
function moveToDot(targetSlide, slides, nav, dots) {
    let slideIndex = findIndex(targetSlide, slides);
    const currentDot = nav.querySelector(".active");
    const targetDot = dots[slideIndex];
    toggleActive(currentDot, targetDot);
}


// move to slide
function moveToSlide(carousel, currentSlide, targetSlide) {
    const position = targetSlide.style.left;
    carousel.style.transform = `translateX(-${position})`;
    toggleActive(currentSlide, targetSlide)
}

function toggleActive(current, target) {
    current.classList.remove("active");
    target.classList.add("active");
}

function hideButton(targetSlide, slides) {
    if (targetSlide === slides[0]) {
        previousButton.classList.add("hide");
        nextButton.classList.remove("hide");
    } else if (targetSlide === slides[slides.length -1]) {
        nextButton.classList.add("hide");
        previousButton.classList.remove("hide");
    } else {
        previousButton.classList.remove("hide");
        nextButton.classList.remove("hide");
    }
}

function findIndex(item, items) {
    for (let index = 0; index < items.length; index++) {
        if (item === items[index]) {
            return index;
        }
    }
}