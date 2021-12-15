import {useState, useEffect} from 'react';

const DrawButton = (props) => {

    const [disabled, setDisabled] = useState(false)
  
    useEffect(() => {

        //when props.tick changes, disable the button
        //for a period of time to prevent the user
        //from re-clicking before the cards are finished being dealt.
        setDisabled(true)

        setTimeout(() => {
            setDisabled(false)
        }, props.tick)

    },[props.tick])

    return (
        <div>
        <style jsx>{`
            button {
                display: block;
                margin-left: auto;
                margin-right: auto;
                margin-top: 16px;
                width: 120px;
                height: 60px;
                font-size: 24px;
                font-weight: bolder;
                background-color: rgb(92, 207, 211);
                border-radius: 16px;
                justify-content: center;
                caret-color: transparent;
            }
            button: hover {
                    background-color: rgb(127, 229, 233);
                }
        `}</style>

           <button disabled={disabled} 
           onClick={() => props.onClick()}
           >Draw {props.tick}</button>

        </div>
    );
};

export default DrawButton;