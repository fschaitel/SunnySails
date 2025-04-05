# 🌞 Sunny: Tutorial Completo de Desenvolvimento

> Um jogo no estilo Dino Runner com estética retrô, ambientado no universo de **One Piece**.

---

## 🎮 Visão Geral

**Sunny Sails** é um jogo de corrida infinita inspirado no visual do Game Boy, feito com HTML, CSS e JavaScript puro. O jogador controla o navio Sunny, desviando de ondas, chefes e outros perigos para sobreviver o maior tempo possível.

---

## 📋 Requisitos

- Conhecimento básico de HTML, CSS e JavaScript
- Navegador moderno (recomenda-se Chrome ou Firefox)
- Editor de código (VS Code sugerido)

---

## 📁 Estrutura do Projeto

```
SunnySails/
├── assets/               # Imagens, áudio e vídeo
├── index.html            # Estrutura do jogo
├── style.css             # Estilos visuais
├── script.js             # Lógica do jogo
├── README.md             # Apresentação do projeto
└── tutorial.md           # Este guia completo
```

---

## 📀 Etapa 1 – Estrutura HTML

O HTML define os principais elementos: tela inicial, vídeo de introdução, canvas do jogo, banners narrativos e telas de derrota/vitória.

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

## 🎨 Etapa 2 – Estilo com CSS

O CSS garante uma estética nostálgica com fontes pixeladas, cores vibrantes e layout centralizado.

Destaques:

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

## 🧠 Etapa 3 – Lógica com JavaScript

### 3.1 Inicialização do Canvas

```js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;
```

### 3.2 Navio Jogador

```js
let ship = {
  x: 50,
  y: 300,
  width: 80,
  height: 80,
  speed: 5
};
```

### 3.3 Controle de Movimento

```js
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function updateMovement() {
  if (keys['ArrowUp']) ship.y -= ship.speed;
  if (keys['ArrowDown']) ship.y += ship.speed;
}
```

---

## 🌊 Etapa 4 – Obstáculos e Colisão

### Criar Obstáculos (Ondas)

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

### Detecção de Colisão

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
      // piscar, mostrar "GAME OVER", etc.
    }
  }
}
```

---

## 👾 Etapa 5 – Chefes, Itens e Eventos

### Sea King (Mini-Chefe)

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

### Batalha Contra o Chefe da Marinha

O chefe da Marinha é um evento especial que ocorre após 10.000 pontos:

- **Entrada**: o navio da Marinha entra pela direita e se posiciona.
- **Fase de Batalha** (15 segundos):
  - Movimenta-se verticalmente na área aquática.
  - Atira canhões periodicamente.
  - Causam dano ao jogador em caso de colisão (exceto se piscando).
- **Saída**:
  - O chefe acelera para a esquerda.
  - O jogo pausa e mostra a **Tela de Vitória**.
  - A trilha sonora muda para o tema do chefe.

Exemplo:

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

### Diálogos Narrativos

```js
if (score >= 7000 && score < 7700) {
  document.getElementById('garp-banner').style.display = 'flex';
  document.getElementById('luffy-banner').style.display = 'flex';
}
```

---

## 🎵 Etapa 6 – Vídeo e Áudio

### Sincronizar vídeo e música de fundo

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

## 🧪 Testes e Debug

- Use `console.log()` para depurar colisões e eventos.
- Teste em navegadores diferentes.
- Use DevTools > Rede para checar carregamento de assets.

---
