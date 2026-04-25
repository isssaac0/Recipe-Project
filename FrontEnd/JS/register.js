// ===== SAME LUXURY BACKGROUND =====
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
addEventListener("resize", resizeCanvas);

let mouseX = innerWidth / 2;
let mouseY = innerHeight / 2;

addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const particles = [];

for (let i = 0; i < 65; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.25,
    dy: (Math.random() - 0.5) * 0.25,
    a: Math.random() * 0.5 + 0.15
  });
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const g = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
  g.addColorStop(0,"#0a0a0a");
  g.addColorStop(0.5,"#111");
  g.addColorStop(1,"#1a1208");

  ctx.fillStyle = g;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  const glow = ctx.createRadialGradient(mouseX,mouseY,10,mouseX,mouseY,260);
  glow.addColorStop(0,"rgba(212,175,55,0.18)");
  glow.addColorStop(1,"rgba(212,175,55,0)");

  ctx.fillStyle = glow;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    p.x += p.dx;
    p.y += p.dy;

    if(p.x<0 || p.x>canvas.width) p.dx *= -1;
    if(p.y<0 || p.y>canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(212,175,55,${p.a})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();


// ===== REGISTER =====
const form = document.getElementById("registerForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  msg.innerText = "Creating account...";

  try {
    const res = await fetch("https://recipe-backend-8s7p.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await res.json();

    if (res.ok) {
      msg.innerText = "Registered successfully";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);

    } else {
      msg.innerText = data.message || "Registration failed";
    }

  } catch (err) {
    msg.innerText = "Server error";
  }
});