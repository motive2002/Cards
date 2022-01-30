import React, {Fragment} from 'react';
import Button from '../components/Button'
import { useScore } from './ScoreContext';
import { formatter } from '../Utilities/cardsFunc';
import { STARTING_SCORE } from '../Utilities/storageFunc';

//Set of Button components for the clickable stuff. Increasing/decreasing/max bet, add credits and DEAL

const Buttons = ({

    //incoming props
    sendDrawClick,
    tick, 
    turnCount

}) => {

    const arrowLeft = String.fromCharCode(8592)   //char codes for arrowa
    const arrowRight = String.fromCharCode(8594)


    //context and dispatch
    const {state: {multiplier, isDisabled}} = useScore()
    const {dispatch} = useScore()

    const handleDrawClick = () => {

        if(turnCount === 0) {
            //get stuff to redraw for updating the credits. This way the credits
            //get visually deducted as soon as the user presses draw
            dispatch({type: 'flag_refresh'})
    
        }

        //invoke function that was passed as props
        sendDrawClick()

    }

    const handleCreditClick = () => {

        //if we're busted, this button will be enabled. Add some credit.
        dispatch({type: 'add_credit', payload: STARTING_SCORE})
        dispatch({type: 'set_cap', payload: 1})
        dispatch({type: 'change_button'})  //toggle the button disabled

    }

    return (
        <Fragment>
        <style jsx>{`
        
        .grid-buttons {
                display: grid;
                column-gap: 16px;
                grid-template-columns: 24px 26px 122px 100px 100px 100px;
                background-color: #09771b;
                padding-left: 16px;
                width: 576px;
                grid-auto-rows: 40px;
            }

            .buttons-outer {
                display: flex;
                justify-content: center;
                height: 48px;
                padding-bottom: 0px;
                
            }
        `}
        
        </style>
        <div className='buttons-outer'>
        <div className='grid-buttons'>
        
        {/* isHardDisabled prop is for disabling without the timer/delay. For example, you can't change bet
        amount in the middle of a hand. Only before the first draw is made */}
        <Button text={arrowLeft} width={40} tick={tick} isHardDisabled={turnCount === 1}   onClick={() => dispatch({type: 'decrement_multiplier'})}/>
        <Button text={arrowRight} width={40}  tick={tick} isHardDisabled={turnCount === 1} onClick={() => dispatch({type: 'increment_multiplier'})}/>
        <Button text="MAX" width={64}  tick={tick} isHardDisabled={turnCount === 1} onClick={() => dispatch({type: 'max_multiplier'})}/>
    
        {/* A button that doesn't do anything but display the bet amount. It has no click event */}
        <Button  text={formatter.format(multiplier)} width={100} isLabel={true}/>
        
        {/* These buttons get their isHardDisabled prop argument from Context. Can't click DEAL if you have
        no credits. Can't click ADD CREDIT if you aren't 'busted' */}
        <Button text="ADD CREDIT" width={100} tick={tick} isHardDisabled={!isDisabled} textSize={9}  onClick={handleCreditClick}/>
        <Button text="DEAL" width={100} tick={tick} isHardDisabled={isDisabled} textSize={20}  onClick={handleDrawClick}/>
        
        </div>
        
        </div>

        </Fragment>
    );
};

export default Buttons;