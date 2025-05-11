document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("panel");
  const startScreen = document.getElementById("start-screen");
  const startBtn = document.getElementById("start-btn");

  let score = 0;
  let hitNumber = 0;
  let timer = 30;
  let isGameOver = false;

  // Sound effects
  const startSound = new Audio('sounds/start.mp3');
  const timerSound = new Audio('sounds/timer.mp3');
  const playAgainSound = new Audio('sounds/playagain.mp3');
  const clickSound = new Audio('sounds/click.mp3');

  function makeBubble() {
    let clutter = "";
    for (let i = 0; i < 150; i++) {
      let rand = Math.floor(Math.random() * 10);
      clutter += `<div class="bubble">${rand}</div>`;
    }
    document.querySelector("#pbottom").innerHTML = clutter;
  }

  function getNewHit() {
    hitNumber = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitNumber;
  }

  function updateScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
  }

  function runTimer() {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        timer--;
        document.querySelector("#timerval").textContent = timer;
        timerSound.play();
      } else {
        clearInterval(timerInterval);
        timerSound.pause();  // Stop the timer sound
        timerSound.currentTime = 0; // Reset the sound to the start
        isGameOver = true;
        showGameOverScreen();
      }
    }, 1000);
  }

  function showGameOverScreen() {
    document.querySelector("#pbottom").innerHTML = `
      <div class="game-over">
        <h1>Game Over</h1>
        <p>Your Score: <strong>${score}</strong></p>
        <button id="play-again-btn">Play Again</button>
      </div>
    `;
    document.getElementById("play-again-btn").addEventListener("click", () => {
      playAgainSound.play();
      score = 0;
      timer = 30;
      isGameOver = false;
      document.querySelector("#scoreval").textContent = score;
      document.querySelector("#timerval").textContent = timer;
      getNewHit();
      makeBubble();
      runTimer();
    });
  }

  document.querySelector("#pbottom").addEventListener("click", function (e) {
    if (isGameOver) return;

    const clickedNum = Number(e.target.textContent);
    if (!isNaN(clickedNum) && clickedNum === hitNumber) {
      clickSound.play();
      updateScore();
      getNewHit();
      makeBubble();
    }
  });

  startBtn.addEventListener("click", () => {
    startSound.play();
    startScreen.style.display = "none";
    panel.classList.remove("hidden");
    getNewHit();
    makeBubble();
    runTimer();
  });
});
