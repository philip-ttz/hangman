const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");
const gameModal = document.querySelector(".game-modal");
const playAgain = document.querySelector(".play-again");

const wordList = ["analphabet","beruhigungsmittel", "schullandheim", "informatik","wirtschaft"];

let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;


function getRandomWord(){
    const word = wordList[Math.floor(Math.random()*wordList.length)];
    currentWord=word;
    resetGame();
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

function initGame(button, clickedLetter){
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else{
        wrongGuessCount++;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

function gameOver(isWon){
    setTimeout(() =>{
        const modalText = isWon ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("h4").innerText = `${isWon ? 'Congratulations' : 'Game Over'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300)
}

function resetGame(){
    correctLetters =[];
    wrongGuessCount = 0;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

for (let i = 97; i < 122; i++) {
    const button = document.createElement("button");
    button.innerText= String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgain.addEventListener("click", getRandomWord);