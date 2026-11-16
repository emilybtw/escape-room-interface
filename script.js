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
    glitchVideo.classList.remove('hidden');
    glitchVideo.play();
    screenElement.classList.add('penalty-flash');
    warningText.classList.remove('hidden');

    let totalSubtracted = 0;
    const rollbackInterval = setInterval(() => {
        if (totalSubtracted < secondsToSubtract && timeRemaining >0) {
            timeRemaining -= 5;
            totalSubtracted += 5;
            displayTime();
        } else {
            clearInterval(rollbackInterval);
        }
    }, 50);

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

const socket = new WebSocket('ws://127.0.0.1:8080');

socket.onopen = () => {
    console.log("Main Clock Screen successfully linked to the game network server!");
};

socket.onmessage = (event) => {
    const cleanMessage = String(event.data).trim();
    if (cleanMessage === 'TRIGGER_PENALTY') {
        triggerTimePenalty(300);
    }
    else if (cleanMessage === 'GAME_WON') {
        clearInterval(countdown);

        document.getElementById('bg-video').classList.add('hidden');

        timerElement.innerText = "ACCESS GRANTED";
        timerElement.style.fontSize = "10rem";
        timerElement.style.webkitTextStroke = "3px #00ff99";
        timerElement.style.filter = "drop-shadow(0 0 10px #00ff99) drop-shadow(0 0 35px #00ff99)";

        document.querySelector('.system-status').innerText = "SYSTEM SECURED";
        document.querySelector('.system-status').style.color = "#00ff99";
        document.querySelector('.system-status').style.textShadow = "0 0 10px #00ff99";

        console.log("VICTORY ROUTINE: Game successfully locked out.");
    }
};