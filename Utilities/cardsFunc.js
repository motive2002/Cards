const ROYAL_FLUSH = 250
const STRAIGHT_FLUSH = 50
const FOUR_OF_A_KIND = 25
const FULL_HOUSE = 9
const FLUSH = 6
const STRAIGHT = 4
const THREE_OF_A_KIND = 3
const TWO_PAIR = 2
const JACKS_OR_BETTER = 1

const whichTurn = 0

export const defineDeck = () => {

    //Set up an array of card objects, with values for card value, suit and
    //x/y position on the graphic. (ace of spades is 1, 1, [0,0])

    const cardW = 80  //width of card in pixels
    const cardH = 120 //height of card in pixels
    const row = 13    //number of cards in a row
    const col = 4     //number of columns (suits)

    const deck = []

    //Nested loop to define card suit/value AND x/y coordinates for rendering from a sprite
    //sheet based on the constants above.
    for(let i = 0; i < col; i++) {
        for(let j = 0; j < row; j++) {

            const card = {
                val: j + 1,
                suit: i + 1,
                position: [j * cardW, i * cardH],

                //define a 'clicked' property for each card to be used later
                clicked: false,
                winningCard: false,
                
            }

            deck.push(card)
        }
    }

    return deck

}

//Shuffle algorithm I borrowed from stackoverflow
export const shuffle = (array) => {
    
    let currentIndex = array.length
    let randomIndex = 0

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}



const checkStraightsAndFlushes = (arrIn) => {

    const sortedArr = [...arrIn]  //work with a copy. Don't sort the original

    //string constant for runs. One normal, one for "royal"
    const series1 = "12345678910111213"
    const series2 = "110111213"
    const buildString = ""
    //const fakeString = "110111213" //for testing
    const tempArr = []
    const straightType = 0 //0 = none; 1= straight; 2= royal
    const isFlush = false

    //----check array for all the same suit (flush)
    arrIn.forEach((item) => {
        tempArr.push(item.suit)
    })
    
    const check = (val) => {
        return val === tempArr[0]
    }
   
    isFlush =  tempArr.every(check)
    //----

    //--sort and check for straights
    sortedArr.sort((a, b) => {
        return a.val - b.val
    })

    sortedArr.forEach((item) => {

        //concatenate string for testing later
        buildString = buildString + item.val

    })
   
    if (series1.includes(buildString) === true) {
            straightType = 1
        }else if (series2.includes(buildString) === true) {
            straightType = 2
        }else {
            straightType = 0
    }

    if (straightType === 2 && isFlush === true) {
        flagAll(arrIn)
        return ROYAL_FLUSH
    }else if(straightType === 1 && isFlush === true) {
        flagAll(arrIn)
        return STRAIGHT_FLUSH
    }else if (straightType === 1 && isFlush === false) {
        flagAll(arrIn)
        return STRAIGHT
    }else if (straightType === 0 && isFlush === true) {
        flagAll(arrIn)
        return FLUSH
    }else {
        return 0
    }

}

const checkDupes = (arrIn) => {

    const xCards = []             //for card counting
    const pairCount = []          //if there's 2 pair, store unique values
    const jackOrBetter = false    //flag for jacks or better
    const threeKind = false       //flag for three of a kind
    const fourKind = false        //flag for four of a kind

    //const fakeArray = [0, 0, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0] //for testing

    //make an array of 14 elements. 0 = nothing, 1-13 = card values
    for (let i = 0; i <14; i++) {
        xCards.push(0)
    }

    arrIn.forEach((item) => {

        //match the card value with the xCards index and add one for each
        //card of that value counted
        xCards[item.val] = xCards[item.val] + 1

    })

    
    //console.log(fakeArray)
    xCards.forEach((item, index) => {
    //fakeArray.forEach((item, index) => {

        //if the counted cards are 2 or more. Also check if there's just one pair if it's
        //value is a jack or higher (or an ace), and set flags accordingly.
        if (item === 2 && index >=11 || item === 2 && index === 1) {
            jackOrBetter = true
            flagCards(index, arrIn)
        } 

        //If there's 2 of a card, push it's value onto an array
        if (item === 2) {
             pairCount.push(index)

             //if there's 2 pair, flag the cards for each unique value
             if (pairCount.length > 1) {
                 flagCards(pairCount[0], arrIn)
                 flagCards(pairCount[1], arrIn)
             }
        }
        if (item === 3) {
            threeKind = true
            flagCards(index, arrIn)
        }
        if (item === 4) {
            fourKind = true
            flagCards(index, arrIn)
        } 
    })

    if (pairCount.length === 1 && threeKind === true) {
        flagAll(arrIn)
        return FULL_HOUSE
    }else if (pairCount.length === 2) {
        return TWO_PAIR
    }else if (threeKind === true && pairCount.length === 0) {
        return THREE_OF_A_KIND
    }else if (fourKind === true) {
        return FOUR_OF_A_KIND
    }else if (pairCount.length === 1 && threeKind === false && jackOrBetter === true) {
        return JACKS_OR_BETTER
    }else {
        return 0
    }

}

const flagCards = (index, arrIn) => {

    //flag the cards responsible for the winning hand
    arrIn.forEach((item) => {
        if (item.val === index) {
            item.winningCard = true
        }
    })
}

const flagAll = (arrIn) => {

    //In the case of straights, flushes and full house, ALL cards
    //in the hand are winning ones.
    arrIn.forEach((item) => {
        item.winningCard = true
    })
}

export const evalHand = (arrIn) => {

    const scoreText = ""
    
    const score = Math.max(checkDupes(arrIn), checkStraightsAndFlushes(arrIn))
    
    switch (score) {
        case ROYAL_FLUSH: scoreText = "ROYAL FLUSH!"; break
        case STRAIGHT_FLUSH: scoreText = "STRAIGHT FLUSH!"; break
        case FOUR_OF_A_KIND: scoreText = "4 OF A KIND!!"; break
        case FULL_HOUSE: scoreText = "FULL HOUSE!"; break
        case FLUSH: scoreText = "FLUSH!"; break
        case STRAIGHT: scoreText = "STRAIGHT!"; break
        case THREE_OF_A_KIND: scoreText = "3 OF A KIND!"; break
        case TWO_PAIR: scoreText = "2 PAIR!"; break
        case JACKS_OR_BETTER: scoreText = "JACKS OR BETTER!"; break
    }

    if (score > 0) {
        return scoreText
    }else{
        return ""
    }
    
}

/* PAYOUT TABLE

Royal Flush	    250	500	750	1000 4000
Straight Flush	50	100	150	200	250
Four of a Kind	25	50	75	100	125
Full House	    9	18	27	36	45
Flush	        6	12	18	24	30
Straight	    4	8	12	16	20
Three of a Kind	3	6	9	12	15
Two Pair	    2	4	6	8	10
Jacks or Better	1	2	3	4	5     

*/