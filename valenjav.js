 // Card flip
const card = document.getElementById("card");
card.addEventListener("click", () => {
  card.classList.toggle("is-flipped");
});

// Button response
document.getElementById("yesBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  alert("You just made me the happiest person alive 💖");
});

// Floating hearts animation
const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + Math.random() * 100;
  this.size = Math.random() * 20 + 10;
  this.speed = Math.random() * 1 + 0.5;
}

function drawHeart(x, y, size) {
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size, y - size, x - size * 2, y + size / 2, x, y + size * 1.5);
  ctx.bezierCurveTo(x + size * 2, y + size / 2, x + size, y - size, x, y);
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach((heart, i) => {
    heart.y -= heart.speed;
    drawHeart(heart.x, heart.y, heart.size);

    if (heart.y < -50) hearts.splice(i, 1);
  });

  if (hearts.length < 30) hearts.push(new Heart());

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
