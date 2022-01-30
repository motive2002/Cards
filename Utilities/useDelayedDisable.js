import {useEffect, useState} from 'react'
   
//custom hook that flips a boolean around after a set time. Used for
//disabling buttons for a brief period.
const useDelayedDisable = (tick) => {

    const [disabled, setDisabled] = useState(false)

    useEffect(() => {

        setDisabled(true)
    
        
        setTimeout(() => {
            setDisabled(false)
        }, tick)
    

    },[tick])

    return disabled

}

export default useDelayedDisable
    
