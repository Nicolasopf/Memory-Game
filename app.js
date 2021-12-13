document.addEventListener('DOMContentLoaded', () => {
    // card array to put images
    const cardArray = []
    let cardsChosen = [], cardsChosenId = [], cardsWon = []
    let resultText = document.querySelector('#result') // change the user score
    let in_progress = false;

    // fill the array
    for (let i = 1; i < 7; i++) {
        let card = {
            name: 'dog' + i,
            img: 'images/dog' + i + '.jpg'
        }

        cardArray.push(card)
        cardArray.push(card)
    }

    // shuffle the array
    cardArray.sort(() => 0.5 - Math.random())

    // Create board
    const grid = document.querySelector('.grid')

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    // flip card
    function flipCard() {
        let cardId = this.getAttribute('data-id')

        // not allowing logical bugs!:
        if (cardId === cardsChosenId[0] || cardsWon.includes(cardId) || in_progress) {
            return
        }

        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img) // show image (flip)

        if (cardsChosenId.length === 2) {
            in_progress = true;
            setTimeout(checkForMatch, 500)
        }
    }

    // check for match
    function checkForMatch() {
        let cards = document.querySelectorAll('img')
        let cardOneId = cardsChosenId[0]
        let cardTwoId = cardsChosenId[1]

        if (cardsChosen[0] === cardsChosen[1]) { // if match, hide the cards.
            alert('Found a match!')
            cards[cardOneId].style.visibility = 'hidden'
            cards[cardTwoId].style.visibility = 'hidden'
            cardsWon.push(cardOneId, cardTwoId)
        }
        else { // if not equals, flip back cards
            console.log(cardOneId, cardTwoId)
            cards[cardOneId].setAttribute('src', 'images/blank.png')
            cards[cardTwoId].setAttribute('src', 'images/blank.png')
        }

        cardsChosen = []
        cardsChosenId = []

        resultText.textContent = cardsWon.length / 2

        if (cardsWon.length / 2 === cardArray.length / 2) {
            alert('Happy birthday! you are a winner!')
        }
        in_progress = false; // allow user to flip again
    }

    // start game
    createBoard()
})