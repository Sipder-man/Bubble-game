document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("panel");
  const startScreen = document.getElementById("start-screen");
  const startBtn = document.getElementById("start-btn");

  let score = 0;
  let hitNumber = 0;
  let timer = 30;
  let isGameOver = false;

  // Sound Effects
  const startSound = new Audio("sounds/start.mp3");
  const timerEndSound = new Audio("sounds/timer_end.mp3");
  const bubbleClickSound = new Audio("sounds/bubble_click.mp3");
  const gameOverSound = new Audio("sounds/game_over.mp3");

  // Play start sound
  function playStartSound() {
    startSound.play();
  }

  // Play timer end sound
  function playTimerEndSound() {
    timerEndSound.play();
  }

  // Play bubble click sound
  function playBubbleClickSound() {
    bubbleClickSound.play();
  }

  // Play game over sound
  function playGameOverSound() {
    gameOverSound.play();
  }

  // Create bubbles
  function makeBubble() {
    let clutter = "";
    for (let i = 0; i < 150; i++) {
      let rand = Math.floor(Math.random() * 10);
      clutter += `<div class="bubble">${rand}</div>`;
    }
    document.querySelector("#pbottom").innerHTML = clutter;
  }

  // Generate new hit number
  function getNewHit() {
    hitNumber = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitNumber;
  }

  // Update score
  function updateScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
  }

  // Run the timer
  function runTimer() {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        timer--;
        document.querySelector("#timerval").textContent = timer;
      } else {
        clearInterval(timerInterval);
        playTimerEndSound(); // Play sound when timer ends
        isGameOver = true;
        showGameOverScreen();
      }
    }, 1000);
  }

  // Display game over screen
  function showGameOverScreen() {
    playGameOverSound(); // Play game over sound
    document.querySelector("#pbottom").innerHTML = `
      <div class="game-over">
        <h1>Game Over</h1>
        <p>Your Score: <strong>${score}</strong></p>
        <button id="play-again-btn">Play Again</button>
      </div>
    `;

    document.getElementById("play-again-btn").addEventListener("click", () => {
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

  // Handle bubble click
  document.querySelector("#pbottom").addEventListener("click", function (e) {
    if (isGameOver) return;

    const clickedNum = Number(e.target.textContent);
    if (!isNaN(clickedNum) && clickedNum === hitNumber) {
      updateScore();
      playBubbleClickSound(); // Play sound when bubble is clicked
      getNewHit();
      makeBubble();
    }
  });

  // Start button functionality
  startBtn.addEventListener("click", () => {
    playStartSound(); // Play sound when game starts
    startScreen.style.display = "none";
    panel.classList.remove("hidden");
    getNewHit();
    makeBubble();
    runTimer();
  });
});
