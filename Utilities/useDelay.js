import {useEffect, useState} from 'react'

//custom hook that returns true after a set amount. Used to delay the loading
//of card components, or highlighting their border.

const useDelay = (tick) => {

    const [delay, setDelay] = useState(false)

    useEffect(() => {

        setTimeout(() => {
            setDelay(true)
        }, tick)
    },[tick])

    return delay

}

export default useDelay