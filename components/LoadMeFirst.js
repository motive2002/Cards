import React, {useEffect} from 'react';
import { initStorage, getLocalStorage, putLocalStorage, cardsScore, STARTING_SCORE  } from '../Utilities/storageFunc';

const LoadMeFirst = ({

    isReady //callback

}) => {

    useEffect(() => {

        //If we're using SSR, we have to load SOMETHING before we can have access
        //to window.localStorage. That's what the useEffect and dummy component are for.
        initStorage()
        let temp = {}

        try{

            //if there is nothing in local storage (this is our first run) the try
            //will fail.
            temp = getLocalStorage()

            //If there IS a value in local storage, see if the score is higher than zero.
            if (temp.score > 0) {

                //If it is higher than zero, put the values from localStorage into our global variable.
                //The +1 resolves a tiny bug where loading the component automatically
                //takes 1 away from our score.
                cardsScore.score = temp.score + 1
                cardsScore.highScore = temp.highScore

                //Let the parent know we're ready via callback
                isReady()
            }else{

                //If the value is zero, the user must have refreshed the page WHILE
                //their score was zero. Restart the game with default credits.
                cardsScore.score = STARTING_SCORE + 1
                cardsScore.highScore = temp.highScore
                isReady()
            }

        }catch{

            //There was nothing in local storage, so
            //make a file with the default number of credits and default high score.
            cardsScore.score = STARTING_SCORE + 1
            cardsScore.highScore = STARTING_SCORE
            putLocalStorage({score: STARTING_SCORE + 1, highScore: STARTING_SCORE})
            isReady()
        }
  
    }, [])

    return (
        <div>
            
        </div>
    );
};

export default LoadMeFirst;