const cardsToPlay = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard(){
    if( lockBoard) return;

    if (this === firstCard) return;

    this.classList.add('flip');
    
    if (!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
        //second click
        hasFlippedCard = false;
        secondCard = this;

    checkForMatch();   
    }

function checkForMatch(){
    
    let isMatch= firstCard.dataset.framework === secondCard.dataset.framework;
   //ternary operator 
 isMatch ? disableCards() : unflipCards();
}

function disableCards(){
//its a match.
firstCard.removeEventListener("click", flipCard);
secondCard.removeEventListener("click", flipCard);

}

function unflipCards(){
    lockBoard = true;
 //not a match
 setTimeout(() =>{
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockBoard = false;
    },1500);
}
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard, secondCard] = [null,null];

}
(function shuffle(){
    cardsToPlay.forEach(card =>{
       let randomPos = Math.floor(Math.random()* 12); 
       card.style.order = randomPos;
    });
})();
cardsToPlay.forEach(card => card.addEventListener('click', flipCard));