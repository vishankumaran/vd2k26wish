
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);

  const slide1 = $("#slide1");
  const slide2 = $("#slide2");
  const slide3 = $("#slide3");
  const slide4 = $("#slide4");

  // The real code is exactly :2007
  const SECRET_CODE = ":2007";

  // Your four images, in the order you requested.
  const memories = [
    {
      image: "images/IMG_20260829_210124_069.jpg",
      caption: "One more little piece of our story. ❤️"
    },
    {
      image: "images/Screenshot_20260914-215430.jpg",
      caption: "A memory I want to keep close to my heart. 💗"
    },
    {
      image: "images/file_00000000f3f47208bfd42682f109e520.png",
      caption: "You make ordinary moments feel special. ✨"
    },
    {
      image: "images/IMG_20260620_233429_765.jpg",
      caption: "My favourite wallpaper, my favourite person. ❤️"
    }
  ];

  // Lock later slides until the correct code is entered.
  slide3.classList.add("locked");
  slide4.classList.add("locked");

  function goToSlide(slide) {
    slide.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Background sparkles
  const sparkleLayer = $("#sparkles");
  const sparkleSymbols = ["✦", "✧", "·", "♥"];

  for (let i = 0; i < 38; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.textContent =
      sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];

    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.setProperty("--duration", `${4 + Math.random() * 7}s`);
    sparkle.style.animationDelay = `${Math.random() * -8}s`;
    sparkle.style.fontSize = `${8 + Math.random() * 15}px`;

    sparkleLayer.appendChild(sparkle);
  }

  // SLIDE 1: hearts meet
  const heartMeeting = $("#heartMeeting");
  const meetHeartsBtn = $("#meetHeartsBtn");
  const toLockBtn = $("#toLockBtn");
  const heartCaption = $("#heartCaption");

  meetHeartsBtn.addEventListener("click", () => {
    heartMeeting.classList.add("merged");
    heartCaption.textContent =
      "Two hearts found each other… and our story began. ❤️";

    meetHeartsBtn.disabled = true;
    meetHeartsBtn.textContent = "Our hearts have met ♥";

    toLockBtn.hidden = false;
    toLockBtn.focus();
  });

  toLockBtn.addEventListener("click", () => goToSlide(slide2));

  // SLIDE 2: exact secret code
  const unlockForm = $("#unlockForm");
  const secretCode = $("#secretCode");
  const codeMessage = $("#codeMessage");

  unlockForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (secretCode.value === SECRET_CODE) {
      codeMessage.textContent = "Unlocked! Your memories are waiting. ❤️";
      codeMessage.style.color = "#aaffd5";

      // Unlock the next two slides only after the correct code.
      slide3.classList.remove("locked");
      slide4.classList.remove("locked");

      window.setTimeout(() => {
        goToSlide(slide3);
      }, 650);
    } else {
      codeMessage.textContent = "Not quite, my love. Try the correct code. 💗";
      codeMessage.style.color = "#ff9ec6";

      secretCode.value = "";
      secretCode.focus();

      secretCode.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(0)" }
        ],
        { duration: 220 }
      );
    }
  });

  // SLIDE 3: reveal photos inside floating heart balloons
  const balloons = document.querySelectorAll(".photo-balloon");
  const memoryPaper = $("#memoryPaper");
  const revealedPhoto = $("#revealedPhoto");
  const memoryCaption = $("#memoryCaption");
  const closeMemory = $("#closeMemory");

  balloons.forEach((balloon) => {
    balloon.addEventListener("click", () => {
      const index = Number(balloon.dataset.photo);
      const memory = memories[index];

      if (!memory) return;

      // Show the photo inside the heart and in the large memory view.
      balloon.classList.add("revealed");
      revealedPhoto.src = memory.image;
      revealedPhoto.alt = memory.caption;
      memoryCaption.textContent = memory.caption;
      memoryPaper.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  function hideMemory() {
    memoryPaper.hidden = true;
    document.body.style.overflow = "";
  }

  closeMemory.addEventListener("click", hideMemory);

  memoryPaper.addEventListener("click", (event) => {
    if (event.target === memoryPaper) hideMemory();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !memoryPaper.hidden) {
      hideMemory();
    }
  });

  $("#toTeddyBtn").addEventListener("click", () => goToSlide(slide4));

  // SLIDE 4: teddy proposal
  const teddyStage = $("#teddyStage");
  const maleTeddy = $("#maleTeddy");
  const femaleTeddy = $("#femaleTeddy");
  const teddyMessage = $("#teddyMessage");
  const pocketRing = $("#pocketRing");
  const landingHearts = $("#landingHearts");

  const proposalActions = $("#proposalActions");
  const answerActions = $("#answerActions");
  const proposeBtn = $("#proposeBtn");
  const acceptBtn = $("#acceptBtn");
  const thinkBtn = $("#thinkBtn");

  const giftArea = $("#giftArea");
  const giftBox = $("#giftBox");
  const giftMessage = $("#giftMessage");
  const restartBtn = $("#restartBtn");

  let proposalStarted = false;
  let accepted = false;
  let giftOpened = false;

  proposeBtn.addEventListener("click", () => {
    if (proposalStarted) return;
    proposalStarted = true;

    proposeBtn.disabled = true;
    teddyMessage.textContent =
      "Look! Your teddy is jumping down to see you! 🧸";

    maleTeddy.classList.remove("land");
    void maleTeddy.offsetWidth;
    maleTeddy.classList.add("land");

    window.setTimeout(() => {
      landingHearts.classList.add("show");
      teddyMessage.textContent =
        "I brought you something small… but my love is enormous. 💗";

      // The ring was hidden in his pocket until the proposal.
      pocketRing.classList.add("visible");
      answerActions.hidden = false;
      proposalActions.hidden = true;
    }, 1650);
  });

  thinkBtn.addEventListener("click", () => {
    teddyMessage.textContent =
      "I'll wait right here with my little teddy heart. 🥺❤️";
  });

  acceptBtn.addEventListener("click", () => {
    if (accepted) return;
    accepted = true;

    answerActions.hidden = true;
    pocketRing.classList.remove("visible");

    teddyMessage.textContent =
      "She said YES! His favourite girl is coming for a hug. 💞";

    // Female teddy approaches slowly from the side.
    femaleTeddy.classList.remove("walking");
    void femaleTeddy.offsetWidth;
    femaleTeddy.classList.add("walking");

    window.setTimeout(() => {
      teddyStage.classList.add("hugging");
      teddyMessage.textContent =
        "A warm teddy hug… and two hearts together. 🧸❤️";

      window.setTimeout(() => {
        giftArea.hidden = false;
        giftArea.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 1000);
    }, 2900);
  });

  // Touch/click the gift to open it.
  giftBox.addEventListener("click", () => {
    if (giftOpened) return;
    giftOpened = true;

    giftBox.classList.add("opened");
    giftMessage.hidden = false;
    teddyMessage.textContent =
      "A little gift from him, made just for you. 🎁❤️";
  });

  // Replay all four slides from the beginning.
  restartBtn.addEventListener("click", () => {
    proposalStarted = false;
    accepted = false;
    giftOpened = false;

    heartMeeting.classList.remove("merged");
    heartCaption.textContent =
      "Two hearts, slowly finding their way home.";
    meetHeartsBtn.disabled = false;
    meetHeartsBtn.innerHTML = 'Let our hearts meet <span>♥</span>';
    toLockBtn.hidden = true;

    secretCode.value = "";
    codeMessage.textContent = "";

    balloons.forEach((balloon) => balloon.classList.remove("revealed"));
    hideMemory();

    maleTeddy.classList.remove("land");
    femaleTeddy.classList.remove("walking");
    teddyStage.classList.remove("hugging");
    pocketRing.classList.remove("visible");
    landingHearts.classList.remove("show");

    proposalActions.hidden = false;
    answerActions.hidden = true;
    giftArea.hidden = true;
    giftBox.classList.remove("opened");
    giftMessage.hidden = true;

    proposeBtn.disabled = false;
    teddyMessage.textContent =
      "Wait… someone is coming to see you. 🧸";

    slide3.classList.add("locked");
    slide4.classList.add("locked");

    goToSlide(slide1);
  });
});
