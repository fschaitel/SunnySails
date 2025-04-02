// Sunny Sails – script.js (com BOSS, mistério aos 6050 pontos e tudo funcionando)

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

const SKY_LIMIT = 175;

let ship = { x: 50, y: canvas.height - 120, width: 80, height: 80, speed: 5 };
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
const LIFE_ITEM_INTERVAL = 3900;
const MAX_LIVES = 3;
let lastLifeItemScore = -1;

let bossActive = false;
let bossStartTime = null;
let bossShip = null;
let bossBullets = [];
let bossCooldown = 0;
let bossHasEntered = false;

const bgImage = new Image();
bgImage.src = 'assets/ocean-bg-light.png';

const shipImage = new Image();
shipImage.src = 'assets/sunny-8bit.png';

const waveImage = new Image();
waveImage.src = 'assets/wave.png';

const seaKingImage = new Image();
seaKingImage.src = 'assets/sea-king.png';

const lifeImage = new Image();
lifeImage.src = 'assets/akuma-nomi.png';

const hatImage = new Image();
hatImage.src = 'assets/straw-hat.png';

const berryImage = new Image();
berryImage.src = 'assets/berry.png';

const bossImage = new Image();
bossImage.src = 'assets/navy-boss.png';

const cannonballImage = new Image();
cannonballImage.src = 'assets/cannonball.png';

const mysteryImage = new Image();
mysteryImage.src = 'assets/mystery.png';

let showMysteryImage = false;
let mysteryStartTime = null;

const bossMusic = new Audio('assets/boss-theme.mp3');
bossMusic.loop = true;

let musicSwitched = false;

const bgMusic = document.getElementById('bg-music');
const introVideo = document.getElementById('intro-video');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');

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

function drawMysteryImage() {
  const duration = 3000;
  if (!showMysteryImage || !mysteryStartTime) return;
  const elapsed = Date.now() - mysteryStartTime;
  if (elapsed > duration) {
    showMysteryImage = false;
    return;
  }
  const baseX = canvas.width - 90;
  const baseY = 80;
  const shakeX = baseX + (Math.random() * 10 - 5);
  const shakeY = baseY + (Math.random() * 10 - 5);
  ctx.drawImage(mysteryImage, shakeX, shakeY, 80, 80);
}

function updateMovement() {
  if (keys['ArrowUp'] && ship.y > SKY_LIMIT) ship.y -= ship.speed;
  if (keys['ArrowDown'] && ship.y + ship.height < canvas.height) ship.y += ship.speed;
  if (keys['ArrowRight'] && ship.x + ship.width < canvas.width) ship.x += ship.speed;
  if (keys['ArrowLeft'] && ship.x > 0) ship.x -= ship.speed;
}

function drawScore() {
  const iconSize = 24;
  ctx.drawImage(berryImage, 10, 8, iconSize, iconSize);
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`${score}`, 10 + iconSize + 8, 28);
}

function drawLives() {
  const size = 32;
  const gap = 10;
  for (let i = 0; i < lives; i++) {
    ctx.drawImage(hatImage, canvas.width - (size + gap) * (i + 1), 10, size, size);
  }
}

function createObstacle() {
  const h = 40 + Math.random() * 40;
  const y = canvas.height / 2 + Math.random() * (canvas.height / 2 - h);
  const speed = 3 + Math.random() * Math.min(score / 2000, 5);
  obstacles.push({ x: canvas.width, y, width: h, height: h, isSeaKing: false, speed });
}

function drawObstacles() {
  for (let o of obstacles) {
    ctx.drawImage(o.isSeaKing ? seaKingImage : waveImage, o.x, o.y, o.width, o.height);
  }
}

function updateObstacles() {
  for (let o of obstacles) o.x -= o.speed || 4;
  obstacles = obstacles.filter(o => o.x + o.width > 0);
}

function detectCollision() {
  if (invincible) return;
  for (let o of obstacles) {
    const pT = o.isSeaKing ? 60 : 45, pS = o.isSeaKing ? 40 : 22;
    const oX = o.x + pS, oY = o.y + pT, oW = o.width - pS * 2, oH = o.height - pT;
    const sX = ship.x, sY = ship.y + 20, sW = ship.width, sH = ship.height - 20;
    if (sX < oX + oW && sX + sW > oX && sY < oY + oH && sY + sH > oY) {
      lives--; triggerBlink();
      if (lives <= 0-1) gameOver = true;
      break;
    }
  }
}

function createLifeItem() {
  const size = 32, x = canvas.width;
  const y = SKY_LIMIT + Math.random() * (canvas.height - SKY_LIMIT - size);
  lifeItem = { x, y, size, collected: false };
}

function drawLifeItem() {
  if (lifeItem && !lifeItem.collected) ctx.drawImage(lifeImage, lifeItem.x, lifeItem.y, lifeItem.size, lifeItem.size);
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
    if (lifeItem.x + lifeItem.size < 0) lifeItem = null;
  }
}

function triggerBlink() {
  blinking = true;
  invincible = true;
  setTimeout(() => { blinking = false; invincible = false; }, 1100);
}

