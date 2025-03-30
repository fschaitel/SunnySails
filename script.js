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

// Imagens
const bgImage = new Image();
bgImage.src = 'assets/ocean-bg-light.png';

const shipImage = new Image();
shipImage.src = 'assets/sunny-8bit.png';

const waveImage = new Image();
waveImage.src = 'assets/wave.png';

// Fundo rolando
let bgX = 0;

function drawBackground() {
  bgX -= 1;
  if (bgX <= -canvas.width) bgX = 0;
  ctx.drawImage(bgImage, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, bgX + canvas.width, 0, canvas.width, canvas.height);
}

function drawShip() {
  ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
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
    height: height
  });
}

function drawObstacles() {
  for (let obs of obstacles) {
    ctx.drawImage(waveImage, obs.x, obs.y, obs.width, obs.height);
  }
}

function updateObstacles() {
  for (let obs of obstacles) {
    obs.x -= 4;
  }
  obstacles = obstacles.filter(obs => obs.x + obs.width > 0);
}

function detectCollision() {
  const padding = 10;

  for (let obs of obstacles) {
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
      gameOver = true;
    }
  }
}

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 60px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 180, canvas.height / 2);
    return;
  }

  drawBackground();
  drawShip();
  drawObstacles();
  updateObstacles();
  detectCollision();
  drawScore();

  score++;
  if (score % 100 === 0) createObstacle();

  requestAnimationFrame(gameLoop);
}

// Tela de início
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const bgMusic = document.getElementById('bg-music');

startButton.addEventListener('click', () => {
  startScreen.style.display = 'none';
  canvas.style.display = 'block';
  bgMusic.volume = 0.2;
  bgMusic.play();
  createObstacle();
  gameLoop();
});

// Movimentação
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && ship.y > SKY_LIMIT) {
    ship.y -= ship.speed * 2;
  } else if (e.key === 'ArrowDown' && ship.y + ship.height < canvas.height) {
    ship.y += ship.speed * 2;
  } else if (e.key === 'ArrowRight' && ship.x + ship.width < canvas.width) {
    ship.x += ship.speed * 2;
  } else if (e.key === 'ArrowLeft' && ship.x > 0) {
    ship.x -= ship.speed * 2;
  }
});
