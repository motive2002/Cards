import React, {useEffect, useState} from "react";

const Card = ({

    //INCOMING PROPS

    index,       //for grid position and which card was clicked
    tick,        //for timing
    tick2,
    x, y,        //for coordinate on original sprite sheet
    turnCount,   //which turn are we on?
    winningCard,
    clickStatus  //Function call up to the parent for clicked status.

    }) => {

    const green = "#195c2d"
    const yellow  = "#f5f244"
    const blue = "#739dde"
    const red = "#cc1104"

    
    
    const [delay, setDelay] = useState(false);     //for conditional rendering on a delay
    const [clicked, setClicked] = useState(false)  //Clicked status of card.
    const [highlight, setHighlight] = useState(false)


    useEffect(() => {      //<---delay for loading cards
        setTimeout(() => {
        setDelay(true);
    
        }, tick);    
    },[]);

    useEffect(() => {   //<---delay for displaying border colors
        setTimeout(() => {
           setHighlight(true) 
        }, tick2)
    }, [])
    
    const handleClick = (hardClick = false) => {
        
        console.log("clicked")
        //Check to see if it's the first turn using the turnCount prop.
        //Only on the first turn should the user be able to select which cards to hold
        if (turnCount === 1) {
            setClicked(!clicked)   //flip the clicked status of the card (based on user click)
            clickStatus(index)     //run the func from the parent to get the clicked status from the child
        }

        if (hardClick === true) {
            if (winningCard === true) {
                winningCard = false
                setClicked(false)
                clickStatus(index)
                setHighlight(!highlight)
                //setBorderColor()
            }
            console.log("HARD CLICK")
        }
    }

    const setBorderColor = () => {

        if (highlight === true) {

            if (clicked === true && turnCount === 1) {
                return yellow
            }else if (winningCard === true) {
                if(turnCount === 1) {
                    setClicked(true)
                    clickStatus(index)
                }else{
                return red
                }
            }else {
                return green
            }
        }else {
            return green
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
                border: 8px solid ${!clicked ? blue : yellow};
            }
            `}
        </style>
        </div>
    );
};

export default Card 
