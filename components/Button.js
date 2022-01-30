
//custom hook to set how long the button is disabled.
import useDelayedDisable from '../Utilities/useDelayedDisable';  

const Button = ({

    //incoming props
    tick,
    text,
    width,
    textSize,
    onClick,
    isHardDisabled,

}) => {
    const delayedDisabled = useDelayedDisable(tick)
    
    const hasClicked = onClick

    return (
        <div>
        <style jsx>{`
            button {
                display: block;
                margin-right: auto;
                width: ${width}px;
                height: 40px;
                font-size: ${textSize}px;
                font-weight: bolder;
                background-color: rgb(92, 207, 211);
                border-radius: 16px;
                caret-color: transparent;
            }
            button: hover {
                    background-color: rgb(127, 229, 233);
                }
        `}</style>

           <button disabled={isHardDisabled ? true : delayedDisabled} 
           onClick={hasClicked}
           >{text}</button>

        </div>
    );
};

export default Button;