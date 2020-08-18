const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log(randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//Start recognition and game:
recognition.start();

//Do something with captured speech:
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
  console.log(msg);
}

//Write what the user speaks:
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You said: </div>
  <span class="box">${msg}</span>
  `;
}

//Check the spoken number against random number generated:
function checkNumber(msg) {
  const num = +msg;

  //Check if you spoke a valid number:
  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<div>That is not a valid number</div>';
    return;
  }

  //Check if the number spoken is between 1 and 100:
  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
    return;
  }

  //Checking the number for the game:
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congratulations! You have guessed the number! <br><br> It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}

//Generate a random number between 1 and 100:
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//Speak the result gained from the speech recog:
recognition.addEventListener('result', onSpeak);

//Allow multiple goes:
recognition.addEventListener('end', () => recognition.start());

//Play Again button functionality:
document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});