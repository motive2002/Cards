
const ROYAL_FLUSH = {text: "ROYAL FLUSH!", score: [250,500,750,1000,4000]}
const STRAIGHT_FLUSH = {text: "STRAIGHT FLUSH!", score: [50,100,150,200,250]}
const FOUR_OF_A_KIND = {text: "FOUR OF A KIND!", score: [25,50,75,100,125]}
const FULL_HOUSE = {text: "FULL HOUSE!", score: [9,18,27,36,45]}
const FLUSH = {text: "FLUSH!", score: [6,12,18,24,30]}
const STRAIGHT = {text: "STRAIGHT", score: [4,8,12,16,20]}
const THREE_OF_A_KIND = {text: "THREE OF A KIND!", score: [3,6,9,12,15]}
const TWO_PAIR = {text: "TWO PAIR!", score: [2,4,6,8,10]}
const JACKS_OR_BETTER = {text: "JACKS OR BETTER!", score: [1,2,3,4,5]}


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

export const evaluateHand = (arrIn, turnCount) => {

    const straightType = 0  //0 = none; 1= straight; 2= royal

    const mySuit = null     //temp to hold a suit value
    const tempArr = []      //temp to hold sorted cards
    const pairCount = []    //for counting pairs
    const highCount = 0     //for counting high cards

    //flags for hand status
    const isFlush = false 
    const jackOrBetter = false    
    const threeKind = false       
    const fourKind = false        
    const fullHouse = false
    const twoPair = false
    const lowPair = false
    const potentialFlush = false

    //flag for valuing ace at either 1 or 14
    const fourteen = false

    //Arrays for counting instances of suits and card values
    const flushMap = [0, 0, 0, 0] 
    const cardVals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    arrIn.forEach((item) => {

        flushMap[item.suit -1]++
        cardVals[item.val]++
        if(item.val > 9) highCount++
        tempArr.push(item.val)
    })

    //if there are 4 high cards and an ace, make the ace 14
    if (highCount > 3 && cardVals[1] === 1) fourteen = true

    //HANDLE FLUSHES------------------
    isFlush = flushMap.includes(5)

    if (isFlush === true) flagAll(arrIn)

    if (turnCount === 1) {

        //if there's a 4 in the suit map we have a potential flush
        if (flushMap.includes(4) === true) {

            potentialFlush = true

            //find the suit index that has 4 in it's entry. +1 because suits are 1 based.
            mySuit = flushMap.findIndex((el) => el === 4) + 1
            
            //set winning card to true for indexes containing that suit to hold those cards.
            arrIn.forEach((item) => {
                if (item.suit === mySuit) {
                    item.winningCard = true
                }
            })
            
        }
    }

    //HANDLE DUPES----------------------
    cardVals.forEach((item, index) => {

        if (item === 3) {
            threeKind = true
            flagDupes(index, arrIn)
        }
        if (item === 4) {
            fourKind = true
            flagDupes(index, arrIn)
        } 
        if (item === 2) {
            pairCount.push(index)

            if (pairCount.length > 1 && fourKind === false && threeKind === false) {
                flagDupes(pairCount[0], arrIn)
                flagDupes(pairCount[1], arrIn)
                twoPair = true
            }
        }

        if (pairCount.length === 1 && threeKind === true) {
            fullHouse = true
            flagAll(arrIn)
        }

        if (item === 2 && index >=11 || item === 2 && index === 1) {
            if(potentialFlush === false){
                if(threeKind === false && fourKind === false && fullHouse === false && twoPair === false){
                    jackOrBetter = true
                    flagDupes(index, arrIn)
                }
            }
        }

        if (turnCount === 1) {
            if (item === 2 && index <11 && index > 1) {
                if (potentialFlush === false) {
                    if(threeKind === false && fourKind === false && fullHouse === false && twoPair === false){
                        lowPair = true
                        flagDupes(index, arrIn) 
                    }
                }
            }
        }

    })

        //HANDLE STRAIGHTS--------------------------
        if(fourteen === true) {
            let myAce = tempArr.findIndex((el) => el === 1)
    
            if(myAce !== -1) {
               tempArr.splice(myAce, 1, 14)
            }
        }
    
        tempArr.sort((a, b) => a - b)
        const arrLeft = tempArr.slice(0, -1)
        const arrRight = tempArr.slice(1)
    
        if (isConsecutive(tempArr)) {
            if (fourteen === true) {
                straightType = 2
                flagAll(arrIn)
                console.log("ROYAL")
            }else{
                straightType = 1
                flagAll(arrIn)
        }
    
        }else if (isConsecutive(arrLeft) && turnCount === 1 && potentialFlush === false) {
            if(lowPair === false && jackOrBetter === false) {
                flagStraight(arrLeft, arrIn)
            }
    
        }else if (isConsecutive(arrRight) && turnCount === 1 && potentialFlush === false) {
            if(lowPair === false && jackOrBetter === false) {
                myAce = arrRight.findIndex((el) => el === 14)
                if(myAce !== -1) arrRight.splice(myAce, 1, 1)
                flagStraight(arrRight, arrIn)
            }
        }
    
        if (fullHouse === true) {
            return FULL_HOUSE
        }else if (twoPair === true) {
            return TWO_PAIR
        }else if (threeKind === true && pairCount.length === 0) {
            return THREE_OF_A_KIND
        }else if (fourKind === true) {
            return FOUR_OF_A_KIND
        }else if (pairCount.length === 1 && threeKind === false && jackOrBetter === true) {
            return JACKS_OR_BETTER

        }else if (straightType === 2 && isFlush === true) {
            return ROYAL_FLUSH
        }else if(straightType === 1 && isFlush === true) {
            return STRAIGHT_FLUSH
        }else if (straightType === 1 && isFlush === false || straightType === 2 && isFlush === false) {
            return STRAIGHT
        }else if (straightType === 0 && isFlush === true) {
            return FLUSH
        }else {
            return 0
        }
 
}

const isConsecutive = (arr) => {

    for(let i = arr[0], j = 0; j < arr.length; i++, j++){
       if(arr[j] === i){
          continue;
       };
       return false;
    };
    return true;
 };

 const flagStraight = (arrTemp, arrIn) => {

    for (let i = 0; i < arrIn.length; i++) {
        if (arrTemp.includes(arrIn[i].val)) {
            arrIn[i].winningCard = true
        }
    }
 }

const flagDupes = (index, arrIn) => {

    //flag the cards responsible for the winning hand
    arrIn.forEach((item) => {
        if (item.val === index) {
            item.winningCard = true
        }
    })
}

const flagAll = (arrIn) => {

    //In the case of complete straights, flushes and full house, ALL cards
    //in the hand are winning ones.
    arrIn.forEach((item) => {
        item.winningCard = true
    })
}