function startBossBattle() {
  bossActive = true;
  bossStartTime = Date.now();
  bossHasEntered = false;
  const waterMin = canvas.height / 2;
  const waterMax = canvas.height - 80;
  bossShip = {
    x: canvas.width,
    y: waterMin + Math.random() * (waterMax - waterMin),
    width: 120,
    height: 80,
    speedY: 3,
    direction: 1
  };
  obstacles = [];
}

function updateBoss() {
  if (!bossShip) return;

  const waterMin = canvas.height / 2;
  const waterMax = canvas.height - bossShip.height;

  const elapsed = (Date.now() - bossStartTime) / 1000;

  // Entrada inicial
  if (!bossHasEntered) {
    bossShip.x -= 2;
    if (bossShip.x <= canvas.width - bossShip.width - 20) {
      bossHasEntered = true;
    }
  }

  // Movimento e tiros do boss
  if (bossHasEntered && elapsed < 15) { // atira por 15 segundos
    bossShip.y += bossShip.speedY * bossShip.direction;
    if (bossShip.y <= waterMin || bossShip.y >= waterMax) {
      bossShip.direction *= -1;
    }

    bossCooldown--;
    if (bossCooldown <= 0) {
      bossBullets.push({
        x: bossShip.x,
        y: bossShip.y + bossShip.height / 2,
        width: 20,
        height: 20,
        speed: 6
      });
      bossCooldown = 30;
    }
  }

  // Pausa entre os tiros e a saída
  if (elapsed >= 15 && elapsed < 18) {
    // boss para de atirar e fica parado
    // (sem movimento durante esse tempo)
  }

  // Fase de saída (movimento rápido para esquerda)
  if (elapsed >= 18) {
    bossShip.x -= 4;
    if (bossShip.x + bossShip.width < 0) {
      bossActive = false;
      bossShip = null;
      bossBullets = [];
      bossHasEntered = false;
      canvas.style.display = 'none';
      const victory = document.getElementById('victory-screen');
      if (victory) {
        victory.style.display = 'flex';
      }
      bossMusic.pause();
    }
  }
}

function drawBoss() {
  if (!bossShip || !bossImage.complete) return;
  ctx.drawImage(bossImage, bossShip.x, bossShip.y, bossShip.width, bossShip.height);
}

function drawBossBullets() {
  for (let b of bossBullets) {
    ctx.drawImage(cannonballImage, b.x, b.y, b.width, b.height);
  }
}

function updateBossBullets() {
  for (let b of bossBullets) b.x -= b.speed;
  bossBullets = bossBullets.filter(b => b.x + b.width > 0);
}

function detectBossBulletCollision() {
  if (invincible) return;
  for (let b of bossBullets) {
    const p = 2;
    if (
      ship.x < b.x + b.width - p &&
      ship.x + ship.width > b.x + p &&
      ship.y < b.y + b.height - p &&
      ship.y + ship.height > b.y + p
    ) {
      lives--; triggerBlink(); b.x = -100;
      if (lives <= 0-1) gameOver = true;
      break;
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
    document.getElementById('best-score').innerHTML = `<img src="assets/berry.png" width="32" style="vertical-align:middle; margin-right:6px;">Best Score: ${highScore}`;
    return;
  }
  drawBackground();
  drawShip();

  if (bossActive) {
    updateBoss(); drawBoss();
    updateBossBullets(); drawBossBullets();
    detectBossBulletCollision();
  } else {
    drawObstacles(); updateObstacles(); detectCollision();
  }

  drawScore(); drawLives(); drawLifeItem(); updateLifeItem();
  drawMysteryImage();

  score++;
  if (score === 6050) {
    showMysteryImage = true;
    mysteryStartTime = Date.now();
  }

  let freq = score > 4500 ? 60 : score > 1000 ? 80 : 100;
  if (!bossActive && score % freq === 0) {
    if (!skipNextObstacle) createObstacle(); else skipNextObstacle = false;
  }

  if (score >= 8000 && !bossActive && !bossShip) startBossBattle();

  if (score - lastSeaKingSpawn >= 1500 && !bossActive) {
    obstacles.push({ x: canvas.width, y: canvas.height - 140, width: 120, height: 120, isSeaKing: true, speed: 3 });
    lastSeaKingSpawn = score;
    skipNextObstacle = true;
  }

  if (score - lastLifeItemScore >= LIFE_ITEM_INTERVAL && lives < MAX_LIVES) {
    createLifeItem(); lastLifeItemScore = score;
  }

  if (!musicSwitched && score >= 6100) {
    bgMusic.pause();
    bossMusic.volume = 0.3;
    bossMusic.play();
    musicSwitched = true;
  }

  requestAnimationFrame(gameLoop);
}

startButton.addEventListener('click', () => {
  startScreen.style.display = 'none';
  introVideo.style.display = 'block';
  bgMusic.volume = 0.2;
  bgMusic.play();
  introVideo.play();
  introVideo.onended = () => {
    introVideo.style.display = 'none';
    canvas.style.display = 'block';
    createObstacle();
    gameLoop();
  };
});

document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);
