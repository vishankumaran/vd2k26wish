
"use strict";

/* =========================================
   SETTINGS AND ELEMENTS
========================================= */

const SECRET_CODE = ":2007";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const pages = $$(".page");

const startButton = $("#startButton");
const unlockForm = $("#unlockForm");
const secretCode = $("#secretCode");
const codeMessage = $("#codeMessage");

const memoryPaper = $("#memoryPaper");
const revealedPhoto = $("#revealedPhoto");
const memoryCaption = $("#memoryCaption");

const teddyStage = $("#teddyStage");
const maleTeddy = $("#maleTeddy");
const femaleTeddy = $("#femaleTeddy");
const teddyMessage = $("#teddyMessage");

const proposalActions = $("#proposalActions");
const answerActions = $("#answerActions");
const giftArea = $("#giftArea");
const giftBox = $("#giftBox");
const giftPhoto = $("#giftPhoto");
const giftMessage = $("#giftMessage");

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

let currentPage = 1;
let teddySequenceTimer = null;
let giftOpened = false;
let proposalAccepted = false;


/* =========================================
   PAGE NAVIGATION
========================================= */

function goToPage(pageNumber) {
  const destination = $("#page" + pageNumber);

  if (!destination) {
    console.error("Page not found:", pageNumber);
    return;
  }

  // Hide every page first.
  pages.forEach((page) => {
    page.classList.remove("active");
    page.hidden = true;
    page.setAttribute("aria-hidden", "true");
  });

  // Show only the requested page.
  destination.hidden = false;
  destination.classList.add("active");
  destination.setAttribute("aria-hidden", "false");

  currentPage = pageNumber;

  // Always start the new page at the top.
  window.scrollTo({ top: 0, behavior: "auto" });

  // Start the teddy scene only when page 4 opens.
  if (pageNumber === 4) {
    startTeddySequence();
  }
}

// Ensure the first page is the only visible page on startup.
pages.forEach((page) => {
  const isFirstPage = page.id === "page1";
  page.hidden = !isFirstPage;
  page.classList.toggle("active", isFirstPage);
  page.setAttribute("aria-hidden", String(!isFirstPage));
});

$("#backTo1").addEventListener("click", () => goToPage(1));
$("#backTo2").addEventListener("click", () => goToPage(2));

startButton.addEventListener("click", () => {
  goToPage(2);
  secretCode.focus();
});

$("#toPage4").addEventListener("click", () => {
  goToPage(4);
});


/* =========================================
   PAGE 2: SECRET PASSWORD
========================================= */

unlockForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredCode = secretCode.value.trim();

  if (enteredCode === SECRET_CODE) {
    codeMessage.textContent = "Correct! Our memories are waiting for you. ❤️";
    codeMessage.classList.add("success");

    // Give the success message a moment before changing pages.
    window.setTimeout(() => {
      goToPage(3);
    }, 650);
  } else {
    codeMessage.textContent = "Not quite, my love. Try the secret code again. 💗";
    codeMessage.classList.remove("success");

    secretCode.value = "";
    secretCode.focus();
  }
});


/* =========================================
   PAGE 3: FLOATING PHOTO BALLOONS
========================================= */

$$(".photo-balloon").forEach((balloon) => {
  balloon.addEventListener("click", () => {
    const index = Number(balloon.dataset.photo);
    const memory = memories[index];

    if (!memory) return;

    // Mark this balloon as revealed.
    balloon.classList.add("revealed");

    // Show the selected photo and caption.
    revealedPhoto.src = memory.image;
    revealedPhoto.alt = "Memory " + (index + 1);
    memoryCaption.textContent = memory.caption;
    memoryPaper.hidden = false;

    // Report a missing photo rather than silently failing.
    revealedPhoto.onerror = () => {
      memoryCaption.textContent =
        "This photo could not be loaded. Check its filename and the images folder.";
    };

    // Move the memory card into view if needed.
    memoryPaper.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });
});

$("#closeMemory").addEventListener("click", () => {
  memoryPaper.hidden = true;
  revealedPhoto.removeAttribute("src");
});


/* =========================================
   PAGE 4: TEDDY PROPOSAL SEQUENCE
========================================= */

