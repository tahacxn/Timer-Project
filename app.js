// Get references to the HTML elements
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const startButton = document.querySelector('.start');
const settingsButton = document.querySelector('.settings');

let timerInterval; // Variable to store the timer interval
let isTimerRunning = false; // Variable to track the timer state

// Function to start the timer
function startTimer() {
  let minutes = parseInt(minutesInput.value);
  let seconds = parseInt(secondsInput.value);

  // Disable the input fields and start button during the timer
  minutesInput.disabled = true;
  secondsInput.disabled = true;

  if (isTimerRunning) {
    // Timer is running, so pause it
    clearInterval(timerInterval);
    isTimerRunning = false;
    startButton.textContent = 'Start';
  } else {
    // Timer is not running, so start it
    startButton.textContent = 'Pause';
    isTimerRunning = true;

    timerInterval = setInterval(() => {
      // Decrease the seconds
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else {
        // Timer has reached 00:00, stop the timer
        clearInterval(timerInterval);
        minutesInput.disabled = false;
        secondsInput.disabled = false;
        startButton.textContent = 'Start';
        isTimerRunning = false;
        showAlert('Your time is done');
        return;
      }

      // Update the input values
      minutesInput.value = padZero(minutes);
      secondsInput.value = padZero(seconds);
    }, 1000);
  }
}

// Function to display an alert
function showAlert(message) {
  alert(message);
}

// Function to pad single digits with a leading zero
function padZero(value) {
  return value.toString().padStart(2, '0');
}

// Function to handle the settings button click
function openSettings() {
  minutesInput.disabled = false;
  secondsInput.disabled = false;
}

// Event listener for the start button
startButton.addEventListener('click', startTimer);

// Event listener for the settings button
settingsButton.addEventListener('click', openSettings);
