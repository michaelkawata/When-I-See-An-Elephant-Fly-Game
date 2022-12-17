const block = document.getElementById("block");
const safezone = document.getElementById("safezone");
const character = document.getElementById("character");
const jumping = 0;

// Randomize safe zones
safezone.addEventListener('animationiteration', () => {
    const random = -((Math.random() * 300) + 150);
    safezone.style.top = random + "px";
});

// Create Gravity
setInterval(() => {
    const topOfCharacter = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if (jumping == 0) {
        character.style.top = (topOfCharacter + 3) + "px";
    }
}, 10);

// Create jump function
const jump = () => {
    jumping = 1;
    const jumpCount = 0;
    const jumpInterval = setInterval(() => {
        const topOfCharacter = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if ((topOfCharacter > 6) && (jumpCount < 15)) {
            character.style.top = (topOfCharacter - 5) + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10)
}