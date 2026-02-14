const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cx = canvas.width / 2;
const cy = canvas.height / 2;

const PARTICLES = 1200;
const particles = [];

let formationProgress = 0; // 0 → 1
const FORM_TIME = 5000; // 0.5–5 seconds (5000ms)
const startTime = performance.now();

// Heart equation
function heart(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y:
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
  };
}

class Particle {
  constructor() {
    const t = Math.random() * Math.PI * 2;
    const h = heart(t);

    // Final heart position
    this.tx = h.x * 18;
    this.ty = -h.y * 18;
    this.tz = Math.random() * 200 - 100;

    // Start scattered (sprinkler effect)
    this.x = (Math.random() - 0.5) * 800;
    this.y = (Math.random() - 0.5) * 800;
    this.z = (Math.random() - 0.5) * 800;

    this.size = Math.random() * 2 + 1;
  }

  rotateY(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this.x * cos - this.z * sin;
    const z = this.x * sin + this.z * cos;
    this.x = x;
    this.z = z;
  }

  update(progress) {
    // Smoothly move toward heart shape
    this.x += (this.tx - this.x) * progress;
    this.y += (this.ty - this.y) * progress;
    this.z += (this.tz - this.z) * progress;

    this.rotateY(0.003);
  }

  project() {
    const scale = 600 / (600 + this.z);
    return {
      x: cx + this.x * scale,
      y: cy + this.y * scale,
      size: this.size * scale
    };
  }

  draw() {
    const p = this.project();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#D4AF37 ";
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < PARTICLES; i++) {
  particles.push(new Particle());
}

// Animation loop
function animate(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Formation timing
  const elapsed = time - startTime;
  formationProgress = Math.min(elapsed / FORM_TIME, 1);

  particles.forEach(p => {
    p.update(formationProgress * 0.08);
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate(performance.now());

// Resize support
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
const container = document.querySelector('.balloon-container');

const colors = [
  '#ff4d6d',
  '#ff85a1',
  '#ff99c8',
  '#ffccd5',
  '#c9184a',
  '#ff758f'
];

  function  createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');

  // Random position
  balloon.style.left = Math.random() * 100 + 'vw';

  // Random color
  balloon.style.background = colors[Math.floor(Math.random() * colors.length)];

  // Random size
  const size = Math.random() * 30 + 40;
  balloon.style.width = size + 'px';
  balloon.style.height = size * 1.2 + 'px';

  // Random animation duration
  const duration = Math.random() * 5 + 5;
  balloon.style.animationDuration = duration + 's';

  container.appendChild(balloon);

  // Remove balloon after animation
  setTimeout(() => {
    balloon.remove();
  }, duration * 1000);
}

// Create balloons continuously
setInterval(createBalloon, 800);

