
var vh;

function calculateViewHeight() {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

calculateViewHeight();

window.addEventListener('resize', () => {
    calculateViewHeight();
});

const width = $(window).width()
const height = $(window).height()

const silhouette_padding = 60

const screen_width = 400
const screen_height = 400
const screen_border_width = 5
const screen_border_color = "#000000"

const hideElement = function(element) {
    if(!hasClass(element, 'hidden')) { 
        element.classList.add('hidden');
    }
}

function isElementParentVisible(element) {
    return !element.parentNode.classList.contains('hidden')
}

function hasClass(element, clsName) {
    return(' ' + element.className + ' ').indexOf(' ' + clsName + ' ') > -1;
  }

function showElement(element) {
    element.classList.remove('hidden');
}

function showElementForTime(element, seconds) {
    showElement(element);
    setTimeout(function() {
        hideElement(element);
    }, seconds * 1000);
}
