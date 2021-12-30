import {Fragment} from 'react'
import useDisable from '../Utilities/useDisable';

const WinLabel = ({
    text,
    tick
}) => {


    const disable = useDisable(tick)


    return !disable ? (

        <div>

            <style jsx> {`
            
                h3 {
                    font-size: 24px;
                    margin-left: auto;
                    margin-right: auto;
                    display: block;
                    //justify-content: center;
                    text-align: center;
                    //background-color: rgb(75, 197, 85);
                }

            `}
            
            </style>

            <h3>{text}</h3>
            

        </div>

    ) : null;
};

export default WinLabel;