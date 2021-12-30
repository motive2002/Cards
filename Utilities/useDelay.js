import {useEffect, useState} from 'react'


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