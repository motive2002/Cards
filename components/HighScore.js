import React from 'react';
import { useScore } from './ScoreContext';
import { formatter } from '../Utilities/cardsFunc';

//LABEL AT THE BOTTOM OF THE SCREEN FOR HIGH SCORE.
//Reads value from context and formats it into money.

const HighScore = () => {

    const {state: {highScore}} = useScore()

    return (
        <div>
        <style jsx>{`

        .container {
                    display: flex;
                justify-content: center;

                }
            h3 {
                margin: 0;
                background-color: rgb(92, 207, 211);
                text-align: center;
                width: 576px;
                font-size: 14px;
                color: #fff;
            }
        `}

        </style>
        <div className='container'>
        <h3 >HIGH SCORE: {formatter.format(highScore)}</h3>
        </div>
        </div>
    );
};

export default HighScore;