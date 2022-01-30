import {Fragment, useEffect, useRef} from 'react'
import useDelayedDisable from '../Utilities/useDelayedDisable';
import { useScore } from './ScoreContext';
import { formatter } from '../Utilities/cardsFunc';

//This is the component for winning messages and current credits.
//It is hooked into Context to get game data

const WinLabel = ({
    winDisplay,
    tick
}) => {

    //custom hook to delay the loading of the component
    const disable = useDelayedDisable(tick)

    //Context
    const {state: {score, multiplier, refresh}} = useScore()
    const {dispatch} = useScore()

    let newScore = 0
    const winText = useRef("")

    useEffect(() => {

        //When the winDisplay prop changes, display score text with amount
        //then update the Context
        if (winDisplay.text !== undefined && winDisplay !== 0) {

            //royal flush on a 5 or more bet pay 800:1
            if(winDisplay.text === 'ROYAL FLUSH!' && multiplier >=5) {
                newScore = 800 * multiplier
            }else{
            newScore = winDisplay.score * multiplier
            }
        }

        if(newScore > 0) {
            winText.current = 
            "WIN " + newScore+ "  -  " + winDisplay.text

            //wait to update the score until all the cards are drawn
            setTimeout(() => {
                dispatch({type: "add_to_score", payload: newScore})                
                newScore = 0
            }, tick)
        }

        //if our remaining credits are zero and we lost the hand
        if(winDisplay === 0) {
            if (score < multiplier) {

                setTimeout(() => {

                    dispatch({type: 'set_cap'})
                    if (score === 0) {
                        winText.current = 'BUSTED!'

                        //disable the DEAL button and enable the ADD CREDIT button
                        dispatch({type: 'change_button'})
                        
                    }
                }, tick)     
            }  
        }
    }, [winDisplay])

    useEffect(() => {

        //The 'refresh' value from context is updated when DEAL is clicked.
        //The win text is cleared and current bet is deducted from score
        dispatch({type: 'remove_from_score', payload: multiplier})
        winText.current = ""

    }, [refresh])

    return  (
        <Fragment>

            <style jsx> {`

                .container {
                    display: flex;
                    justify-content: center;  
                }
            
                .win_left {
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 500;
                    width: 288px;
                    height: 32px;
                    padding: 4px;
                    margin-top: 0px;
                    margin-bottom: 0px;
                    align-content: center;
                    text-align: left;
                    background-color: rgb(233, 156, 185);
                }

                .win_right {
                    display: inline-block;
                    font-size: 16px;
                    width: 288px;
                    height: 32px;
                    padding: 4px;
                    margin-top: 0px;
                    margin-bottom: 0px;
                    text-align: right;
                    background-color: rgb(233, 156, 185);
                }

            `}
            
            </style>
            
            <div className='container'>
                {disable ? <h3 className='win_left'>{""}</h3> : <h3 className='win_left'>{winText.current}</h3>}
                <h3 className='win_right'>CREDIT: {formatter.format(score)}</h3>
            </div>
        </Fragment>
    ) 
};

export default WinLabel;