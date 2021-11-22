import {Fragment, useEffect, useState, useRef} from 'react'
import DrawButton from './DrawButton'
import { defineDeck , shuffle } from '../Utilities/cardsFunc';
import Card from './Card'
import { v4 as uuidv4 } from 'uuid'

const CardsTemp = () => {

  
    const [foo, setFoo] = useState(false)         //force re-render
    const drawn = useRef(false)
    const turnCount = useRef(0)                   //2 turns to draw    
    const cardsIndex = useRef(0)                  //index for which card in array to be rendered
    const keyIndex = useRef(0)
    const curHand = useRef([])                    //current hand of cards      
    const fullDeck = useRef(defineDeck())         //the whole deck of 52 cards

    useEffect(() => {
        //shuffle the whole deck
        shuffle(fullDeck.current)
        console.log(fullDeck)

    },[])


    const draw = (numOfCards) => {
        //draw cards from the top of the deck
        const arr = []

        for(let i = 0; i < numOfCards; i++) {

            //let n = turnCount.current + cardsIndex.current + i
            //arr.push(fullDeck.current[n])
            //console.log(cardsIndex.current)
            arr.push(fullDeck.current[cardsIndex.current])
            cardsIndex.current = cardsIndex.current + 1
            

        }
        
        return arr

    }

    const DrawClick = () => {

        curHand.current = draw(5)
        setFoo(!foo)



        // if (turnCount.current === 1) {
        //     setFoo(!foo)  //dummy for forced re-render
        //     curHand.current = draw(5)
        // }else{
        //     setFoo(!foo)
        //     curHand.current = draw(5)
        //     console.log('second turn')
            
        // }
        turnCount.current++
        
        if (turnCount.current >=2) {
            turnCount.current = 0
            cardsIndex.current = 0

            shuffle(fullDeck.current)
            console.log('shuffled')

        }

    }

    const hasClicked = (num) => {

        //todo change state for cards that were clicked
        console.log(`clicked ${num}`)

    }

    return (

    <Fragment >

        <style jsx>{`

            .grid-container {
            display: grid;
            justify-content: center;
            grid-gap: 16px 16px;
            grid-template-columns: 96px 96px 96px 96px 96px;
            background-color: #2196F3;
            padding: 16px;
            }

            `}

        </style>
        
        <div className='grid-container'>

            {curHand.current.map((item, index) => {
               
                    //make a unique key based on the index of what card from the array to draw
                    //const i = turnCount.current + cardsIndex.current + mult
                    //console.log(i)
                    
                    if (keyIndex.current > 9) keyIndex.current = 0

                    const i = keyIndex.current
                    const t = (index + 1) * 250
                    keyIndex.current++

                   
                    console.log(keyIndex.current)
    
                    return (
                
                   <Card key={i}
                    index={i}
                    x={item.position[0]}      //position in x
                    y={item.position[1]}      //position in y
                    tick={t}        //amount of time to wait before card renders
                    clickStatus={hasClicked}   //bounce a function down to the card component to return a value later.

                />)
            }) 
            }
            
        </div>

        <DrawButton onClick={() => DrawClick()}/>
        
    </Fragment>

    );
};

export default CardsTemp;