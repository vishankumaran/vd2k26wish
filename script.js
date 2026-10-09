/* =========================================
   OUR LITTLE LOVE STORY
========================================= */

"use strict";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const SECRET_CODE = ":2007";

/* Your seven memory photos */
const memories = [
  {
    image: "images/memory1.jpg.jpg",
    caption: "Memory One — a little piece of our story. ❤️"
  },
  {
    image: "images/memory2.jpg.jpg",
    caption: "Memory Two — another reason to smile. 💗"
  },
  {
    image: "images/memory3.jpg.jpg",
    caption: "Memory Three — a moment worth keeping. ✨"
  },
  {
    image: "images/memory4.jpg.jpg",
    caption: "Memory Four — close to my heart. ❤️"
  },
  {
    image: "images/memory5.jpg.jpg",
    caption: "Memory Five — one more beautiful memory. 💞"
  },
  {
    image: "images/special.jpg.jpg",
    caption: "A special memory, just for you. 🌹"
  },
  {
    image: "images/IMG-20261006-WA0025.jpg",
    caption: "One more memory made special by you. ❤️"
  }
];


/* =========================================
   ELEMENTS
========================================= */

const slide1 = $("#slide1");
const slide2 = $("#slide2");
const slide3 = $("#slide3");
const slide4 = $("#slide4");

const heartMeeting = $("#heartMeeting");
const heartCaption = $("#heartCaption");
const meetHeartsBtn = $("#meetHeartsBtn");
const toLockBtn = $("#toLockBtn");

const unlockForm = $("#unlockForm");
const secretCode = $("#secretCode");
const codeMessage = $("#codeMessage");

const memoryPaper = $("#memoryPaper");
const revealedPhoto = $("#revealedPhoto");
const memoryCaption = $("#memoryCaption");
const closeMemory = $("#closeMemory");
const photoBalloons = $$(".photo-balloon");
const toTeddyBtn = $("#toTeddyBtn");

const teddyStage = $("#teddyStage");
const maleTeddy = $("#maleTeddy");
const femaleTeddy = $("#femaleTeddy");
const teddyMessage = $("#teddyMessage");
const proposalActions = $("#proposalActions");
const proposeBtn = $("#proposeBtn");
const answerActions = $("#answerActions");
const acceptBtn = $("#acceptBtn");
const thinkBtn = $("#thinkBtn");

const giftArea = $("#giftArea");
const giftBox = $("#giftBox");
const giftMessage = $("#giftMessage");
const restartBtn = $("#restartBtn");


/* =========================================
   SPARKLE BACKGROUND
========================================= */

function createSparkles() {
  const container = $("#sparkles");
  if (!container) return;

  container.innerHTML = "";

  const symbols = ["✦", "✧", "·", "♥", "✦"];
  const count = window.innerWidth < 600 ? 22 : 38;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";
    sparkle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.fontSize = `${8 + Math.random() * 14}px`;
    sparkle.style.setProperty(
      "--duration",
      `${3 + Math.random() * 4}s`
    );

    sparkle.style.animationDelay = `${Math.random() * -6}s`;

    container.appendChild(sparkle);
  }
}

createSparkles();


/* =========================================
   SLIDE NAVIGATION
========================================= */

function goToSlide(slide) {
  if (!slide) return;

  slide.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* =========================================
   SLIDE 1: HEART MEETING
========================================= */

let heartsMet = false;

meetHeartsBtn.addEventListener("click", () => {
  if (heartsMet) {
    goToSlide(slide2);
    return;
  }

  heartsMet = true;

  heartMeeting.classList.add("merged");

  heartCaption.textContent =
    "Even a broken heart can glow again when it finds the right person. ❤️";

  meetHeartsBtn.innerHTML = "Our story begins ♥";
  toLockBtn.hidden = false;

  createHeartBurst();
});

toLockBtn.addEventListener("click", () => {
  goToSlide(slide2);
});


function createHeartBurst() {
  const section = $("#slide1");

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");

    heart.textContent = Math.random() > 0.4 ? "♥" : "✦";
    heart.style.position = "absolute";
    heart.style.left = `${35 + Math.random() * 30}%`;
    heart.style.top = `${45 + Math.random() * 15}%`;
    heart.style.zIndex = "4";
    heart.style.pointerEvents = "none";
    heart.style.color = Math.random() > 0.5 ? "#ff8fbd" : "#ffdca3";
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.textShadow = "0 0 12px #ff4f9a";
    heart.style.transition =
      "transform 1.3s ease-out, opacity 1.3s ease-out";

    section.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform =
        `translate(${(Math.random() - 0.5) * 300}px, ${-70 - Math.random() * 190}px) rotate(${Math.random() * 120 - 60}deg)`;
      heart.style.opacity = "0";
    });

    window.setTimeout(() => heart.remove(), 1500);
  }
}


