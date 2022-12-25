const imageCollection = document.querySelector('.image-collection');
const prev = document.querySelector('#previous');
const next = document.querySelector('#next');
const carouselControls = document.querySelector('.carousel-controls');
const carousel = document.querySelector('.carousel');
const imageWidth = 400;
const numOfImages = imageCollection.children.length;
let touchStart = 0;
let touchEnd = 0;
let currentImage = 0;
createNavigation();
setActive();
prev.addEventListener('click', scrollLeft);
next.addEventListener('click', scrollRight);
carousel.addEventListener('touchstart', (e) => {
    touchStart = e.changedTouches[0].screenX;
});
carousel.addEventListener('touchend', (e) => {
    touchEnd = e.changedTouches[0].screenX;
    checkDirection();
})

function checkDirection() {
    if(touchStart < touchEnd) {
        scrollLeft();
    }
    if(touchStart > touchEnd) {
        scrollRight();
    }
}

function createNavigation() {
    for(let i = 0; i < numOfImages; i++) {
        let circle = document.createElement('div');
        circle.classList.add('carousel-navigation');
        circle.addEventListener('click', () => jumpTo(i));
        carouselControls.insertBefore(circle, next);
    }
}

function setActive() {
    const circleNavigation = document.querySelectorAll('.carousel-navigation');
    circleNavigation.forEach((e, index) => {
        e.classList.remove('active');
        if(index === currentImage) {
            e.classList.add('active');
        }
    });
}

function jumpTo(img) {
    currentImage = img;
    repositionCarousel();
    setActive();
}

function scrollRight() {
    if(currentImage < numOfImages - 1) {
        currentImage++;
    }
    repositionCarousel();
    setActive();
}

function scrollLeft() {
    if(currentImage !== 0) {
        currentImage--;
    }
    repositionCarousel();
    setActive();
}

function repositionCarousel() {
    imageCollection.style.transform = `translateX(${imageWidth * -currentImage}px)`;
}