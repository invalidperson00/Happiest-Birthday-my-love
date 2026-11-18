

/* PAGE NAVIGATION */

let currentPage = 1;

function nextPage(number) {

    // Start background music after the visitor's first interaction.
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic && bgMusic.paused) {
        bgMusic.volume = 0.45;
        bgMusic.play().catch(error => {
            console.log("Background music playback was blocked:", error);
        });
    }


    document.getElementById("page" + currentPage)
    .classList.remove("active");

    currentPage = number;

    document.getElementById("page" + currentPage)
    .classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if(number === 2 || number === 4 || number === 5) {
        celebrate();
    }
}

/* DIWALI LIGHTS */

const lights = document.getElementById("lights");

for(let i = 0; i < 30; i++) {
    const bulb = document.createElement("div");
    bulb.className = "bulb";
    lights.appendChild(bulb);
}

/* BALLOONS */

const colors = [
    "#ff4d8d", "#ffcf56", "#6ee7ff",
    "#b57aff", "#ff786b", "#75edb1"
];

for(let i = 0; i < 20; i++) {

    const balloon = document.createElement("div");

    balloon.className = "balloon";
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.background = colors[i % colors.length];
    balloon.style.animationDuration =
        (9 + Math.random() * 12) + "s";
    balloon.style.animationDelay =
        (-Math.random() * 15) + "s";

    document.body.appendChild(balloon);
}

/* FLOATING HEARTS AND FLOWERS */

const symbols = [
    "❤️", "💗", "💕", "🌹",
    "🌸", "✨", "💖", "🌺"
];

function createFloating() {

    const item = document.createElement("div");

    item.className = "float";

    item.innerHTML =
        symbols[Math.floor(Math.random() * symbols.length)];

    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize =
        (18 + Math.random() * 25) + "px";

    item.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    document.body.appendChild(item);

    setTimeout(() => item.remove(), 10000);
}

setInterval(createFloating, 450);

/* FIREWORKS */

const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

let W, H;
let rockets = [];
let particles = [];

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

function launchFirework() {

    rockets.push({
        x: Math.random() * W,
        y: H,
        targetY: Math.random() * H * .5 + 50,
        speed: 5 + Math.random() * 3,
        color: `hsl(${Math.random() * 360},100%,65%)`
    });

}

function explode(x, y, color) {

    for(let i = 0; i < 100; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: color,
            size: Math.random() * 3 + 1
        });

    }

}

function animate() {

    ctx.clearRect(0, 0, W, H);

    rockets.forEach((r, index) => {

        r.y -= r.speed;

        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fill();

        if(r.y <= r.targetY) {
            explode(r.x, r.y, r.color);
            rockets.splice(index, 1);
        }

    });

    particles.forEach((p, index) => {

        p.x += p.vx;
        p.y += p.vy;
        p.vy += .035;
        p.alpha -= .012;

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if(p.alpha <= 0) {
            particles.splice(index, 1);
        }

    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}

animate();

/* CELEBRATION */

let fireworkInterval;

function celebrate() {

    for(let i = 0; i < 12; i++) {
        setTimeout(launchFirework, i * 200);
    }

    clearInterval(fireworkInterval);

    fireworkInterval = setInterval(launchFirework, 600);

    setTimeout(() => {
        clearInterval(fireworkInterval);
    }, 15000);

}

/* INITIAL CELEBRATION */

setTimeout(celebrate, 1200);


/* SHOOTING STARS */
function createShootingStar() {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.top = (5 + Math.random() * 45) + "vh";
    star.style.animationDuration = (1.0 + Math.random() * 0.8) + "s";
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2200);
}

setInterval(() => {
    if (Math.random() > 0.35) createShootingStar();
}, 4200);

