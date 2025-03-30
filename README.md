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
