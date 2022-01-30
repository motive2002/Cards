//Global variables for score.
export const STARTING_SCORE = 50
export const cardsScore = {} 

//variable for local storage
const myStorage = null  

//STORAGE FUNCTIONS
export const initStorage = () => {

    if(typeof window !== undefined) {
        myStorage = window.localStorage
    }
}

export const putLocalStorage = (item) => {

    myStorage.setItem("game", JSON.stringify(item))

}

export const getLocalStorage = () => {

    const res = {}
    if (myStorage !== null) {
        res = JSON.parse(myStorage.getItem("game"))
        return res
    }

}