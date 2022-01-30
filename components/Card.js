import React, {useEffect, useState} from "react";
import useDelay from '../Utilities/useDelay' //custom hook for delay time

const Card = ({

    //INCOMING PROPS

    index,         //for grid position and which card was clicked
    tickCard,      //for cards appearing
    tickHighlight, //for border highlight appearing after cards are all 'drawn'
    x, y,          //for coordinate on original sprite sheet
    turnCount,     //which turn are we on?
    winningCard,
    clickStatus    //Function call up to the parent for clicked status.

    }) => {

    const GREEN = "#195c2d"
    const YELLOW  = "#f5f244"
    const BLUE = "#739dde"
    const PINK = "#e99cba"

    const [clicked, setClicked] = useState(false)  //Clicked status of card.
    const delay = useDelay(tickCard)
    const highlight = useDelay(tickHighlight)

    useEffect(() => {  //<--- set "winning" cards as clicked if a winner appears on first draw
        
        if (turnCount === 1 && winningCard === true) {
            handleClick()
        }

    }, [])
    
    const handleClick = (hardClick = false) => {
        
        //Check to see if it's the first turn using the turnCount prop.
        //Only on the first turn should the user be able to select which cards to hold
        if (turnCount === 1) {
            setClicked(!clicked)   //flip the clicked status of the card (based on user click)
            clickStatus(index)     //run the func from the parent to get the clicked status from the child
        }

    }

    const setBorderColor = () => {

        if (highlight === true) {

            if (clicked === true && turnCount === 1) {
                return YELLOW
            }
            else if ( turnCount === 0 && winningCard === true) {
                return PINK
            }else{
                 return GREEN
            }
        }else{
            return GREEN
        }
    }
    
    //Conditionally render based on the delay, so the cards are 'drawn' over a period of time.
    //If the cards are 'clicked' or if it's the first turn, style the borders appropriately.
    //Put the card in the proper column based on the index.
    
    return !delay ? null : (
        <div onClick={() => handleClick(true)}>
        <style jsx>
            {`
            div {
                background-image: url(/goofdeck.png);
                background-position: -${x}px -${y}px;
                width: 96px;
                height: 136px;
                overflow: hidden;
                border: 8px solid ${setBorderColor()};
                grid-column: ${index + 1};

                border-radius: 16px;
                caret-color: transparent;
                ${turnCount === 1 ? null : 'pointer-events: none;'}
            }

            div: hover {
                border: 8px solid ${!clicked ? BLUE : YELLOW};
            }
            `}
        </style>
        </div>
    );
};

export default Card 
