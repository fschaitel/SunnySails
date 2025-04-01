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

let lifeItem = null;
const LIFE_ITEM_INTERVAL = 8000;
const MAX_LIVES = 3;
let lastLifeItemScore = 0;

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

const lifeImage = new Image();
lifeImage.src = 'assets/akuma-nomi.png';

const hatImage = new Image();
hatImage.src = 'assets/straw-hat.png';

const berryImage = new Image();
berryImage.src = 'assets/berry.png';

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

  const baseSpeed = 3;
  const difficultyFactor = Math.min(score / 2000, 5);
  const speed = baseSpeed + Math.random() * difficultyFactor;

  console.log("🌊 New wave speed:", speed.toFixed(2));

  obstacles.push({
    x: canvas.width,
    y: y,
    width: height,
    height: height,
    isSeaKing: false,
    speed: speed
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
    obs.x -= obs.speed || 4;
  }
  obstacles = obstacles.filter(obs => obs.x + obs.width > 0);
}

function detectCollision() {
  if (invincible) return;

  for (let obs of obstacles) {
    const paddingTop = obs.isSeaKing ? 60 : 45;
    const paddingSides = obs.isSeaKing ? 40 : 22;
    const obsX = obs.x + paddingSides;
    const obsY = obs.y + paddingTop;
    const obsWidth = obs.width - paddingSides * 2;
    const obsHeight = obs.height - paddingTop;

    const shipPaddingTop = 20;
    const shipX = ship.x;
    const shipY = ship.y + shipPaddingTop;
    const shipWidth = ship.width;
    const shipHeight = ship.height - shipPaddingTop;

    if (
      shipX < obsX + obsWidth &&
      shipX + shipWidth > obsX &&
      shipY < obsY + obsHeight &&
      shipY + shipHeight > obsY
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
  ctx.fillText(`${score}`, 40, 30);
  ctx.drawImage(berryImage, 10, 10, 24, 24);
}

function drawLives() {
  const size = 24;
  const gap = 10;
  for (let i = 0; i < lives; i++) {
    ctx.drawImage(
      hatImage,
      canvas.width - (size + gap) * (i + 1),
      10,
      size,
      size
    );
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

function createLifeItem() {
  const size = 32;
  const x = canvas.width;
  const y = SKY_LIMIT + Math.random() * (canvas.height - SKY_LIMIT - size);
  lifeItem = {
    x,
    y,
    size,
    collected: false
  };
}

function drawLifeItem() {
  if (lifeItem && !lifeItem.collected) {
    ctx.drawImage(lifeImage, lifeItem.x, lifeItem.y, lifeItem.size, lifeItem.size);
  }
}

function updateLifeItem() {
  if (lifeItem && !lifeItem.collected) {
    lifeItem.x -= 3;

    if (
      ship.x < lifeItem.x + lifeItem.size &&
      ship.x + ship.width > lifeItem.x &&
      ship.y < lifeItem.y + lifeItem.size &&
      ship.y + ship.height > lifeItem.y
    ) {
      lifeItem.collected = true;
      if (lives < MAX_LIVES) lives++;
    }

    if (lifeItem.x + lifeItem.size < 0) {
      lifeItem = null;
    }
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
    document.getElementById('best-score').innerHTML = `Best Score: <img src="assets/berry.png" width="32" style="vertical-align: middle;"> ${highScore}`;
    return;
  }

  drawBackground();
  drawShip();
  drawObstacles();
  updateObstacles();
  detectCollision();
  drawScore();
  drawLives();
  drawLifeItem();
  updateLifeItem();

  score++;

  let obstacleFrequency = 100;
  if (score > 10000) {
    obstacleFrequency = 60;
  } else if (score > 5000) {
    obstacleFrequency = 80;
  }

  if (score % obstacleFrequency === 0) {
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
  if (score - lastLifeItemScore >= LIFE_ITEM_INTERVAL && lives < MAX_LIVES) {
    createLifeItem();
    lastLifeItemScore = score;
  }

  requestAnimationFrame(gameLoop);
}

const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const bgMusic = document.getElementById('bg-music');

startButton.addEventListener('click', () => {
  const introVideo = document.getElementById('intro-video');

  startScreen.style.display = 'none';
  introVideo.style.display = 'block';
  bgMusic.volume = 0.2;
  bgMusic.play();
  introVideo.play();

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
  lifeItem = null;
  lastLifeItemScore = 0;
  document.getElementById('final-score').textContent = '';
  document.getElementById('best-score').textContent = '';
  document.getElementById('game-over-screen').style.display = 'none';
  canvas.style.display = 'block';
  gameLoop();
});
