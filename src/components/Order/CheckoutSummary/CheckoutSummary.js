import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
    <div className={classes.CheckoutSummary}>
        <h1>Have a nice day</h1>
        <div style={{width: '100%', margin: 'auto',}}>
            <Burger
                ingredients = {props.ingredients}
                doneness = {props.doneness}
            />
        </div>
        <Button
            type = "Red"
            click={props.clickCancel}>Cancel</Button>
        <Button
            type="Green"
            click={props.clickContinue}>Continue</Button>
    </div>
    )
}

export default CheckoutSummary;
