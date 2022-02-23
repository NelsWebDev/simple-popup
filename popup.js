
function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
  
function enableScroll() {
    window.onscroll = function() {};
}

// get the target popup of a button click
function findOverlay(element){
    if (!(element instanceof HTMLElement)) {
        return;
    }

    let id = element.getAttribute('data-popup');
    if(!id) {
        return;
    }
    return document.getElementById(id);
}

function showOverlay(overlay){
    overlay.classList.add('show');
    disableScroll();
}

function closeOverlay(overlay){
    overlay.classList.remove('show');
    enableScroll();
}

// Event listeners for "show" buttons
let allButtons = document.querySelectorAll('.pop-show');
for (let button of allButtons) {
    let overlayElement = findOverlay(button);
    if(!overlayElement) {
        continue;
    }
    button.addEventListener('click', function(e){
        e.preventDefault();
        showOverlay(overlayElement);
    });
}

let closeButtons = document.querySelectorAll('.pop-close');
// automatically register event listeners for popup close buttons
for (let button of closeButtons) {
    let overlayElement = findOverlay(button);
    if(!overlayElement) {
        continue;
    }

    button.addEventListener('click', function(e){
        e.preventDefault();
        closeOverlay(overlayElement);
    });
}
// close all popups when click outside of them
for(let overlay of document.querySelectorAll('.pop-bg')) {
    overlay.addEventListener('click', function(e){
        let overlay = e.target.parentNode;
        closeOverlay(overlay);
    });
}

