import React from 'react';

import classes from './OrderButton.css';

const CheckOutButton = (props) => (
    <button
        className={classes.CheckOutButton}
        disabled={props.totalIngredients > 0 ? false : true}
        onClick = {props.click}>
            Order!
    </button>
);
export default CheckOutButton;
