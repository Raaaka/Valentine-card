/* =========================
   NAME + COUPON FROM URL
========================= */
const DEFAULT_NAME = "Beautiful";
const DEFAULT_COUPON = null;

const params = new URLSearchParams(window.location.search);
const HER_NAME = params.get("name")
  ? decodeURIComponent(params.get("name"))
  : DEFAULT_NAME;

const COUPON_TEXT = params.get("coupon")
  ? decodeURIComponent(params.get("coupon"))
  : DEFAULT_COUPON;

/* =========================
   CONFIG
========================= */
const DEBUG_STOP_NO = true;

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

document.getElementById("herName").innerText = HER_NAME;

/* =========================
   SCREEN 1
========================= */
setInterval(() => {
  proceedBtn.style.left = Math.random() * 70 + "%";
  proceedBtn.style.top = Math.random() * 70 + "%";
}, 1500);

noBtn1.addEventListener("click", () => showToast("Nice try 😏"));

/* =========================
   PROCEED → SCREEN 2
========================= */
proceedBtn.addEventListener("click", () => {
  bgMusic.play();
  screen1.classList.add("hidden");
  screen2.classList.remove("hidden");

  if (!DEBUG_STOP_NO) startNoMovement();
  startYesGrowth();
  yesBtn.classList.add("heartbeat");
});

/* =========================
   NO BUTTON (FIXED)
========================= */
let noInterval = null;
let noSpeed = 650;
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
  if (noInterval) clearInterval(noInterval);
}

/* Desktop dodge */
if (!isTouchDevice) {
  noBtn2.addEventListener("mouseenter", () => {
    if (!DEBUG_STOP_NO) moveNo();
  });

  noBtn2.addEventListener("click", handleNoAction);
}

/* Mobile: pointerup guarantees trigger */
if (isTouchDevice) {
  noBtn2.addEventListener("pointerup", handleNoAction);
}

/* Unified NO handler */
function handleNoAction() {
  noClickCount++;

  if (navigator.vibrate) navigator.vibrate(120);

  showToast(sarcasticReplies[noClickCount % sarcasticReplies.length]);

  if (noClickCount >= 5) {
    showBrokenHeart();
  } else if (!DEBUG_STOP_NO) {
    setTimeout(moveNo, 120);
  }
}

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

/* YES CLICK */
yesBtn.addEventListener("click", () => {
  stopYesGrowth();
  stopNoMovement();
  yesBtn.classList.remove("heartbeat");

  confetti({ particleCount: 220, spread: 100 });

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
  yesBtn.classList.remove("heartbeat");

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
  t.style.cssText = `
    position:fixed;
    bottom:40px;
    left:50%;
    transform:translateX(-50%);
    background:#000;
    color:#fff;
    padding:10px 18px;
    border-radius:20px;
    opacity:0;
    transition:opacity .3s;
    z-index:9999;
  `;
  document.body.appendChild(t);

  setTimeout(() => t.style.opacity = "1", 50);
  setTimeout(() => t.style.opacity = "0", 1400);
  setTimeout(() => t.remove(), 1800);
}
