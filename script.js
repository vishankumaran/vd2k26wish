
/* ==========================================
   UNLOCK MY HEART — PERSONAL SETTINGS
   ========================================== */

const CONFIG = {
  password: "2604",

  memories: [
    {
      title: "The first little spark",
      caption: "Two strangers, and a story neither expected.",
      image: "images/photo1.jpg"
    },
    {
      title: "A moment to keep",
      caption: "Some moments become precious without even trying.",
      image: "images/photo2.jpg"
    },
    {
      title: "A smile I remember",
      caption: "One little memory that still makes me smile.",
      image: "images/photo3.jpg"
    },
    {
      title: "Our own little world",
      caption: "Even ordinary moments feel different with you.",
      image: "images/photo4.jpg"
    },
    {
      title: "A favourite feeling",
      caption: "You have a way of making a moment special.",
      image: "images/photo5.jpg"
    },
    {
      title: "Close to my heart",
      caption: "If I could, I would save this moment forever.",
      image: "images/photo6.jpg"
    },
    {
      title: "Still my favourite",
      caption: "One more little piece of our story.",
      image: "images/photo7.jpg"
    }
  ],

  giftImage: "images/gift.jpg",

  giftMessage:
    "Your presence is enough for me. Happy Birthday, my favourite person. ❤️"
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const reducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const wait = ms =>
  new Promise(resolve => setTimeout(resolve, reducedMotion ? 0 : ms));


/* ==========================================
   GENERAL HELPERS
   ========================================== */

function showPage(id) {
  $$(".page").forEach(page => {
    page.classList.toggle("active", page.id === id);
  });

  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? "auto" : "smooth"
  });
}

function burstParticles(element, count = 25) {
  if (reducedMotion) return Promise.resolve();

  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const symbols = ["♥", "✦", "✧", "•"];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 45 + Math.random() * 145;

    particle.className = "particle";
    particle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);
    particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    particle.style.setProperty("--size", `${10 + Math.random() * 17}px`);
    particle.style.setProperty(
      "--particle-color",
      Math.random() > 0.5 ? "#ffc4df" : "#f6d7a4"
    );

    $("#particles").appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove());
  }

  return wait(950);
}

function setImage(img, placeholder, path) {
  img.style.display = "block";
  placeholder.style.display = "none";

  img.onload = () => {
    img.style.display = "block";
    placeholder.style.display = "none";
  };

  img.onerror = () => {
    img.style.display = "none";
    placeholder.style.display = "grid";
  };

  img.src = path;
}

function restartAnimation(element, className) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}


/* ==========================================
   PAGE 1 — TWO BROKEN HEARTS
   ========================================== */

async function startHeartAnimation() {
  await wait(700);

  $("#heartHint").textContent =
    "Two different hearts… slowly finding each other.";

  $("#heartScene").classList.add("merging");

  await wait(2100);

  $("#heartScene").classList.remove("merging");
  $("#heartScene").classList.add("merged");

  $("#heartHint").textContent =
    "Two hearts. One little story. Now unlock it. ♥";

  await wait(800);

  $("#passwordPanel").classList.remove("hidden");
}

startHeartAnimation();


/* PASSWORD CHECK */

$("#passwordForm").addEventListener("submit", async event => {
  event.preventDefault();

  const input = $("#passwordInput").value.trim();

  if (input !== CONFIG.password) {
    $("#passwordMessage").textContent =
      "Not quite, madam… try our special date. 💗";

    restartAnimation($("#passwordPanel"), "shake");
    $("#passwordInput").select();
    return;
  }

  $("#passwordMessage").textContent =
    "You unlocked a little piece of our story. ♥";

  $("#heartScene").classList.add("merging");

  await burstParticles($("#heartScene"), 40);
  await wait(250);

  createMemoryHearts();
  showPage("page2");
});


/* ==========================================
   PAGE 2 — SEVEN PHOTO MEMORIES
   ========================================== */

let openedMemories = new Set();
let currentMemory = 0;
let memoryOpen = false;

function createMemoryHearts() {
  const grid = $("#heartsGrid");
  grid.innerHTML = "";

  CONFIG.memories.forEach((memory, index) => {
    const heart = document.createElement("button");

    heart.type = "button";
    heart.className = "memory-heart";
    heart.textContent = "♥";
    heart.dataset.number = index + 1;
    heart.style.setProperty("--delay", `${index * -0.2}s`);
    heart.setAttribute("aria-label", `Open memory ${index + 1}`);

    heart.addEventListener("click", () => openMemory(index));

    grid.appendChild(heart);
  });
}

function openMemory(index) {
  if (memoryOpen) return;

  memoryOpen = true;
  currentMemory = index;

  const memory = CONFIG.memories[index];

  $("#memoryTitle").textContent = memory.title;
  $("#memoryCaption").textContent = memory.caption;

  setImage(
    $("#memoryPhoto"),
    $("#memoryPlaceholder"),
    memory.image
  );

  $("#memoryModal").classList.remove("hidden");
}

function closeMemory() {
  $("#memoryModal").classList.add("hidden");
  memoryOpen = false;
}

$("#closeMemory").addEventListener("click", closeMemory);

$("#memoryModal").addEventListener("click", event => {
  if (event.target === $("#memoryModal")) {
    closeMemory();
  }
});

document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    !$("#memoryModal").classList.contains("hidden")
  ) {
    closeMemory();
  }
});


/* KEEP A MEMORY */

