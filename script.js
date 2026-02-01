/* -------------------------
   CONFIG
-------------------------- */
const HER_NAME = "Ananya"; // 🔴 CHANGE NAME HERE

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
   Screen 1: Proceed hops slowly
-------------------------- */
function moveSlow(button) {
  button.style.left = Math.random() * 70 + "%";
  button.style.top = Math.random() * 70 + "%";
}

setInterval(() => {
  moveSlow(proceedBtn);
}, 1500);

/* Screen 1: NO */
noBtn1.addEventListener("click", () => {
  showToast("Nice try 😏");
});

/* -------------------------
   Proceed → Screen 2
-------------------------- */
let noMoveInterval = null;

proceedBtn.addEventListener("click", () => {
  bgMusic.play();
  screen1.classList.add("hidden");
  screen2.classList.remove("hidden");
  startNoMovement();
});

/* -------------------------
   Screen 2: NO funny logic 🤡
-------------------------- */
function moveFast(button) {
  button.style.left = Math.random() * 80 + "%";
  button.style.top = Math.random() * 80 + "%";
}

function startNoMovement() {
  noMoveInterval = setInterval(() => {
    moveFast(noBtn2);
  }, 10000000);
}

function stopNoMovement() {
  clearInterval(noMoveInterval);
}

const funnyMessages = [
  "Oops 😜",
  "Missed me!",
  "Too slow 😂",
  "Almost 😏",
  "Wrong button!",
  "Try harder 😆"
];

let noClickCount = 0;
const MAX_NO_CLICKS = 4; // 💔 after this → broken heart

/* Dodge on hover */
noBtn2.addEventListener("mouseover", () => {
  moveFast(noBtn2);
});

/* NO click */
noBtn2.addEventListener("click", () => {
  stopNoMovement();
  noClickCount++;

  if (noClickCount >= MAX_NO_CLICKS) {
    showBrokenHeart();
    return;
  }

  showToast(funnyMessages[noClickCount % funnyMessages.length]);

  setTimeout(() => {
    startNoMovement();
  }, 400);
});

/* -------------------------
   YES button grows 💕
-------------------------- */
let scale = 1;
yesBtn.addEventListener("mouseover", () => {
  scale += 0.12;
  yesBtn.style.transform = `scale(${scale})`;
});

/* -------------------------
   YES click = CONFETTI + FINAL 🎉
-------------------------- */
yesBtn.addEventListener("click", () => {
  stopNoMovement();

  confetti({
    particleCount: 220,
    spread: 100,
    origin: { y: 0.6 }
  });

  screen2.innerHTML = `
    <h1>YAYYYY!! ❤️🎉</h1>
    <p>${HER_NAME}, you just unlocked boyfriend privileges 😌💖</p>
  `;
});

/* -------------------------
   BROKEN HEART END 💔
-------------------------- */
function showBrokenHeart() {
  screen2.innerHTML = `
    <h1 style="font-size: 3rem;">💔</h1>
    <p style="font-size: 1.4rem;">
      Ouch… my heart just broke 💔<br/>
      ${HER_NAME}, that hurt 😔
    </p>
    <p style="opacity: 0.7; font-size: 1rem;">
      (Refresh the page if you want to try again 😉)
    </p>
  `;
}

/* -------------------------
   Toast message (floating text)
-------------------------- */
function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "40px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#000";
  toast.style.color = "#fff";
  toast.style.padding = "10px 18px";
  toast.style.borderRadius = "20px";
  toast.style.fontSize = "14px";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s";

  document.body.appendChild(toast);

  setTimeout(() => (toast.style.opacity = "1"), 50);
  setTimeout(() => (toast.style.opacity = "0"), 1400);
  setTimeout(() => toast.remove(), 1800);
}