/* =========================================
   SLIDE 2: SECRET CODE
========================================= */

unlockForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredCode = secretCode.value.trim();

  if (enteredCode !== SECRET_CODE) {
    codeMessage.textContent = "That isn't our secret code. Try again. ❤️";
    codeMessage.classList.remove("success");

    secretCode.setAttribute("aria-invalid", "true");
    secretCode.select();

    return;
  }

  codeMessage.textContent = "Secret unlocked! Welcome to our memories. 💗";
  codeMessage.classList.add("success");
  secretCode.removeAttribute("aria-invalid");

  unlockForm.querySelector("button").disabled = true;

  window.setTimeout(() => {
    slide3.classList.remove("locked");
    goToSlide(slide3);
  }, 700);
});


/* =========================================
   SLIDE 3: PHOTO BALLOONS
========================================= */

function revealMemory(index, balloon) {
  const memory = memories[index];

  if (!memory) return;

  photoBalloons.forEach((item) => {
    item.classList.toggle("selected", item === balloon);
  });

  balloon.classList.add("revealed");

  revealedPhoto.src = memory.image;
  revealedPhoto.alt = memory.caption;
  memoryCaption.textContent = memory.caption;

  memoryPaper.hidden = false;

  memoryPaper.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

photoBalloons.forEach((balloon) => {
  balloon.addEventListener("click", () => {
    const index = Number(balloon.dataset.photo);
    revealMemory(index, balloon);
  });
});

closeMemory.addEventListener("click", () => {
  memoryPaper.hidden = true;
});

toTeddyBtn.addEventListener("click", () => {
  slide4.classList.remove("locked");
  goToSlide(slide4);
});


/* =========================================
   SLIDE 4: TEDDY PROPOSAL
========================================= */

let proposalStarted = false;
let proposalAccepted = false;
let giftOpened = false;

proposeBtn.addEventListener("click", () => {
  if (proposalStarted) return;

  proposalStarted = true;

  teddyMessage.textContent =
    "He has something special hidden in his pocket… 💗";

  teddyStage.classList.add("landed");

  maleTeddy.classList.add("proposing");

  createProposalHearts();

  window.setTimeout(() => {
    teddyMessage.textContent =
      "From his heart, he has one important question for you. 💍";

    proposalActions.hidden = true;
    answerActions.hidden = false;
  }, 900);
});


/* If she wants to think first */
thinkBtn.addEventListener("click", () => {
  teddyMessage.textContent =
    "That's okay, my love. Take your time. He will wait for you. 🧸❤️";

  thinkBtn.textContent = "I'm ready to answer 💗";

  thinkBtn.onclick = () => {
    teddyMessage.textContent =
      "He is looking at you with all the love in his heart. 💍";

    thinkBtn.hidden = true;
  };
});


/* She accepts the proposal */
acceptBtn.addEventListener("click", () => {
  if (proposalAccepted) return;

  proposalAccepted = true;

  answerActions.hidden = true;

  teddyMessage.textContent =
    "She said YES! His heart is overflowing with happiness! ❤️";

  maleTeddy.classList.remove("proposing");

  femaleTeddy.classList.add("approaching");

  teddyStage.classList.add("hugging");

  createProposalHearts();

  window.setTimeout(() => {
    teddyMessage.textContent =
      "Two little hearts, one warm hug. Your presence is enough. ❤️";

    giftArea.hidden = false;

    giftArea.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 1900);
});


/* =========================================
   GIFT BOX
========================================= */

giftBox.addEventListener("click", () => {
  if (giftOpened) return;

  giftOpened = true;

  giftBox.classList.add("opened");
  giftMessage.hidden = false;

  teddyMessage.textContent =
    "A special gift from your teddy, with all his love. 🎁❤️";

  createProposalHearts();

  giftMessage.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});


/* =========================================
   FLOATING HEARTS
========================================= */

function createProposalHearts() {
  const section = $("#slide4");

  for (let i = 0; i < 16; i++) {
    const heart = document.createElement("span");

    heart.textContent = Math.random() > 0.3 ? "♥" : "✦";
    heart.style.position = "absolute";
    heart.style.left = `${15 + Math.random() * 70}%`;
    heart.style.top = `${30 + Math.random() * 40}%`;
    heart.style.zIndex = "3";
    heart.style.pointerEvents = "none";
    heart.style.color = Math.random() > 0.5 ? "#ff78b5" : "#ffe2a7";
    heart.style.fontSize = `${12 + Math.random() * 17}px`;
    heart.style.textShadow = "0 0 12px #ff4f9a";
    heart.style.transition =
      "transform 1.4s ease-out, opacity 1.4s ease-out";

    section.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform =
        `translate(${(Math.random() - 0.5) * 260}px, ${-60 - Math.random() * 180}px)`;
      heart.style.opacity = "0";
    });

    window.setTimeout(() => heart.remove(), 1600);
  }
}


