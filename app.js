const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");
let jumping = 0;
let counter = 0;

const game = document.getElementById("game");

let counterElement = document.createElement("div");
game.appendChild(counterElement)

let start = document.createElement("button");
start.textContent = "Start";
start.classList.add("start");

start.addEventListener("click", () => {
    play()
})

game.appendChild(start)

let gameOver = document.createElement("div");
game.appendChild(gameOver);

const play = () => {
    console.log("play")
    gameOver.textContent = ""
    counterElement.textContent = `0`
    block.classList.add("block-animation")
    hole.classList.add("block-animation")

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
        if ((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
            gameOver.textContent = `Game Over - Score: ${counter - 1}`
            character.style.top = 100 + "px";
            counter = 0;
            clearInterval(gravityInterval)
            clearInterval(hitInterval)
            // stopping block animation
            block.classList.remove("block-animation")
            hole.classList.remove("block-animation")
            hole.removeEventListener('animationiteration', randomHole)
        }
    }, 10);

    // Create jump function
    function jump() {
        jumping = 1;
        let jumpCount = 0;
        let jumpInterval = setInterval(function () {
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            if ((characterTop > 6) && (jumpCount < 15)) {
                character.style.top = (characterTop - 5) + "px";
            }
            if (jumpCount > 20) {
                clearInterval(jumpInterval);
                jumping = 0;
                jumpCount = 0;
            }
            jumpCount++;
        }, 10);
    }

    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '38') {
            jump()
        }
    }
}