import {useEffect, useState} from 'react'
    
const useDisable = (tick) => {

    const [disabled, setDisabled] = useState(false)

    useEffect(() => {

        setDisabled(true)

        setTimeout(() => {
            setDisabled(false)
        }, tick)

    },[tick])

    return disabled

}

export default useDisable
    
