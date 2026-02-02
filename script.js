/* =========================
   NAME + COUPON FROM URL
========================= */

// Defaults
const DEFAULT_NAME = "Beautiful";
const DEFAULT_COUPON = null;

// Read URL params
const urlParams = new URLSearchParams(window.location.search);

const NAME_FROM_URL = urlParams.get("name");
const COUPON_FROM_URL = urlParams.get("coupon");

// Final values
const HER_NAME = NAME_FROM_URL
  ? decodeURIComponent(NAME_FROM_URL)
  : DEFAULT_NAME;

const COUPON_TEXT = COUPON_FROM_URL
  ? decodeURIComponent(COUPON_FROM_URL)
  : DEFAULT_COUPON;

/* =========================
   CONFIG
========================= */
const DEBUG_STOP_NO = false; // 🛑 true = stop NO movement (debug)

/* =========================
   DEVICE CHECK
========================= */
const isTouchDevice =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

/* =========================
   ELEMENTS
========================= */
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");

const proceedBtn = document.getElementById("proceedBtn");
const noBtn1 = document.getElementById("noBtn1");
const yesBtn = document.getElementById("yesBtn");
const noBtn2 = document.getElementById("noBtn2");
const bgMusic = document.getElementById("bgMusic");

// Inject name into DOM
document.getElementById("herName").innerText = HER_NAME;

/* =========================
   SCREEN 1
========================= */
function moveSlow(btn) {
  btn.style.left = Math.random() * 70 + "%";
  btn.style.top = Math.random() * 70 + "%";
}
setInterval(() => moveSlow(proceedBtn), 1500);

noBtn1.addEventListener("click", () => {
  showToast("Nice try 😏");
});

/* =========================
   PROCEED → SCREEN 2
========================= */
proceedBtn.addEventListener("click", () => {
  bgMusic.play();
  screen1.classList.add("hidden");
  screen2.classList.remove("hidden");

  if (!DEBUG_STOP_NO) startNoMovement();
  startYesGrowth();
});

/* =========================
   NO BUTTON LOGIC (SCREEN 2)
========================= */
let noInterval = null;
let noSpeed = 700; // 🎚️ control speed here
let noClickCount = 0;

const sarcasticReplies = [
  "Wrong choice 😌",
  "Bold of you to try 😂",
  "That button is decorative 😏",
  "Denied politely ❌",
  "Emotionally unavailable 😌",
  "Try the heart 👉❤️"
];

function moveNo() {
  noBtn2.style.left = Math.random() * 70 + "%";
  noBtn2.style.top = Math.random() * 70 + "%";
}

function startNoMovement() {
  stopNoMovement();
  noInterval = setInterval(moveNo, noSpeed);
}

function stopNoMovement() {
  if (noInterval) {
    clearInterval(noInterval);
    noInterval = null;
  }
}

/* Desktop dodge */
if (!isTouchDevice) {
  noBtn2.addEventListener("mouseenter", () => {
    if (!DEBUG_STOP_NO) moveNo();
  });
}

/* Mobile dodge */
if (isTouchDevice) {
  noBtn2.addEventListener("touchstart", (e) => {
    if (!DEBUG_STOP_NO) {
      e.preventDefault();
      moveNo();
    }
  });
}

/* NO click = sarcastic reply */
noBtn2.addEventListener("click", () => {
  noClickCount++;

  showToast(
    sarcasticReplies[noClickCount % sarcasticReplies.length]
  );

  if (noClickCount >= 6) {
    showBrokenHeart();
  }
});

/* =========================
   YES AUTO GROW
========================= */
let yesScale = 1;
let yesInterval = null;

function startYesGrowth() {
  stopYesGrowth();
  yesInterval = setInterval(() => {
    if (yesScale < 1.9) {
      yesScale += 0.02;
      yesBtn.style.transform = `scale(${yesScale}) rotate(-45deg)`;
    }
  }, 300);
}

function stopYesGrowth() {
  if (yesInterval) clearInterval(yesInterval);
}

/* YES CLICK
========================= */
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
    <p>
      ${HER_NAME}, boyfriend privileges unlocked 😏❤️
      ${COUPON_TEXT ? `<br/>🎁 Bonus perk: <strong>${COUPON_TEXT}</strong> 🛒😂` : ""}
    </p>
  `;
});

/* =========================
   BROKEN HEART
========================= */
function showBrokenHeart() {
  stopYesGrowth();
  stopNoMovement();

  screen2.innerHTML = `
    <h1 style="font-size:3rem;">💔</h1>
    <p>${HER_NAME}… that hurt 😔</p>
    <p style="opacity:0.7;">Refresh to try again 😉</p>
  `;
}

/* =========================
   TOAST
========================= */
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

  setTimeout(() => (t.style.opacity = "1"), 50);
  setTimeout(() => (t.style.opacity = "0"), 1400);
  setTimeout(() => t.remove(), 1800);
}
