

const cards = [];
const cardElements = [];
const numberOfImages = 10;
const imageIdsFound = [];
const openImages = [];
const wrapper = document.querySelector('#game-wrapper');
let allowOpenCard = true;
let imageIdToMatch;
let moves = 0;
let counter = 0;

// message variables
const messageField = document.querySelector('#message-field');
const message = document.querySelector('#message');
const messageBtn = document.querySelector('#message-btn');

if(messageBtn) {
  messageBtn.addEventListener('click', startNewGame);
}



document.addEventListener('click', function(e){
  
  if(allowOpenCard && e.target && e.target.dataText){
    
    
    let imageId = e.target.dataText;
    let img = e.target.querySelector('img');
    let found = false;
    imageIdsFound.forEach((item) => {
      if(item == imageId) {
        found = true;
      }
    });
    if(!found) {
      if(counter < 2) {
        img.style.visibility = 'visible';
        openImages.push(img);
        if(counter < 1) {
          // Vänder första kortet av 2
          counter++;
          imageIdToMatch = imageId; 
        }
        else {
          // Vänder andra kortet av 2
          counter = 0;
          moves++;
          if(imageIdToMatch === imageId) {
            // Match!
            imageIdsFound.push(imageId);
            openImages.length = 0;
            if(imageIdsFound.length === numberOfImages) {
              setTimeout(() => {
                displayMessage();
              }, 1000);
              
            }
          }
          else {
            // Not a match
            allowOpenCard = false;
            setTimeout(() => {
              openImages.forEach((item) => {
                item.style.visibility = 'hidden';
              });
              openImages.length = 0;
              allowOpenCard = true; 
            }, 1000);   
          }  
        }
      }
    }
    
  }
});


function setupGame() {
  createCards();
  shuffleCards();
  //printCards();
  createCardElements();
  renderCards();
}


function createCards() {
  //let counter = 0;
  for(let i=1; i<=numberOfImages; i++) {
    cards.push(new Card(i));
    cards.push(new Card(i));
  }
}

function shuffleCards() {
  cards.sort(randomize);
}

function createCardElements() {
  cards.forEach((item) => {
    createCardElement(item);
  })
}

function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.appendChild(createImage(card));
  cardElement.className = 'card';
  cardElement.dataText = `${card.imageId}`;
  cardElements.push(cardElement);
}

function createImage(card) {
  const img = document.createElement('img'); 
  img.src = `images/${card.imageId}.png`;
   
  return img;
}

function renderCards() {
  cardElements.forEach((item) => {
    wrapper.appendChild(item);  
  })
}

// returnerar ett tal lägre eller högre än 0 slumpvis (mellan -0.5 och 0.5, men inte 0.5)
function randomize(a, b) {
  return Math.random() - 0.5;
}

function printCards() {
  cards.forEach((item) => {
    console.log(item);
  })
}


function displayMessage() {
  if(moves > 30) {
    message.innerHTML = 'Bra jobbat!<br>Men kan bli bättre';
  }
  else if(moves > 20) {
    message.innerHTML = 'Mycket bra!'; 
  }
  else if(moves > 9) {
    message.innerHTML = 'Fantastiskt!'; 
  }
  else {
    message.innerHTML = 'Vänd 2 kort åt gången<br>och försök hitta par<br>med så få försök som möjligt';  
  }
  messageField.style.display = 'block';
}

function startNewGame() {
  wrapper.innerHTML = '';
  cards.length = 0;
  cardElements.length = 0;
  openImages.length = 0;
  imageIdsFound.length = 0;
  openImages.length = 0;
  allowOpenCard = true;
  moves = 0;
  counter = 0;
  setupGame();
  messageField.style.display = 'none';
}



