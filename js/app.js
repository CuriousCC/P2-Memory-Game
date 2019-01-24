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

CardsDeck.addEventListener("click", function(event){
    const ClickedCard = event.target; //click on a card
    // timeCounter();
    if (ClickedCard.classList.contains("card") && 
    !ClickedCard.classList.contains("show")){
        cardCheck(ClickedCard);
        openCard(ClickedCard);
        addOpenCard(ClickedCard);
    }

    if (openedCards.length === 2){
        movesCounter();
        matchCheck();
        }
});

function cardCheck(ClickedCard){ 
    if (
        !ClickedCard.classList.contains("match") &&
        !openedCards.includes(ClickedCard)){
            openCard(ClickedCard);
        }
}

function openCard(ClickedCard){
    ClickedCard.classList.add("show", "open");
}

function addOpenCard(ClickedCard){
    if(openedCards.length <2){
        openedCards.push(ClickedCard);
    }
}

/* * * Matching* * * */

function matchCheck (){
    if (openedCards[0].firstElementChild.className === 
        openedCards[1].firstElementChild.className){
        isMatch();
    } else {
        noMatch();
    }
}

function isMatch (){
    openedCards[0].classList.add("match"); /* add match? */
    openedCards[1].classList.add("match");
    openedCards = [];
    //need to add matched cards to a new array to create game win!
}

function noMatch(){
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open");/* remove show and open? */;
        openedCards[1].classList.remove("show", "open");
        openedCards = [];
    }, 500);
    
}
/* * * * SHUFFLE * * * */
function CreateNewDeck(){
    let cards = Array.from(document.querySelectorAll(".card"));
    const shuffleCards = shuffle(cards);
    for (card of cards){
        CardsDeck.appendChild(card);
    }
}//add to game init!


/* * * * MOVES COUNT * * */

let totalMoves = 0;
let movesDisplay = document.querySelector(".moves");

function movesCounter(){
    totalMoves++;
    movesDisplay.innerHTML = totalMoves;
    starRating();
    if (totalMoves==1){
        timeCounter();
    }
}


/* * * * STAR RATING * * */
let stars = Array.from(document.querySelectorAll(".fa-star"));

function starRating(){
    if (totalMoves ==10){
        stars[2].classList.add("black");
    }else if (totalMoves == 20){
        stars[1].classList.add("black");
    } else if (totalMoves ==30){
        stars[0].classList.add("black");
    }
}   

/* * * TIMER * * */
let timer = document.querySelector(".timer");
let seconds = 0;
let minutes = 0;
let interval=null;

function timeCounter(){
    interval=setInterval(function(){
        seconds++;
        if (seconds==60){
            minutes++;
            seconds = 0;
        }
        if (minutes <10){
            timer.innerHTML = `0${minutes}:${seconds}`;
            if (seconds <10){
            timer.innerHTML = `0${minutes}:0${seconds}`;
            }
        } else {
            timer.innerHTML = `${minutes}:${seconds}`;
        }

    }, 1000);
}



function stopTimer(){
    clearInterval(interval);
}

function resetTimer(){
    timer.innerHTML = "00:00";
    seconds = 0;
    minutes = 0;
}
/* * * END OF GAME = WIN * * */
//if all cards matched, stopp time, display modal

//modal
    //display time, stars, moves
    //ok and cancell buttons for play agian

//restart button

//init
    //shuffle deck
    //reset moves, time, stars
    //start time on first click
    //add the click event for cards matching, moves count, stars rating