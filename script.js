/* -------------------------
   CONFIG
-------------------------- */
const HER_NAME = "Ananya"; // 🔴 CHANGE NAME HERE

/* -------------------------
   DEVICE CHECK
-------------------------- */
const isTouchDevice =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

/* -------------------------
   ELEMENTS
-------------------------- */
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");

const proceedBtn = document.getElementById("proceedBtn");
const noBtn1 = document.getElementById("noBtn1");

const yesBtn = document.getElementById("yesBtn");
const noBtn2 = document.getElementById("noBtn2");

const bgMusic = document.getElementById("bgMusic");

/* -------------------------
   INIT
-------------------------- */
document.getElementById("herName").innerText = HER_NAME;

/* -------------------------
   Screen 1: Proceed hops
-------------------------- */
function moveSlow(btn) {
  btn.style.left = Math.random() * 70 + "%";
  btn.style.top = Math.random() * 70 + "%";
}

setInterval(() => moveSlow(proceedBtn), 1500);

noBtn1.addEventListener("click", () => {
  showToast("Nice try 😏");
});

/* -------------------------
   Proceed → Screen 2
-------------------------- */
proceedBtn.addEventListener("click", () => {
  bgMusic.play();
  screen1.classList.add("hidden");
  screen2.classList.remove("hidden");

  startNoMovement();
  startYesGrowth();
});

/* -------------------------
   NO button control
-------------------------- */
let noSpeed = 650; // 🎚️ CONTROL SPEED HERE
let noMoveInterval = null;

function moveNoButton() {
  noBtn2.style.left = Math.random() * 70 + "%";
  noBtn2.style.top = Math.random() * 70 + "%";
}

function startNoMovement() {
  stopNoMovement();
  noMoveInterval = setInterval(moveNoButton, noSpeed);
}

function stopNoMovement() {
  if (noMoveInterval) clearInterval(noMoveInterval);
}

/* Desktop hover dodge */
if (!isTouchDevice) {
  noBtn2.addEventListener("mouseenter", moveNoButton);
}

/* Mobile touch dodge (prevents click) */
if (isTouchDevice) {
  noBtn2.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
  });
}

/* -------------------------
   YES auto grow ⏳
-------------------------- */
let yesScale = 1;
let yesGrowInterval = null;

function startYesGrowth() {
  stopYesGrowth();
  yesGrowInterval = setInterval(() => {
    if (yesScale < 1.8) {
      yesScale += 0.02;
      yesBtn.style.transform = `scale(${yesScale}) rotate(-45deg)`;
    }
  }, 300);
}

function stopYesGrowth() {
  if (yesGrowInterval) clearInterval(yesGrowInterval);
}

/* -------------------------
   YES click 🎉
-------------------------- */
yesBtn.addEventListener("click", () => {
  stopYesGrowth();
  stopNoMovement();

  confetti({
    particleCount: 220,
    spread: 100,
    origin: { y: 0.6 }
  });

  screen2.innerHTML = `
    <h1>YAYYYY!! ❤️🎉</h1>
    <p>${HER_NAME}, you just made me the happiest person alive 🥰</p>
  `;
});

/* -------------------------
   Toast
-------------------------- */
function showToast(msg) {
  const t = document.createElement("div");
  t.innerText = msg;
  t.style.position = "fixed";
  t.style.bottom = "40px";
  t.style.left = "50%";
  t.style.transform = "translateX(-50%)";
  t.style.background = "#000";
  t.style.color = "#fff";
  t.style.padding = "10px 18px";
  t.style.borderRadius = "20px";
  t.style.opacity = "0";
  t.style.transition = "opacity 0.3s";
  document.body.appendChild(t);

  setTimeout(() => t.style.opacity = "1", 50);
  setTimeout(() => t.style.opacity = "0", 1400);
  setTimeout(() => t.remove(), 1800);
}
