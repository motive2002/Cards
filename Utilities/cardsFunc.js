//MAIN CARDS FUNCTIONS INCLUDING DEFINING DECK, SHUFFLING AND EVALUATING HANDS


//Constants for hand results
const ROYAL_FLUSH = {text: "ROYAL FLUSH!", score: 250}
const STRAIGHT_FLUSH = {text: "STRAIGHT FLUSH!", score: 50}
const FOUR_OF_A_KIND = {text: "FOUR OF A KIND!", score: 25}
const FULL_HOUSE = {text: "FULL HOUSE!", score: 9}
const FLUSH = {text: "FLUSH!", score: 6}
const STRAIGHT = {text: "STRAIGHT", score: 4}
const THREE_OF_A_KIND = {text: "THREE OF A KIND!", score: 3}
const TWO_PAIR = {text: "TWO PAIR!", score: 2}
const JACKS_OR_BETTER = {text: "JACKS OR BETTER!", score: 1}

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
                val: j + 1,  //value and suit are 1 based
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

//Shuffle algorithm I borrowed from stackoverflow :P
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

    //arrIn is the hand of cards being evaluated. It is mostly read only, but
    //the cards that are flagged for higlighting (win or hold) are actually
    //mutated values :/
    //turnCount is used for 'holding' cards rather than 'winning' cards, even though they have
    //the same property. We 'hold' certain cards on the first turn if they are potential
    //wins, or actual wins.

    const straightType = 0  //0 = none; 1= straight; 2= royal
    const mySuit = null     //temp to hold a suit value
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

    //Arrays for counting instances of suits and card values. Like a coin counter machine,
    //the following loop adds 1 to each index counted. 4 suits, 15 card values.
    //(0 is nothing, followed by 1 as ace, 2 thru 13 as duece-king then 14 as ace high)
    const flushMap = [0, 0, 0, 0] 
    const dupeMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    //separate array for sorting straights.
    const straightMap = []    

    arrIn.forEach((item) => {

        flushMap[item.suit - 1]++
        dupeMap[item.val]++
        if(item.val > 9) highCount++ //add to our high card count
        straightMap.push(item.val)  //push all card values into the straightMap for sorting out later
    })

    //HANDLE FLUSHES-------------------------------------

    //if there's a 5 anywhere in the flushMap array, all 5 cards are the same suit.
    isFlush = flushMap.includes(5)

    if (isFlush === true) flagAll(arrIn)  //call function to flag all cards as winning

    if (turnCount === 1) {

        //if there's a 4 in the suit map we have a potential flush
        if (flushMap.includes(4) === true) {

            potentialFlush = true

            //find the suit index that has 4 in it's entry. +1 because suits are 1 based.
            mySuit = flushMap.findIndex((el) => el === 4) + 1
            
            //set winning card to true for indexes containing that suit to hold those cards.
            //We always, always hold 4 cards to a flush!
            arrIn.forEach((item) => {
                if (item.suit === mySuit) {
                    item.winningCard = true
                }
            })
            
        }
    }

    //HANDLE DUPES---------------------------------
    dupeMap.forEach((item, index) => {

        //if 3 or 4 show up in the dupeMap array we have a 3 or 4 of a kind
        if (item === 3) {
            threeKind = true
            flagDupes(index, arrIn)  //call a function to flag "winning" cards
        }
        if (item === 4) {
            fourKind = true
            flagDupes(index, arrIn)
        } 

        //if a 2 shows up, push the value onto a seperate array. If the array length
        //is more than 1, we have "2 PAIR". Flag the card values responsible.
        if (item === 2) {
            pairCount.push(index)

            if (pairCount.length > 1 && fourKind === false && threeKind === false) {
                flagDupes(pairCount[0], arrIn)
                flagDupes(pairCount[1], arrIn)
                twoPair = true
            }
        }

        //one pair + one three of a kind is (duh) a full house!
        if (pairCount.length === 1 && threeKind === true) {
            fullHouse = true
            flagAll(arrIn)
        }

        //the following require more checks to suss out. The reason is because a high
        //pair (JACKS OR BETTER) and a low pair can exist simultaneously with a lot of 
        //other winning hands. We want to flag a high pair if none of the better hands
        //are present, and a low pair if we really have nothing else.
        if (item === 2 && index >=11 || item === 2 && index === 1) {
            if(potentialFlush === false){
                if(threeKind === false && fourKind === false && fullHouse === false && twoPair === false){

                    jackOrBetter = true  //HIGH PAIR - JACKS OR BETTER

                    flagDupes(index, arrIn)
                }
            }
        }

        if (turnCount === 1) {
            if (item === 2 && index <11 && index > 1) {
                if (potentialFlush === false) {
                    if(threeKind === false && fourKind === false && fullHouse === false && twoPair === false){

                        lowPair = true   //JUST A MEASLY LOW PAIR IS ALL WE HAVE

                        flagDupes(index, arrIn) 
                    }
                }
            }
        }

    })

    //HANDLE STRAIGHTS---------------------------------------

    //Right off the bat it's important to know if the ace should be valued at 1 or 14
    //for evaluating straights.

    if(jackOrBetter === false) {  //if jacksOrBetter is false, we don't have TWO aces on deck.

        //if we have 3 or more high cards, and an ace among them, flag the ace for 14.
        if (highCount > 2 && dupeMap[1] === 1) {
            fourteen = true
        }
    }

    if(fourteen === true) {

        //find and replace the ACE with a value of 14
        let myAce = straightMap.findIndex((el) => el === 1)
        if(myAce !== -1) {
            straightMap.splice(myAce, 1, 14)
        }
    }
    
    //With that done, sort the card values. Since we're checking for
    //a potential (4/5) straight, make a stack of 4 cards from both
    //ends of 5 to see if there's a run on either end.
    straightMap.sort((a, b) => a - b)
    const arrLeft = straightMap.slice(0, -1)
    const arrRight = straightMap.slice(1)

    //call a function to see if the cards are a consecutive run. This is checking
    //straightMap, so that would be ALL 5 cards. If there's a 14 ace in the run, it's
    //part of a "royal"
    if (isConsecutive(straightMap)) { 
        if (fourteen === true) {
            straightType = 2
            flagAll(arrIn)
        }else{
            //ace is not 14, so run is NOT "royal"
            straightType = 1
            flagAll(arrIn)
    }

    //On the first turn, flag a potnetial 4/5 straight if we have NOTHING else.
    //As it happens, the only other thing we could have with a 4 card run, is a possible
    //flush or high pair. We ALWAYS hold 4/5 of a flush!
    }else if (isConsecutive(arrLeft) && turnCount === 1 && potentialFlush === false) {
        if(lowPair === false && jackOrBetter === false) {

            flagStraight(arrLeft, arrIn)
            
        }

    }else if (isConsecutive(arrRight) && turnCount === 1 && potentialFlush === false) {
        if(lowPair === false && jackOrBetter === false) {

            //the run is on the right side, which could end in a high (14) ACE.
            //Switch the ace (if there is one) from a 14 back to a 1
            //so it will be flagged properly.
                myAce = arrRight.findIndex((el) => el === 14)
                if(myAce !== -1) {
                    arrRight.splice(myAce, 1, 1)
                }
            
            flagStraight(arrRight, arrIn)

        }
    }

    //final evaluation and return score
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

    //See if the values in the arr are a consecutive run.
    for(let i = arr[0], j = 0; j < arr.length; i++, j++){
       if(arr[j] === i){
          continue;
       };
       return false;
    };
    return true;
 };

 const flagStraight = (arrTemp, arrIn) => {

    //Flag all values that match by mutating the winningCard property
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

//Format the number to look like money!!
export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


