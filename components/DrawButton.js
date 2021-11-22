import React from 'react';

const DrawButton = (props) => {
    return (
        <div>
        <style jsx>{`
            button {
                display: block;
                margin-left: auto;
                margin-right: auto;
                margin-top: 16px;
                width: 120px;
                height: 60px;
                font-size: 24px;
                font-weight: bolder;
                background-color: rgb(92, 207, 211);
                border-radius: 16px;
                justify-content: center;
                caret-color: transparent;
            }
            button: hover {
                    background-color: rgb(127, 229, 233);
                }
        `}</style>
           <button onClick={e => props.onClick()}>Draw</button>
        </div>
    );
};

export default DrawButton;