const container = document.querySelector('.scrolling-screens');
const screens = document.querySelectorAll('.screen');

let currentScreenIndex = 0;

function scrollToScreen(index) {
    if (index >= 0 && index < screens.length) {
        currentScreenIndex = index;
        screens[index].scrollIntoView({ behavior: 'smooth' });
    }
}

function handleScroll(event) {
    const { scrollTop, clientHeight } = event.target.documentElement;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= event.target.scrollHeight;

    if (isAtTop) {
        scrollToScreen(currentScreenIndex - 1);
    }
    else if (isAtBottom) {
        scrollToScreen(currentScreenIndex + 1);
    }
}

container.addEventListener('scroll', handleScroll);

function homePage(){
    window.location.href = "./index.html";
}