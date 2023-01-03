const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");
const music = new Audio('assets/DumboAudio.mp3');
music.loop = true;
const flap = new Audio('assets/FlapSoundEffect.mp3');
flap.volume = 0.3;
let jumping = 0;
let counter = 0;

const game = document.getElementById("game");

// Create live counter
let counterElement = document.createElement("div");
game.appendChild(counterElement)
counterElement.classList.add("counter-element");

// Highest score local storage
let highestScoreLocal = document.createElement("div");
highestScoreLocal.textContent = `High Score: ${localStorage.getItem('Highest Score')}`;
highestScoreLocal.classList.add("high-score");
game.appendChild(highestScoreLocal);

// Create start button
let start = document.createElement("button");
start.textContent = "START";
start.classList.add("start");
start.addEventListener("click", () => {
    play()
})
game.appendChild(start)

// Ends game
let gameOver = document.createElement("div");
game.appendChild(gameOver);
gameOver.classList.add("hidden");
gameOver.classList.add("game-over");

let gameOverText = document.createElement("div");
gameOver.appendChild(gameOverText);

// Create gameover image
let gameOverImage = document.createElement("img");
gameOverImage.classList.add("gameover-dumbo")
gameOverImage.src = "assets/gameover.png";
gameOver.appendChild(gameOverImage);

const play = () => {

    music.play()
    console.log("play")
    gameOverText.textContent = ""
    counterElement.textContent = `0`
    block.classList.add("block-animation")
    hole.classList.add("block-animation")
    start.style.visibility = "hidden";
    gameOver.classList.add("hidden");
    character.style.visibility = 'visible';

    // Create jump function
    function jump() {
        flap.pause();
        flap.currentTime = 0;
        flap.play();
        jumping = 1;
        let jumpCount = 0;
        let jumpInterval = setInterval(function () {
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            if ((characterTop > 6) && (jumpCount < 15)) {
                character.style.top = (characterTop - 4) + "px";
            }
            if (jumpCount > 20) {
                clearInterval(jumpInterval);
                jumping = 0;
                jumpCount = 0;
            }
            jumpCount++;
        }, 8);
    }

    // click function
    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '38') {
            jump()
        }
    }

    // Randomize safe zones
    const randomHole = () => {
        let random = -((Math.random() * 300) + 150);
        hole.style.top = random + "px";
        counter++;
        counterElement.textContent = `${counter}`
    }
    hole.addEventListener('animationiteration', randomHole);

    // Create gravity
    let gravityInterval;
    gravityInterval = setInterval(function () {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if (jumping == 0) {
            character.style.top = (characterTop + 3) + "px";
        }
    }, 10)

    // Create hit detection
    let hitInterval;
    hitInterval = setInterval(function () {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
        let cTop = -(500 - characterTop);
        if ((characterTop > 480) || ((blockLeft < 90) && (blockLeft > -50) && ((cTop < holeTop - 10) || (cTop > holeTop + 130)))) {
            gameOverText.textContent = `Game Over - Score: ${counter}`
            let currentHighScore = localStorage.getItem('Highest Score');
            if (!currentHighScore || currentHighScore < counter) {
                localStorage.setItem('Highest Score', counter)
                highestScoreLocal.textContent = `High Score: ${localStorage.getItem('Highest Score')}`;
            }
            music.pause();
            music.currentTime = 0;
            character.style.top = 100 + "px";
            character.style.visibility = 'hidden'
            counter = 0;
            clearInterval(gravityInterval)
            clearInterval(hitInterval)
            // stopping block animation
            block.classList.remove("block-animation")
            hole.classList.remove("block-animation")
            hole.removeEventListener('animationiteration', randomHole)
            start.style.visibility = "visible";
            gameOver.classList.remove("hidden");
        }
    }, 10);
}