function clearTeddyTimer() {
  if (teddySequenceTimer !== null) {
    window.clearTimeout(teddySequenceTimer);
    teddySequenceTimer = null;
  }
}

function startTeddySequence() {
  clearTeddyTimer();

  // Prevent the sequence from replaying on every visit.
  if (teddyStage.dataset.started === "true") return;

  teddyStage.dataset.started = "true";

  teddyMessage.textContent =
    "Someone special is making his grand entrance... 🧸";

  // The male teddy lands, then the proposal appears.
  teddySequenceTimer = window.setTimeout(() => {
    teddyStage.classList.add("landed");
    maleTeddy.classList.add("proposing");

    teddyMessage.textContent =
      "He has a little ring and a very big question for you. 💍";

    proposalActions.hidden = false;
  }, 1550);
}

$("#proposeButton").addEventListener("click", () => {
  if (proposalAccepted) return;
  proposalAccepted = true;

  proposalActions.hidden = true;
  answerActions.hidden = false;

  maleTeddy.classList.remove("proposing");

  teddyMessage.textContent =
    "She said yes! His little heart is overflowing with happiness. ❤️";

  // Bring the female teddy in for a hug.
  femaleTeddy.classList.add("approaching");

  teddySequenceTimer = window.setTimeout(() => {
    teddyStage.classList.add("hugging");

    teddyMessage.textContent =
      "Two little bears, one big hug, and a whole lot of love. 🧸💕";

    // Show the gift after the hug animation.
    teddySequenceTimer = window.setTimeout(() => {
      giftArea.hidden = false;
      giftArea.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

      teddyMessage.textContent =
        "Your teddy has one last surprise, especially for you. 🎁";
    }, 950);
  }, 1750);
});

$("#thinkButton").addEventListener("click", () => {
  teddyMessage.textContent =
    "Take all the time you need, my love. This little teddy is waiting patiently. 💗";
});


/* =========================================
   GIFT BOX: REVEAL THE SPECIAL PHOTO
========================================= */

giftBox.addEventListener("click", () => {
  if (giftOpened) return;

  giftOpened = true;
  giftBox.classList.add("opened");
  giftMessage.hidden = false;

  teddyMessage.textContent =
    "A special gift from your teddy, with all his love. 🎁❤️";

  // Gently move the revealed message into view.
  window.setTimeout(() => {
    giftMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, 300);
});


/* =========================================
   DECORATIVE BACKGROUND SPARKLES
========================================= */

function createSparkles() {
  const container = $("#sparkles");
  if (!container) return;

  container.replaceChildren();

  for (let i = 0; i < 32; i++) {
    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";
    sparkle.textContent = i % 3 === 0 ? "✦" : "✧";

    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.fontSize = (8 + Math.random() * 12) + "px";
    sparkle.style.setProperty(
      "--duration",
      (3 + Math.random() * 4) + "s"
    );

    sparkle.style.animationDelay = (-Math.random() * 5) + "s";

    container.appendChild(sparkle);
  }
}

createSparkles();


/* =========================================
   RESTART THE ENTIRE STORY
========================================= */

$("#restartButton").addEventListener("click", () => {
  clearTeddyTimer();

  // Reset password screen.
  secretCode.value = "";
  codeMessage.textContent = "";
  codeMessage.classList.remove("success");

  // Reset photo memories.
  $$(".photo-balloon").forEach((balloon) => {
    balloon.classList.remove("revealed");
  });

  memoryPaper.hidden = true;
  revealedPhoto.removeAttribute("src");
  memoryCaption.textContent = "";

  // Reset teddy animations.
  teddyStage.classList.remove("landed", "hugging");
  teddyStage.dataset.started = "false";

  maleTeddy.classList.remove("proposing");
  femaleTeddy.classList.remove("approaching");

  proposalActions.hidden = true;
  answerActions.hidden = true;

  // Reset gift.
  giftArea.hidden = true;
  giftBox.classList.remove("opened");
  giftMessage.hidden = true;
  giftOpened = false;
  proposalAccepted = false;

  // Reset the original teddy message.
  teddyMessage.textContent = "Someone special is on his way...";

  // Return to the beginning.
  goToPage(1);
});
