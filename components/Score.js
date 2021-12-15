import {Fragment} from 'react'

const Score = (props) => {
    return (

        <Fragment>

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

            <h3>{props.text}</h3>

        </Fragment>

    );
};

export default Score;