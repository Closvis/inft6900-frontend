const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const slides = document.querySelectorAll('.slide');
const numbersOfSlides = slides.length;
let slideNumber = 0

//slider next button
nextBtn.onclick = () => {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slideNumber++;

    if (slideNumber > (numbersOfSlides-1)) {
        slideNumber = 0;
    }

    slides[slideNumber].classList.add('active');
}
//slider prev button
prevBtn.onclick = () => {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slideNumber--;

    if (slideNumber < 0) {
        slideNumber = numbersOfSlides -1;
    }

    slides[slideNumber].classList.add('active');
}