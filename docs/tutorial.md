# 🌞 Sunny: Full Game Development Tutorial

> A Dino Runner-style game with retro aesthetics, set in the **One Piece** universe.

---

## 🎮 Overview

**Sunny** is a retro-inspired infinite runner built with HTML, CSS, and pure JavaScript. Inspired by Game Boy graphics and the world of One Piece, players control the ship Sunny to dodge waves, bosses, and other obstacles, aiming to survive as long as possible.

---

## 📋 Requirements

- Basic knowledge of HTML, CSS, and JavaScript
- A modern browser (Chrome or Firefox recommended)
- Code editor (VS Code suggested)

---

## 📁 Project Structure

```
SunnySails/
├── assets/               # Images, audio, and video
├── index.html            # Game structure
├── style.css             # Visual styling
├── script.js             # Game logic
├── README.md             # Project overview
└── tutorial.md           # This full guide
```

---

## 📐 Step 1 – HTML Structure

HTML defines the core layout: start screen, intro video, gameplay canvas, narrative banners, and game over/victory screens.

```html
<canvas id="gameCanvas" style="display: none;"></canvas>

<div id="start-screen">
  <h1>SUNNY SAILS</h1>
  <button id="start-button">START</button>
</div>

<video id="intro-video" width="800" height="400" style="display: none;" muted preload="auto">
  <source src="assets/intro-video.mp4" type="video/mp4">
</video>

<div id="game-over-screen">...</div>
<div id="victory-screen">...</div>

<audio id="bg-music" src="assets/gb-music.mp3" loop></audio>
```

---

## 🎨 Step 2 – CSS Styling

CSS ensures the nostalgic aesthetic with pixel fonts, bold colors, and a centered layout.

Highlights:

```css
body {
  font-family: 'Press Start 2P', monospace;
  background-color: #000;
  color: #306230;
}

canvas {
  border: 4px solid #000;
  margin: 0 auto;
  display: block;
}

#start-screen {
  background-image: url('assets/ocean-bg-light.png');
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

---

## 🧠 Step 3 – JavaScript Logic

### 3.1 Initialize the Canvas

```js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;
```

### 3.2 Player Ship

```js
let ship = {
  x: 50,
  y: 300,
  width: 80,
  height: 80,
  speed: 5
};
```

### 3.3 Movement Handling

```js
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function updateMovement() {
  if (keys['ArrowUp']) ship.y -= ship.speed;
  if (keys['ArrowDown']) ship.y += ship.speed;
}
```

---

## 🌊 Step 4 – Obstacles & Collision

### Create Obstacles (Waves)

```js
function createObstacle() {
  const h = 40 + Math.random() * 40;
  obstacles.push({
    x: canvas.width,
    y: canvas.height - h,
    width: h,
    height: h,
    speed: 4
  });
}
```

### Collision Detection

```js
function detectCollision() {
  for (let o of obstacles) {
    if (
      ship.x < o.x + o.width &&
      ship.x + ship.width > o.x &&
      ship.y < o.y + o.height &&
      ship.y + ship.height > o.y
    ) {
      lives--;
      // trigger blink, show "GAME OVER", etc.
    }
  }
}
```

---

## 👾 Step 5 – Boss, Items & Events

### Sea King (Mini-Boss)

```js
if (score - lastSeaKingSpawn >= 1500) {
  obstacles.push({
    x: canvas.width,
    y: canvas.height - 140,
    width: 120,
    height: 120,
    isSeaKing: true
  });
  lastSeaKingSpawn = score;
}
```

### Navy Boss Battle

The Navy Boss is a major event that triggers after 10,000 points:

- **Entrance Phase**: the Navy ship enters from the right and moves into position.
- **Battle Phase** (15 seconds):
  - Moves vertically between water limits.
  - Fires cannonballs periodically.
  - Cannonballs damage the player on contact unless blinking.
- **Exit Phase**:
  - The boss speeds off to the left.
  - Game pauses and shows the **Victory Screen**.
  - Background music switches to a special boss theme.

Example setup:

```js
function startBossBattle() {
  bossActive = true;
  bossStartTime = Date.now();
  bossShip = { ... };
  bossMusic.play();
}

function updateBoss() {
  if (elapsed < 15) moveBossAndShoot();
  else if (elapsed >= 18) exitBossBattle();
}
```

### Narrative Dialogues

```js
if (score >= 7000 && score < 7700) {
  document.getElementById('garp-banner').style.display = 'flex';
  document.getElementById('luffy-banner').style.display = 'flex';
}
```

---

## 🎵 Step 6 – Audio & Intro Video

### Sync video and background music

```js
startButton.addEventListener('click', () => {
  introVideo.style.display = 'block';
  introVideo.play();
  bgMusic.play();
  introVideo.onended = () => {
    introVideo.style.display = 'none';
    gameLoop();
  };
});
```

---

## 💡 Optional Additions

### ✅ Checkpoint System
- Allow player to resume from boss stage.

### 🎁 Bonus Items
- Extra lives, speed boost, temporary shields.

### 🧩 Championship Mode
- Simulate rounds with score tracking (great for future ML use cases).

---

## 🧪 Testing & Debugging

- Use `console.log()` to debug collisions and event triggers.
- Test on multiple browsers.
- Use DevTools > Network tab to ensure assets load properly.

---

## 🧼 Best Practices

- Use meaningful function and variable names
- Comment complex logic
- Centralize asset paths in constants
- Keep code modular and readable

---

## 🚀 You're Ready! What's Next?

- Deploy on GitHub Pages (steps in `README.md`)
- Share it in dev forums, showcase in your portfolio
- Try converting to TypeScript or using game libraries
