import {Fragment, useEffect, useState, useRef} from 'react'
import { defineDeck , shuffle, evaluateHand } from '../Utilities/cardsFunc';
import Card from './Card'
import Button from './Button';
import WinLabel from './WinLabel';
import { stringify, v4 as uuidv4 } from 'uuid'

import { FLUSH_ROYAL, FLUSH_STRAIGHT, FOUR_KIND, HOUSE_FULL, J_OR_BETTER, LOW_PAIR, PAIR_TWO, POT_FLUSH_AND_HIGH_PAIR, POT_SRAIGHT_HIGH_PAIR, 
    POT_STRAIGHT, POT_STRAIGHT_AND_POT_FLUSH, POT_STRAIGHT_FLUSH, POT_STRAIGHT_NO_PAIR, POT_STRAIGHT_WITH_LOW_PAIR, 
    STRAIGHT_NO_FLUSH, 
    THREE_KIND} from '../Utilities/testHands';

const CardsTemp = () => {

  
    const [foo, setFoo] = useState(false)    //force re-render
    const turnCount = useRef(0)              //2 turns to draw    
    const cardsIndex = useRef(0)             //index for which card in array to be rendered
    const curHand = useRef([])               //current hand of cards      
    const fullDeck = useRef(defineDeck())    //the whole deck of 52 cards
    const tick = useRef(0)                   //update card render delay (for 'animation')
    const buttonDisableTime = useRef(0)      //prop to disable the draw button for a period of time.

    const tempResult = useRef()

    useEffect(() => {
        //shuffle the whole deck
        shuffle(fullDeck.current)
    },[])

    const draw = (numOfCards) => {
        //draw cards from the top of the deck
        const arr = []

        for(let i = 0; i < numOfCards; i++) {

            //New cards being drawn can't have already been 'clicked/held'
            //Make sure the clicked status is set to false when adding as a new card.
            fullDeck.current[cardsIndex.current].clicked = false
            fullDeck.current[cardsIndex.current].winningCard = false

            //cardsIndex starts at zero, and then advances as more cards are 'drawn'
            arr.push(fullDeck.current[cardsIndex.current])
            cardsIndex.current = cardsIndex.current + 1

        }
        
        return arr

    }

    const DrawClick = () => {

        tick.current = 0       //reset timing tick for each draw
        turnCount.current++    //advance turnCount
        tempResult.current = ""
    
        if (turnCount.current === 1) {

            //FIRST TURN. Draw 5 fresh cards from a shuffled deck
            curHand.current = draw(5)
            //curHand.current = STRAIGHT_NO_FLUSH

            //Set button disable time to one quarter second for each card (total 1250 ms)
            buttonDisableTime.current = 1250

            setFoo(!foo)  //dummy for forced re-render

            evaluateHand(curHand.current, turnCount.current)
           
            
        }else if (turnCount.current === 2) {

            //SECOND TURN. Splice the curHand array with some fresh cards
            //drawn from the deck.

            //Temp array for rebuilding the hand
            let tempArr = curHand.current

            //If no cards are "held", disable time will still be set at 1250.
            //NO change to disable time for button prop will keep it from firing
            //the useEffect in the button component, so change it to a different, but close value.
            if (buttonDisableTime.current === 1250) {
                buttonDisableTime.current = 1251
            }
         
            //Loop through current hand and see if any of the cards are 'clicked'
            //We're holding those.
            curHand.current.forEach((item, index) => {

                //strip the winning flag. Evaluate the rebuilt
                //hand on it's own. Resolves a bug if a user 'unclicks' part
                //of a winning hand on the first deal.
                item.winningCard = false

                if (item.clicked === false) {
       
                  //splice the un-clicked cards with new cards using the draw function.
                  //draw returns an array, but it will only have one item in this case, so get item 0
                  tempArr.splice(index, 1, draw(1)[0])  

                    
                }
            })

            curHand.current = tempArr   //Replace our current hand with the rebuilt one.
            let myScore = evaluateHand(curHand.current, turnCount.current)

            if (myScore !== 0) tempResult.current = `WINNER  ${myScore.text}  ${myScore.score[0]} POINTS`
            setFoo(!foo)                //force re-render
            turnCount.current = 0       //reset turnCount
            cardsIndex.current = 0      //Move cardsIndex back to zero
            shuffle(fullDeck.current)   //Shuffle deck for new hand

        }
            
    }

    const hasClicked = (num) => {

        let n = 0
        //hasClicked is a function that is run when a user clicks a card. It comes
        //from the Card component

        //Make sure the num argument is treated as an integer (not a string)
        const myIndex = parseInt(num)

        //Flip the 'clicked' property for that card in the array
        curHand.current[myIndex].clicked = !curHand.current[myIndex].clicked

        //For each card clicked, add a quarter second for button disable time.
        //This will change the default of 1250 ms (for full 5 card re-draw), and disable
        //the button for an appropriate amount of time based on how many cards need to be re-drawn.
        curHand.current.forEach((item) => {
            if (item.clicked === false) {
                n +=250
            }
        })

        //console.log(n)
        buttonDisableTime.current = n

    }

    
    return (

    <Fragment >

        <style jsx>{`

            .grid-container {
                display: grid;
                grid-gap: 16px 16px;
                grid-template-columns: 96px 96px 96px 96px 96px;
                background-color: #2196F3;
                padding: 16px;
            }

            .grid-buttons {
                display: grid;
                grid-gap: 16px 16px;
                grid-template-columns: 24px 24px 232px 100px 100px;
                background-color: #2196F3;
                padding: 16px;
            }

            .outer {
                display: flex;
                justify-content: center;
            }

            `}

        </style>

        <div className='outer'>
        
            <div className='grid-container'>

                {/* Map through the current hand */}
                {curHand.current.map((item, index) => {
                        
                        let n = 0   //for tick length render stuff

                        //If the card is clicked, render with zero delay
                        if(item.clicked === true) {
                            n = 0
                        } else {

                            //Render with a delay of a quarter second, advancing an additional
                            //quarter second for each card NOT clicked
                            tick.current = tick.current + 250
                            n = tick.current
                        }
                        
                        return (
                    
                    <Card key={uuidv4()}          //I need to replace this, but for now just make sure the keys are totally unique.
                        index={index}             //Index for click callback and which spot on grid for card to render.
                        x={item.position[0]}      //position in x on main image to start render
                        y={item.position[1]}      //position in y on main image to start render
                        tick={n}                  //amount of time to wait before card renders
                        tick2={buttonDisableTime.current}

                        //Let the Card component know which turn we're on for setting clicked status and border styling.
                        turnCount={turnCount.current}

                        winningCard={item.winningCard}

                        //bounce our hasClicked function down to the card component to handle a click later.
                        clickStatus={hasClicked}   

                    />)
                }) 
                }
                
            </div>

        </div>

        <div className='outer'>
        <div className='grid-buttons'>
        <Button text={String.fromCharCode(8592)} width={40} tick={buttonDisableTime.current} onClick={() => alert('clicked')}/>
        <Button text={String.fromCharCode(8594)} width={40} tick={buttonDisableTime.current} onClick={() => alert('clicked')}/>
        <Button text="CREDITS" width={200} textSize={12} tick={buttonDisableTime.current} onClick={() => alert('clicked')}/>
        <Button text="STAND" width={100} textSize={20} tick={buttonDisableTime.current} onClick={() => alert('clicked')}/>
        <Button text="DRAW" width={100} textSize={20} tick={buttonDisableTime.current} onClick={() => DrawClick()}/>
        
        </div>
        
        </div>
        <WinLabel tick={buttonDisableTime.current} text={tempResult.current}/>
        
        
    </Fragment>

    );
};

export default CardsTemp;