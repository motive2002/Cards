import {useState, useEffect} from 'react';

const Delayed = ({children, waitBeforeShow = 1000}) => {

    const [isShown, setIsShown] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsShown(true)
        }, waitBeforeShow)
    },[waitBeforeShow])


    return isShown ? children : null
};

export default Delayed;