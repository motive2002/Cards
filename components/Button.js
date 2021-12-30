
//custom hook to set how long the button is disabled.
import useDisable from '../Utilities/useDisable';  

const Button = ({

    //incoming props
    tick,
    text,
    width,
    textSize,
    onClick
    
}) => {

    const disabled = useDisable(tick)

    return (
        <div>
        <style jsx>{`
            button {
                display: block;
                margin-left: auto;
                margin-right: auto;
                margin-top: 16px;
                width: ${width}px;
                height: 40px;
                font-size: ${textSize}px;
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
           onClick={() => onClick()}
           >{text}</button>

        </div>
    );
};


export default Button;