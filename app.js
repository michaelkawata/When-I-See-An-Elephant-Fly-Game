const block = document.getElementById("block");
const safezone = document.getElementById("safezone");
const character = document.getElementById("character")

// Randomize safe zones
safezone.addEventListener('animationiteration', () => {
    const random = (Math.random() * 3)
    const top = (random * 100) + 150;
    safezone.style.top = -(top) + "px";
});

// Create Gravity
setInterval(function () {
    const topOfCharacter = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    character.style.top = (topOfCharacter + 3) + "px";
}, 10);