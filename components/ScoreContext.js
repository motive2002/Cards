import React, {createContext, useContext, useReducer} from 'react';
import { putLocalStorage, cardsScore } from '../Utilities/storageFunc';


const ScoreContext = createContext()

const scoreReducer = (state, action) => {

    //temp values for modifying state
    let tempValue = 0 
    let tempBln = false

    //min-max bets
    const MIN = 1
    const MAX = 10

    switch(action.type) {

        //bet multiplier can't be more than what we have left
        case 'set_cap': {
            if(state.score < state.multiplier) {
                tempValue = state.score
            }else{
                tempValue = action.payload
            }
            return {...state, multiplier: tempValue}
        }
        //Increase and decrease bets via clicking the arrow or MAX buttons
        case 'increment_multiplier': {
            tempValue = state.multiplier + 1
            if (tempValue > MAX) tempValue = MAX
            if(tempValue > state.score) tempValue = state.score
            return {...state, multiplier: tempValue}
        }
        case 'decrement_multiplier': {
            tempValue = state.multiplier - 1
            if (tempValue < MIN) tempValue = MIN
            return {...state, multiplier: tempValue}
        }
        case 'max_multiplier': {
            if (state.score < MAX) {
                tempValue = state.score
            }else{
                tempValue = MAX
            }
            return {...state, multiplier: tempValue}
        }
        //We won something. Add to the score
        case 'add_to_score': {
            tempValue = state.score + action.payload
            //if we passed the high score, update it.
            if(tempValue > cardsScore.highScore) {
                cardsScore.highScore = tempValue
                putLocalStorage({score: tempValue, highScore: tempValue})
                return {...state, score: tempValue, highScore: tempValue}
            }else{
            //if not just update the score
            putLocalStorage({...cardsScore, score: tempValue})
            return {...state, score: tempValue}
            }   
        }
        //We made a bet. Deduct it from the score.
        case 'remove_from_score': {
            tempValue = state.score - action.payload
            putLocalStorage({...cardsScore, score: tempValue})
            return {...state, score: tempValue}
        }
        //For refreshing the winLabel component to update the score
        //when we hit DEAL
        case 'flag_refresh': {
            state.refresh = !state.refresh
            return state
        }
        //ADD CREDIT button was pressed OR a new file was created in localStorage.
        case 'add_credit': {
            tempValue = action.payload
            return {...state, score: tempValue}
        }
        //Change the ADD CREDIT and DEAL button disabled status
        case 'change_button': {
            tempBln = !state.isDisabled
            return {...state, isDisabled: tempBln}
        }
        default: {
            throw new Error('Unhandled action type');
        }
    }
}

const ScoreProvider = ({children}) => {

    //initial score values come from the global cardsScore object
    //which is loaded from localStorage in the LoadMeFirst component.
    const initVal = {
        multiplier: 1,
        score: cardsScore.score,
        highScore: cardsScore.highScore,
        refresh: false,
        isDisabled: false
    }

    const [state, dispatch] = useReducer(scoreReducer, initVal)
    const value = {state, dispatch}
    return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>

}

const useScore = () => {
    const context = useContext(ScoreContext)
    if(context === undefined) {
        throw new Error('useScore must me used within a ScoreProvider')
    }
    return context
}

export {ScoreProvider, useScore}