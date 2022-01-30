import React, {Fragment, useEffect, useState, useRef} from 'react'
import { defineDeck , shuffle, evaluateHand } from '../Utilities/cardsFunc';
import Card from './Card'
import WinLabel from './WinLabel';
import InfoLabel from './InfoLabel';
import HighScore from './HighScore';
import { stringify, v4 as uuidv4 } from 'uuid'
import Buttons from './Buttons';
import { ScoreProvider } from './ScoreContext';

const Cards = () => {

    //The big Cards component. This renders an array of the Card component, and deals
    //with the DrawClick.. dealing cards from the deck and calling functions to evaluate
    //the hand. A lot of useRef() variables for values I wanted to persist between renders
    //WITHOUT causing a rerender. Only one useState variable is used, and that's for forced
    //rerender of the main component.... which by default renders all the individual Card 
    //components (children) with a delay set up for each card.

    const [foo, setFoo] = useState(false)    //forced re-render on draw click
    const turnCount = useRef(0)              //2 turns to draw    
    const cardsIndex = useRef(0)             //index for which card in array to be rendered
    const curHand = useRef([])               //current hand of cards      
    const fullDeck = useRef(defineDeck())    //the whole deck of 52 cards
    const tick = useRef(0)                   //update card render delay (for 'animation')
    const buttonDisableTime = useRef(0)      //prop to disable the draw button for a period of time.
    const handResult = useRef({})            //for winLabel component. Result of the hand. Will update Context.

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
        handResult.current = ""
    
        if (turnCount.current === 1) {

            //FIRST TURN. Draw 5 fresh cards from a shuffled deck
            curHand.current = draw(5)
            //REPLACE curHand.current here with a hand imported from testHands.js for testing

            //Set button disable time to one quarter second for each card (total 1250 ms)
            buttonDisableTime.current = 1250

            setFoo(!foo)  //dummy for forced re-render.

            //Evaluate hand and see if we should recommend some 'hold' cards
            evaluateHand(curHand.current, turnCount.current)
           
            
        }else if (turnCount.current === 2) {

            //SECOND TURN. Splice the curHand array with some fresh cards
            //drawn from the deck.

            //Temp array for rebuilding the hand
            let tempArr = curHand.current

            //If no cards are "held", disable time will still be set at 1250ms.
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
            handResult.current =  evaluateHand(curHand.current, turnCount.current)

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
        //the buttons for an appropriate amount of time based on how many cards need to be re-drawn.
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
                grid-auto-rows: 168px;
                background-color: #2196F3;
                width: 576px;
                padding: 16px;
                
            }

            .cards-outer {
                display: flex;
                justify-content: center;
                height: 168px;
            }

            .winLabel {
                display: flex;
                width: 576px;
                margin: auto;
                background-color: burlywood;
            }

            `}

        </style>

        <div className='cards-outer'>
        
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
                    
                    <Card key={uuidv4()}          //Make sure the keys are totally unique.
                        index={index}             //Index for click callback and which spot on grid for card to render.
                        x={item.position[0]}      //position in x on main image to start render
                        y={item.position[1]}      //position in y on main image to start render
                        tickCard={n}              //amount of time to wait before card renders

                        //amount of time to wait until card is highlighted
                        tickHighlight={buttonDisableTime.current}

                        //Let the Card component know which turn we're on for setting clicked status and border styling.
                        turnCount={turnCount.current}
                        
                        //is it a 'winning' or 'hold' card?
                        winningCard={item.winningCard}

                        //bounce our hasClicked function down to the card component to handle a click later.
                        clickStatus={hasClicked}   

                    />)
                }) 
                }
                
            </div>

        </div>

        {/* Just says multiplier and bet. does nothing else */}
        <InfoLabel />

        {/* Context wrapper for updating score and bet multiplier */}
        <ScoreProvider>
        {/* Buttons with disable time and click handler. The point is to diasble the buttons
        while the cards are being drawn, and to prevent changing the bet in the middle of the hand */}
        <Buttons tick={buttonDisableTime.current} turnCount={turnCount.current} sendDrawClick={DrawClick}/>

        {/* Win label with delay time. Wait to display a win after the cards are all drawn (no spoiling it! haha) 
        Will also update the score in Context*/}
        <WinLabel tick={buttonDisableTime.current} winDisplay={handResult.current}/>

        {/* High score label, updated from Context */}
        <HighScore />

        </ScoreProvider>
        
    </Fragment>

    );
};

export default Cards;