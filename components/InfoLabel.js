import {Fragment} from 'react';

//JUST A DISPLAY THAT SAYS "MULTIPLIER" AND "BET" ABOVE THE BUTTONS. DOESN'T DO ANYTHING ELSE.
const InfoLabel = () => {
    return (
        <Fragment>
        <style jsx> {`
            .outer {
                display: flex;
                justify-content: center;
            }
            .container{
                display: grid;
                grid-template-columns: 218px 270px;
                width: 576px;
                background-color: #09771b;
                height: 28px;
                align-items: center;
            }
            .item {
                font-weight: 600;
                font-size: 10px;
                color: blanchedalmond;
                padding-left: 60px;
            }
        
        `}
        </style>
        <div className='outer'>
        <div className = 'container'>
            <h3 className='item'>Multiplier</h3>
            <h3 className='item'>BET</h3>
        </div>
        </div>
        </Fragment>
    );
};
export default InfoLabel;