/* =========================================
   RESTART THE ENTIRE STORY
========================================= */

restartBtn.addEventListener("click", () => {
  /* Return to the first slide */
  slide2.classList.add("locked");
  slide3.classList.add("locked");
  slide4.classList.add("locked");

  /* Reset heart scene */
  heartsMet = false;

  heartMeeting.classList.remove("merged");

  heartCaption.textContent =
    "Two hearts, slowly finding their way home. ❤️";

  meetHeartsBtn.innerHTML = "Let our hearts meet <span>♥</span>";
  toLockBtn.hidden = true;

  /* Reset password form */
  unlockForm.reset();

  codeMessage.textContent = "";
  codeMessage.classList.remove("success");

  secretCode.removeAttribute("aria-invalid");
  unlockForm.querySelector("button").disabled = false;

  /* Reset memory balloons */
  photoBalloons.forEach((balloon) => {
    balloon.classList.remove("revealed", "selected");
  });

  memoryPaper.hidden = true;
  revealedPhoto.src = "";
  memoryCaption.textContent = "A little piece of us ❤️";

  /* Reset teddy scene */
  proposalStarted = false;
  proposalAccepted = false;
  giftOpened = false;

  teddyStage.classList.remove("landed", "hugging");
  maleTeddy.classList.remove("proposing");
  femaleTeddy.classList.remove("approaching");

  teddyMessage.textContent =
    "Wait… someone is coming to see you. 🧸";

  proposalActions.hidden = false;
  answerActions.hidden = true;

  thinkBtn.hidden = false;
  thinkBtn.textContent = "Let me think 😳";
  thinkBtn.onclick = null;

  /* Reset gift */
  giftArea.hidden = true;
  giftBox.classList.remove("opened");
  giftMessage.hidden = true;

  const giftPhoto = $("#giftPhoto");
  if (giftPhoto) giftPhoto.style.opacity = "";

  goToSlide(slide1);
});


/* =========================================
   IMAGE ERROR CHECK
========================================= */

$$(".balloon-heart img, #giftPhoto").forEach((img) => {
  img.addEventListener("error", () => {
    console.warn("Could not load image. Check the filename and folder:", img.src);
  });
});


/* Initial setup */
slide2.classList.add("locked");
slide3.classList.add("locked");
slide4.classList.add("locked");

answerActions.hidden = true;
giftArea.hidden = true;
memoryPaper.hidden = true;
toLockBtn.hidden = true;
