import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UserInterface/Button/Button';
import classes from './CheckOutSummary.css';

const checkOutSummary = (props) => {
    return (
        <div className={classes.CheckOutSummary}> 
            <h1> I hope this tastes well</h1>
            <div style={{width: '100%', height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btn="Danger"
                clicked>CANCEL</Button> 
            <Button btn="Success"
                clicked>SUCCESS</Button> 
        </div>
    )
}

export default checkOutSummary;