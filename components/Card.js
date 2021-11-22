import {useEffect, useState, useRef } from "react";

const Card = (props) => {

    const green = "#195c2d"
    const yellow  = "#f5f244"
    const blue = "#739dde"

    const [delay, setDelay] = useState(false);
    const [clicked, setClicked] = useState(false)
    
    useEffect(() => {
        setTimeout(() => {
        setDelay(true);
        //setClicked(!props.isClicked)
        }, props.tick);    
    },[]);
    
    const handleClick = () => {
        setClicked(!clicked)       //set the state of the card as clicked
        props.clickStatus(props.index) //run the func from the parent to get the clicked status from the child
    }
    
    return !delay ? null : (
        <div onClick={() => handleClick()}>
        <style jsx>
            {`
            div {
                background-image: url(/goofdeck.png);
                background-position: -${props.x}px -${props.y}px;
                width: 96px;
                height: 136px;
                overflow: hidden;
                border: 8px solid ${!clicked ? green : yellow};

                border-radius: 16px;
                caret-color: transparent;
            }

            div: hover {
                border: 8px solid ${!clicked ? blue : yellow};
            }
            `}
        </style>
        </div>
    );
};

export default Card;
