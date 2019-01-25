/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/* * * * * * my code starts here * * * * * * */

const CardsDeck = document.querySelector(".deck");
let openedCards = []; //array for holding the open cards

CardsDeck.addEventListener("click", function (event) {
    const ClickedCard = event.target; //click on a card
    if (ClickedCard.classList.contains("card") &&
        !ClickedCard.classList.contains("show")) {
        cardCheck(ClickedCard);
        openCard(ClickedCard);
        addOpenCard(ClickedCard);
    }

    if (openedCards.length === 2) {
        movesCounter();
        matchCheck();
    }

    if (matchedCardPairs == allCardsMatched) {
        displayStats();
    }
});

function cardCheck(ClickedCard) {
    if (
        !ClickedCard.classList.contains("match") &&
        !openedCards.includes(ClickedCard)) {
        openCard(ClickedCard);
    }
}

function openCard(ClickedCard) {
    ClickedCard.classList.add("show", "open");
}

function addOpenCard(ClickedCard) {
    if (openedCards.length < 2) {
        openedCards.push(ClickedCard);
    }
}

/* * * Matching* * * */

function matchCheck() {
    if (openedCards[0].firstElementChild.className ===
        openedCards[1].firstElementChild.className) {
        isMatch();
    } else {
        noMatch();
    }
}

function isMatch() {
    openedCards[0].classList.add("match"); /* add match? */
    openedCards[1].classList.add("match");
    openedCards = [];
    //need to add matched cards to a new array to create game win!
    matchedCardPairs++;
}

function noMatch() {
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open");/* remove show and open? */;
        openedCards[1].classList.remove("show", "open");
        openedCards = [];
    }, 500);

}
/* * * * SHUFFLE * * * */
let cards = Array.from(document.querySelectorAll(".card"));

function CreateNewDeck() {
    const shuffleCards = shuffle(cards);
    for (card of cards) {
        CardsDeck.appendChild(card);
        card.classList.remove("open", "show", "match");//reset cards classes
    }
}

/* * * * GAME START * * * */

function startGame() {
    CreateNewDeck(); //shuffle cards
    totalMoves = 0;//reset moves
    movesDisplay.innerHTML = totalMoves;
    resetTimer();//time reset
    resetStars();//reset stars
    modal.style.display="none";
}

// function restartGame(){
//     modal.style.display="none";
//     startGame();
// }


/* * * * MOVES COUNT * * */

let totalMoves = 0;
let movesDisplay = document.querySelector(".moves");

function movesCounter() {
    totalMoves++;
    movesDisplay.innerHTML = totalMoves;
    starRating();
    if (totalMoves == 1) {
        timeCounter();
    }
}


/* * * * STAR RATING * * */
let stars = Array.from(document.querySelectorAll(".fa-star"));

function starRating() {
    if (totalMoves == 15) {
        stars[2].classList.replace("gold", "black");
    } else if (totalMoves == 20) {
        stars[1].classList.replace("gold", "black");
    } else if (totalMoves == 30) {
        stars[0].classList.replace("gold", "black");
    }
}

function resetStars() {
    for (star of stars) {
        star.classList.replace("black", "gold");
    }
}
/* * * TIMER * * */
let timer = document.querySelector(".timer");
let seconds = 0;
let minutes = 0;
let interval = null;

function timeCounter() {
    interval = setInterval(function () {
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes < 10) {
            timer.innerHTML = `0${minutes}:${seconds}`;
            if (seconds < 10) {
                timer.innerHTML = `0${minutes}:0${seconds}`;
            }
        } else {
            timer.innerHTML = `${minutes}:${seconds}`;
        }

    }, 1000);
}
function stopTimer() {
    clearInterval(interval);
}
function resetTimer() {
    stopTimer();
    timer.innerHTML = "00:00";
    seconds = 0;
    minutes = 0;
}
/* * * END OF GAME = WIN * * */
//if all cards matched, stopp time, display modal
const allCardsMatched = 8;
let matchedCardPairs = 0;

//modal
const modal = document.querySelector(".modal");
//display time, stars, moves
//ok and cancell buttons for play agian

function displayStats() {
    //show modal
    toggleModal();

    //display time
    stopTimer();
    let modalTime = document.querySelector(".modal-time");
    let finalTime = timer.innerHTML;
    modalTime.innerHTML = `Time: ${finalTime}`;

    // display stars
    let starsDisplay = document.querySelectorAll(".gold");
    let modalStars = document.querySelector(".modal-stars");
    modalStars.innerHTML = `Stars: ${starsDisplay.length}`;

    //display moves
    let modalMoves = document.querySelector(".modal-moves");
    modalMoves.innerHTML = `Moves: ${totalMoves}`;
}

function toggleModal() { modal.classList.toggle("toggle-modal"); }

/*** The BUttons ***/

const replayBtn = document.querySelector(".btn-replay");
const closeBtn = document.querySelector(".btn-close");
const closeCross = document.querySelector(".close");

closeCross.addEventListener("click", function () {
    toggleModal();
})
//close btn
closeBtn.addEventListener("click", function (event) {
    toggleModal();
})
//replay btn
replayBtn.addEventListener("click", function (event) {
    startGame();
})

//restart button/icon
restartIcon = document.querySelector(".fa-repeat");
restartIcon.addEventListener("click", function (event) {
    startGame();
})


