const messages = [
  {
    msg: "Hello Tamanna 🌸",
    instruction: "If you are seeing this… it means it’s 5th Sept 🎉"
  },
  {
    msg: "Great! 🌟",
    instruction: "Now do you remember i gave you a box and said don't open it until i say so well guess what now it is the time take out the device turn it on and press the push button 🔘"
  },
  {
    msg: "Hmm… but first, choose the correct key 🔑",
    instruction: "Only one will unlock the next surprise…",
    mystery: true
  },
  {
    msg: "Amazing! 💖",
    instruction: "Now time to see the message in the greeting card .So go on and open the greeting card and read it 💌"
  },
  {
    msg: "Happy Birthday Tamanna ❤️",
    instruction: "🎂🎉 May this day be as special as you are 🎉🎂,\n This was my way of saying Happy Birthday to my dear  best friend ",
    heartbeat: true
  }
];

let step = 0;
const messageEl = document.getElementById("message");
const instructionEl = document.getElementById("instruction");
const nextBtn = document.getElementById("nextBtn");
const choicesDiv = document.getElementById("choices");

// Typing effect
function typeText(element, text, callback) {
  element.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    element.innerHTML = text.substring(0, i+1) + '<span class="typing"></span>';
    i++;
    if (i === text.length) {
      clearInterval(interval);
      element.innerHTML = text;
      if (callback) callback();
    }
  }, 70);
}

// Suspense reveal with delay
function suspenseReveal(text, callback) {
  messageEl.innerHTML = "⏳ Unlocking surprise...";
  instructionEl.innerHTML = "";
  setTimeout(() => {
    typeText(messageEl, text, callback);
  }, 2000);
}

// Handle button click
nextBtn.addEventListener("click", () => {
  step++;
  if (step < messages.length) {
    const data = messages[step];
    messageEl.classList.remove("heartbeat", "glitch");

    if (data.mystery) {
      suspenseReveal(data.msg, () => {
        instructionEl.innerHTML = data.instruction;
        nextBtn.style.display = "none";
        showMysteryChoices();
      });
    } else {
      suspenseReveal(data.msg, () => {
        instructionEl.innerHTML = data.instruction;
        if (data.heartbeat) {
          // glitch first, then heartbeat
          messageEl.classList.add("glitch");
          setTimeout(() => {
            messageEl.classList.remove("glitch");
            messageEl.classList.add("heartbeat");
          }, 2500);
        }
      });
    }
  } else {
    nextBtn.style.display = "none";
  }
});

// Mystery choices
function showMysteryChoices() {
  choicesDiv.style.display = "block";
  choicesDiv.innerHTML = "";
  const options = ["🔒", "🔑", "🎁"];
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === "🔑") {
        choicesDiv.style.display = "none";
        nextBtn.style.display = "inline-block";
        nextBtn.click();
      } else {
        instructionEl.innerHTML = "❌ Wrong key… try again!";
      }
    };
    choicesDiv.appendChild(btn);
  });
}

// 🎉 Falling emojis
const icons = ["🌸","🎈","✨","💖"];
function createFalling() {
  const el = document.createElement("div");
  el.classList.add("falling");
  el.innerHTML = icons[Math.floor(Math.random() * icons.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDuration = 3 + Math.random() * 5 + "s";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 7000);
}
setInterval(createFalling, 700);
