# SunnySails: Complete Tutorial for Developing a Dino Runner-Style Game

## Introduction

SunnySails is a game inspired by Google's classic Dino Runner, set in the One Piece universe, particularly featuring Monkey D. Luffy and his ship, the Thousand Sunny. This guide provides a detailed tutorial on creating the game using HTML, CSS, and JavaScript, including additional features like life systems, high scores, simple animations, and classic arcade mechanics.

---

## Project Goals

- Develop a simple, pixel art (8-bit) style game.
- Implement a local high score system.
- Add basic animations and classic arcade-style mechanics.

---

## Project Structure

```
SunnySails/
├── assets/
│   └── images/
├── css/
│   └── style.css
├── js/
│   └── script.js
└── index.html
```

---

## Step-by-Step Guide

### 1. Basic HTML
Create an `index.html` file as the main structure of the game.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SunnySails</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <canvas id="gameCanvas" width="800" height="400"></canvas>
  <script src="js/script.js"></script>
</body>
</html>
```

### 2. CSS Styling
The `style.css` file defines the visual appearance:
```css
body {
  margin: 0;
  padding: 0;
  background-color: #87CEEB;
}
canvas {
  display: block;
  margin: 0 auto;
  border: 3px solid #000;
}
```

### 3. JavaScript – Basic Mechanics
In the `script.js` file, initialize the canvas:
```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ship = { x: 50, y: 200, width: 80, height: 40 };

function drawShip() {
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  requestAnimationFrame(update);
}
update();
```

### 4. Adding Obstacles
Create periodic obstacles for the ship to avoid:
```javascript
let obstacles = [];

function createObstacle() {
  obstacles.push({ x: canvas.width, y: 220, width: 30, height: 30 });
}

setInterval(createObstacle, 2000);

function drawObstacles() {
  ctx.fillStyle = '#000';
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    obs.x -= 3;
  });
}

// Update the update() function
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  drawObstacles();
  requestAnimationFrame(update);
}
```

### 5. Implementing Collision Detection and Lives

Add a life system with visual feedback:
```javascript
let lives = 3;

function checkCollision() {
  obstacles.forEach(obs => {
    if (ship.x < obs.x + obs.width && ship.x + ship.width > obs.x && ship.y < obs.y + obs.height && ship.y + ship.height > obs.y) {
      lives--;
      shipBlink();
    }
  });
}

function shipBlink() {
  let visible = true;
  const blink = setInterval(() => {
    visible = !visible;
    ctx.globalAlpha = visible ? 1 : 0;
    if (lives <= 0) clearInterval(blink);
  }, 200);

  setTimeout(() => clearInterval(blink), 2000);
}

// Include this inside the update() function
checkCollision();
```

---

## High Score System

Save scores locally using localStorage:
```javascript
function updateHighScore(currentScore) {
  let scores = JSON.parse(localStorage.getItem('highScores')) || [];
  scores.push(currentScore);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 3);
  localStorage.setItem('highScores', JSON.stringify(scores));
}
```

---

## Pause and Additional Controls

Pause the game using the "P" key:
```javascript
let paused = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'p') paused = !paused;
});

function update() {
  if (paused) return requestAnimationFrame(update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  drawObstacles();
  checkCollision();
  requestAnimationFrame(update);
}
```

---

## Final Thoughts

This tutorial covers the main mechanics and aspects already implemented in SunnySails. Following these steps, you'll have a functional game featuring essential gameplay mechanics and simple arcade-style animations. The modular structure allows for further development and addition of more complex visual effects and mechanics inspired by the One Piece universe.

---

Good luck with your project, and fair winds for SunnySails!

