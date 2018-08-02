import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => (
    <div className={classes.Backdrop} style={props.display ? null : {display: "none"}} onClick={props.click}></div>
);
export default backdrop;
