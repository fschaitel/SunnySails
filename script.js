const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const SKY_LIMIT = 180;

let ship = {
  x: 50,
  y: canvas.height - 120,
  width: 80,
  height: 80,
  speed: 5
};

let obstacles = [];
let gameOver = false;
let score = 0;
let lives = 3;
let blinking = false;
let invincible = false;
let highScore = localStorage.getItem('sunnyHighScore') || 0;
let lastSeaKingSpawn = 0;
let skipNextObstacle = false;
let keys = {};

// Imagens
const bgImage = new Image();
bgImage.src = 'assets/ocean-bg-light.png';

const shipImage = new Image();
shipImage.src = 'assets/sunny-8bit.png';

const waveImage = new Image();
waveImage.src = 'assets/wave.png';

const seaKingImage = new Image();
seaKingImage.src = 'assets/sea-king.png';
seaKingImage.onerror = () => console.warn('⚠️ sea-king.png não foi carregado');

let bgX = 0;
let bgSpeed = 0.5;

function drawBackground() {
  bgX -= bgSpeed;
  if (bgX <= -canvas.width) bgX = 0;
  ctx.drawImage(bgImage, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, bgX + canvas.width, 0, canvas.width, canvas.height);
}

function drawShip() {
  if (!blinking || Math.floor(Date.now() / 100) % 2 === 0) {
    ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
  }
}

function createObstacle() {
  const minHeight = 40;
  const maxHeight = 80;
  const height = minHeight + Math.random() * (maxHeight - minHeight);
  const minY = canvas.height / 2;
  const maxY = canvas.height - height;
  const y = minY + Math.random() * (maxY - minY);
  obstacles.push({
    x: canvas.width,
    y: y,
    width: height,
    height: height,
    isSeaKing: false
  });
}

function createSeaKing() {
  obstacles.push({
    x: canvas.width,
    y: canvas.height - 140,
    width: 120,
    height: 120,
    isSeaKing: true
  });
  ship.speed = Math.min(ship.speed + 0.5, 10);
  skipNextObstacle = true;
}

function drawObstacles() {
  for (let obs of obstacles) {
    if (obs.isSeaKing) {
      ctx.drawImage(seaKingImage, obs.x, obs.y, obs.width, obs.height);
    } else {
      ctx.drawImage(waveImage, obs.x, obs.y, obs.width, obs.height);
    }
  }
}

function updateObstacles() {
  for (let obs of obstacles) {
    obs.x -= 4;
  }
  obstacles = obstacles.filter(obs => obs.x + obs.width > 0);
}

function detectCollision() {
  if (invincible) return;

  for (let obs of obstacles) {
    const padding = obs.isSeaKing ? 40 : 22;
    const obsX = obs.x + padding;
    const obsY = obs.y + padding;
    const obsWidth = obs.width - padding * 2;
    const obsHeight = obs.height - padding * 2;

    if (
      ship.x < obsX + obsWidth &&
      ship.x + ship.width > obsX &&
      ship.y < obsY + obsHeight &&
      ship.y + ship.height > obsY
    ) {
      lives--;
      triggerBlink();
      if (lives <= 0) {
        gameOver = true;
      }
      break;
    }
  }
}

function triggerBlink() {
  blinking = true;
  invincible = true;
  setTimeout(() => {
    blinking = false;
    invincible = false;
  }, 1000);
}

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function drawLives() {
  const size = 20;
  const gap = 10;
  for (let i = 0; i < lives; i++) {
    ctx.fillStyle = 'black';
    ctx.fillRect(canvas.width - (size + gap) * (i + 1), 10, size, size);
  }
}

function updateMovement() {
  if (keys['ArrowUp'] && ship.y > SKY_LIMIT) {
    ship.y -= ship.speed;
  }
  if (keys['ArrowDown'] && ship.y + ship.height < canvas.height) {
    ship.y += ship.speed;
  }
  if (keys['ArrowRight'] && ship.x + ship.width < canvas.width) {
    ship.x += ship.speed;
  }
  if (keys['ArrowLeft'] && ship.x > 0) {
    ship.x -= ship.speed;
  }
}

function gameLoop() {
  updateMovement();

  if (gameOver) {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('sunnyHighScore', highScore);
    }
    canvas.style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'flex';
    document.getElementById('final-score').textContent = `Score: ${score}`;
    document.getElementById('best-score').textContent = `🏆 Best Score: ${highScore}`;
    return;
  }

  drawBackground();
  drawShip();
  drawObstacles();
  updateObstacles();
  detectCollision();
  drawScore();
  drawLives();

  score++;
  if (score % 100 === 0) {
    if (!skipNextObstacle) {
      createObstacle();
    } else {
      skipNextObstacle = false;
    }
  }
  if (score - lastSeaKingSpawn >= 1450) {
    createSeaKing();
    lastSeaKingSpawn = score;
  }

  requestAnimationFrame(gameLoop);
}

const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const bgMusic = document.getElementById('bg-music');

// Vídeo de introdução
startButton.addEventListener('click', () => {
  const introVideo = document.getElementById('intro-video');

  // Esconde a tela de início
  startScreen.style.display = 'none';

  // Mostra o vídeo e inicia a música
  introVideo.style.display = 'block';
  bgMusic.volume = 0.2;
  bgMusic.play(); // Música começa com o vídeo
  introVideo.play();

  // Quando o vídeo termina, começa o jogo
  introVideo.onended = function () {
    introVideo.style.display = 'none';
    canvas.style.display = 'block';
    createObstacle();
    gameLoop();
  };
});

document.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

document.getElementById('restart-button').addEventListener('click', () => {
  ship.x = 50;
  ship.y = canvas.height - 120;
  obstacles = [];
  gameOver = false;
  score = 0;
  lives = 3;
  blinking = false;
  invincible = false;
  lastSeaKingSpawn = 0;
  skipNextObstacle = false;
  document.getElementById('final-score').textContent = '';
  document.getElementById('best-score').textContent = '';
  document.getElementById('game-over-screen').style.display = 'none';
  canvas.style.display = 'block';
  gameLoop();
});
