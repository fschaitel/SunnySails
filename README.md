# 🌞 Sunny Sails

**Sunny Run** is a retro-inspired 2D runner game made with HTML, CSS, and JavaScript.  
It's a personal experiment — my first full game project — blending pixel art, Game Boy aesthetics, and basic game mechanics into a playful learning experience.

> 🎮 **Play now:** [Click here to play Sunny on GitHub Pages](https://fschaitel.github.io/SunnySails/)  

---

## 🎯 Objectives

- Build a complete web-based game from scratch
- Explore game loops, animation, and canvas rendering
- Use pixel art for visual design
- Handle collision detection and user input
- Add audio and simple UI flow

---

## 🛠️ Built With

- **HTML5** – structure and canvas
- **CSS3** – layout, start screen, and styling
- **JavaScript (Vanilla)** – game loop, logic, events
- **Pixel Art** – custom retro-style sprites
- **MP3 Audio** – looping background music (chiptune)

---

## 🧠 How It Works

- The game starts with a **black & white intro screen** and a **START button**
- Upon clicking START:
  - The canvas is revealed
  - The background music begins to play in a loop
  - The player controls the ship "Sunny" using the arrow keys
- **↑ / ↓** move the ship vertically (but it can't go into the sky!)
- **← / →** move the ship horizontally across the screen
- **Waves** appear as obstacles from the right in randomized positions and sizes
- Colliding with a wave ends the game with a **white "GAME OVER"** message

---

## ▶️ How to Play

- Press `START`
- Use `↑ ↓ ← →` arrow keys to steer the ship
- Avoid the waves!
- The longer you survive, the higher your score

---

## 🧪 Educational Highlights

This project covers core game development concepts:

- Game loop using `requestAnimationFrame`
- 2D canvas rendering
- Basic physics and movement
- Random obstacle generation
- Collision detection with hitbox padding
- UI flow (start → play → game over)
- Audio integration with JS

---


---

## 🆕 Update v1.1 - Retro Aesthetic, Game Over Screen & Tweaks (2025-03-29)

### Visual & UI
- Full **Game Boy-inspired aesthetic**: green monochrome palette and pixel font
- Updated **start screen** to match retro style
- New **GAME OVER screen** with final score and **RESTART** button

### Gameplay Changes
- Waves now **come from the right to the left**
- **Hitbox reduced** for fairer collisions
- Background uses **smooth parallax scrolling**
- Player can **restart the game** after losing without refreshing the page


## 📁 Project Structure

```
SunnySails/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── ocean-bg-light.png
    ├── sunny-8bit.png
    ├── wave.png
    └── gb-music.mp3
```

---

## 🚀 Run Locally

```bash
git clone https://github.com/your-username/SunnySails.git
cd SunnySails
# Use Live Server (VS Code extension) or any local HTTP server
```

> 💡 Don't open with `file://`. Use Live Server to avoid audio/image loading issues.

---

## 🌐 Host Online (GitHub Pages)

1. Push this project to a public GitHub repository
2. Go to **Settings > Pages**
3. Set **Source: main / root**
4. After publishing, your game will be live at:
```
https://your-username.github.io/SunnySails/
```

---

## 📜 License

This project is open for learning and fun.  
You may reuse the code freely. Please credit or replace visuals/audio if you plan to publish it elsewhere.

---

## 👨‍💻 Author

Created with curiosity and pixel love  
by **Felipe Schaitel**  
📅 2025-03-30


## 🆕 Update v1.3.0 – Sea King, Diagonal Movement & Speed Boost (2025-03-30)

### Gameplay Mechanics
- 🐉 **Sea King** added as a new boss-style obstacle that appears every **1500 points**
- ⚡ **Progressive acceleration**: the ship becomes faster with each Sea King encounter (max speed 10)
- 🎮 **Diagonal movement** using multiple keys (e.g. `↑ + →`) for more fluid control
- 🎯 **Hitbox adjusted**: Sea King's collision area reduced for fairness
- 🌊 **Wave conflict prevention**: Sea King and wave cannot spawn at the same time
- 🔁 Game restart now resets all states without visual glitches

### Code & Performance
- Full **refactor of movement system** using `keydown` / `keyup` events
- Cleaned up **syntax bugs and duplication** (`padding`, `break`, extra brackets)
- Game loop and collision detection **fully stabilized**

## 🆕 Update v1.4.0 – Intro Video & Music Sync (2025-03-30)

### Intro & Audio
- 🎬 Added an **intro video** (`intro-video.mp4`) that plays when the player clicks START
- 🔇 The video is **muted by default**, preserving music clarity
- 🎵 Background music (`gb-music.mp3`) now starts **alongside the video**, not after gameplay begins
- ⏱️ Game begins **only after the video finishes playing**

### Code Updates
- Modified `index.html` to include a `<video>` element before the canvas
- Updated `script.js` to handle:
  - Playing the intro video and syncing it with the music
  - Starting the game loop after the video ends
  - Fallback behavior: if video fails to play, game starts immediately

### Assets
- New asset: `intro-video.mp4` added to `assets/` directory

- ## 🆕 Update v1.4.1 – Enhanced 8-bit UI (2025-03-30)

### Visual & UI
- 🖼️ Redesigned **START** and **GAME OVER** screens with 8-bit background (`ocean-bg-light.png`)
- 🕹️ Stylized retro buttons and text using pixel font and vibrant arcade colors
- 🌊 Stronger visual coherence with updated pixel art sprites and retro aesthetics

