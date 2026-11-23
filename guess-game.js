var MAX_ATTEMPTS = 5;
var target = 0;
var attempts = 0;

var guessInput = document.getElementById("guess-value");
var guessBtn = document.getElementById("guess-btn");
var restartBtn = document.getElementById("restart-btn");
var attemptEl = document.getElementById("attempt");
var resultEl = document.getElementById("result");

function isNumeric(value) {
  return value.trim() !== "" && !isNaN(value) && isFinite(value);
}

function showRestart() {
  guessBtn.style.display = "none";
  restartBtn.style.display = "block";
}

function showGuess() {
  restartBtn.style.display = "none";
  guessBtn.style.display = "block";
}

// Initial state (also on refresh)
function init() {
  guessInput.value = "";
  attempts = 0;
  attemptEl.innerHTML = attempts;
  resultEl.innerHTML = "";
  resultEl.className = "";
  showRestart();
}

function restart() {
  target = Math.floor(Math.random() * 20) + 1;
  attempts = 0;
  attemptEl.innerHTML = attempts;
  resultEl.innerHTML = "";
  resultEl.className = "";
  guessInput.value = "";
  showGuess();
  guessInput.focus();
}

function guess() {
  var raw = guessInput.value;
  if (!isNumeric(raw)) {
    return; // empty or non-number: do nothing
  }

  var value = Number(raw);
  attempts++;
  attemptEl.innerHTML = attempts;
  resultEl.className = "";

  if (value === target) {
    resultEl.innerHTML = "You WIN";
    resultEl.className = "win";
    showRestart();
  } else if (attempts >= MAX_ATTEMPTS) {
    resultEl.innerHTML = "You LOSE (the number was " + target + ")";
    resultEl.className = "lose";
    showRestart();
  } else if (value > target) {
    resultEl.innerHTML = value + " is too high";
  } else {
    resultEl.innerHTML = value + " is too low";
  }

  guessInput.value = 0;
  if (guessBtn.style.display !== "none") {
    guessInput.focus();
    guessInput.select();
  }
}

guessBtn.addEventListener("click", guess);
restartBtn.addEventListener("click", restart);
guessInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && guessBtn.style.display !== "none") {
    guess();
  }
});

init();