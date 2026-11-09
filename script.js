let timeRemaining = 1800;
const timerElement = document.getElementById('timer');
const screenElement = document.getElementById('screen');
const glitchVideo = document.getElementById('glitch-video');
const warningText = document.getElementById('warning-text');

const countdown = setInterval(() => {
    if (timeRemaining <= 0) {
        clearInterval(countdown);
        timerElement.innerText = "00.00";
        triggerGameOver();
        return;
    }
    timeRemaining--;
    displayTime();
}, 1000);

function displayTime() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    minutes = minutes <10 ? '0' + minutes : minutes;
    seconds = seconds <10 ? '0' + seconds : seconds;
    timerElement.innerText = `${minutes}:${seconds}`;
}

function triggerTimePenalty(secondsToSubtract) {
    timeRemaining -= secondsToSubtract;
    if (timeRemaining <0) timeRemaining = 0;
    displayTime();

    glitchVideo.classList.remove('hidden');
    glitchVideo.play();
    screenElement.classList.add('penalty-flash');
    warningText.classList.remove('hidden');

    setTimeout(() => {
        glitchVideo.classList.add('hidden');
        glitchVideo.pause();
        glitchVideo.currentTime = 0;
        screenElement.classList.remove('penalty-flash');
        warningText.classList.add('hidden');
    }, 3000);
}

function triggerGameOver() {
    timerElement.innerText = "SYSTEM LOCKED";
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'p' || event.key ==='P') {
        triggerTimePenalty(300);
    }
});