$("#keepMemory").addEventListener("click", async () => {
  openedMemories.add(currentMemory);

  const heart = $$(".memory-heart")[currentMemory];

  if (heart) {
    heart.classList.add("opened");
    heart.setAttribute(
      "aria-label",
      `Memory ${currentMemory + 1} discovered`
    );
  }

  $("#progress").textContent =
    `${openedMemories.size} / 7 memories discovered`;

  closeMemory();

  await burstParticles($("#heartsGrid"), 16);

  if (openedMemories.size === CONFIG.memories.length) {
    $("#memoryHint").textContent =
      "All seven memories are safe in your heart. ❤️";

    $("#continueButton").classList.remove("hidden");
  } else {
    const remaining = 7 - openedMemories.size;

    $("#memoryHint").textContent =
      `${remaining} more ${remaining === 1 ? "memory" : "memories"} waiting for you.`;
  }
});


/* MOVE TO TEDDY */

$("#continueButton").addEventListener("click", async () => {
  await burstParticles($("#heartsGrid"), 35);

  showPage("page3");

  const teddy = $("#teddy");

  restartAnimation(teddy, "proposing");

  setTimeout(() => {
    teddy.classList.remove("proposing");
  }, 1500);
});


/* ==========================================
   PAGE 3 — VISHAN'S TEDDY PROPOSAL
   ========================================== */

let rejectionCount = 0;

const rejectionMessages = [
  {
    dialogue: "Aiyoo… once yosichu paarunga madam 🥺❤️",
    reaction: "Teddy is shocked and hugging its little heart."
  },
  {
    dialogue: "Naan ivlo cute-ah kekkuren… 🥹💗",
    reaction: "Teddy is getting dramatically emotional now."
  },
  {
    dialogue: "Accept panna ma enna pandringa madam 😤❤️",
    reaction: "Teddy has entered cute grumpy mode!"
  }
];

const teddy = $("#teddy");


/* PLAYFUL REJECTION */

$("#noButton").addEventListener("click", async () => {
  rejectionCount++;

  const message = rejectionMessages[
    Math.min(rejectionCount - 1, rejectionMessages.length - 1)
  ];

  $("#dialogue").textContent = message.dialogue;
  $("#reaction").textContent = message.reaction;

  teddy.classList.remove("proposing", "grumpy", "sad", "happy");

  if (rejectionCount === 1) {
    teddy.classList.add("sad");

    $("#noButton").textContent = "Still thinking 🙈";
  } else if (rejectionCount === 2) {
    teddy.classList.add("sad");

    $("#noButton").textContent = "Hmm… let me think";
  } else {
    teddy.classList.add("grumpy");

    $("#yesButton").textContent = "SERI, YES! 💗";
    $("#noButton").textContent = "Ask me sweetly 🥹";
  }

  // Teddy makes a cute little bow before asking again.
  await wait(500);

  teddy.classList.remove("sad", "grumpy");
  restartAnimation(teddy, "proposing");

  setTimeout(() => {
    teddy.classList.remove("proposing");
  }, 1400);
});


/* ACCEPT THE PROPOSAL */

$("#yesButton").addEventListener("click", async () => {
  $("#proposalButtons").classList.add("hidden");

  $("#dialogue").textContent =
    "Awww! She said YES! Teddy is the happiest bear ever! 🥹💗";

  $("#reaction").textContent =
    "Look at him jumping with happiness!";

  teddy.classList.remove("sad", "grumpy", "proposing");
  restartAnimation(teddy, "happy");

  await burstParticles(teddy, 40);
  await wait(700);

  $("#giftArea").classList.remove("hidden");

  $("#giftMessage").textContent = CONFIG.giftMessage;

  setImage(
    $("#giftPhoto"),
    $("#giftPlaceholder"),
    CONFIG.giftImage
  );

  $("#giftArea").scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start"
  });
});


/* ==========================================
   MAGICAL GIFT BOX
   ========================================== */

$("#giftBox").addEventListener("click", async () => {
  const box = $("#giftBox");

  if (box.classList.contains("open")) return;

  box.classList.add("open");

  await burstParticles(box, 40);
  await wait(350);

  $("#giftReveal").classList.remove("hidden");

  $("#giftReveal").scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "center"
  });
});


/* ==========================================
   RESTART THE EXPERIENCE
   ========================================== */

$("#restartButton").addEventListener("click", () => {
  openedMemories = new Set();
  currentMemory = 0;
  memoryOpen = false;
  rejectionCount = 0;

  $("#passwordInput").value = "";
  $("#passwordMessage").textContent = "";
  $("#passwordPanel").classList.add("hidden");

  $("#heartScene").classList.remove("merging", "merged");
  $("#heartHint").textContent = "Watch the hearts find each other…";

  $("#progress").textContent = "0 / 7 memories discovered";
  $("#memoryHint").textContent = "Every heart has a story.";
  $("#continueButton").classList.add("hidden");

  $("#giftArea").classList.add("hidden");
  $("#giftBox").classList.remove("open");
  $("#giftReveal").classList.add("hidden");

  $("#proposalButtons").classList.remove("hidden");
  $("#yesButton").textContent = "YES, OF COURSE! 💗";
  $("#noButton").textContent = "Let me think 🙈";

  $("#dialogue").textContent =
    "Madam… en kooda forever irupeengala? 🥹❤️";

  $("#reaction").textContent = "Teddy is feeling shy…";

  teddy.classList.remove("happy", "grumpy", "sad", "proposing");

  createMemoryHearts();
  showPage("page1");

  startHeartAnimation();
});
