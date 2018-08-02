import React from 'react';
import classes from './BuildControl.css';

    const BuildControl = (props) => (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <div className={classes.Count}>{props.counts}</div>
            <button className={classes.Less} onClick={props.remove} disabled={props.counts === 0}>Less</button>
            <button className={classes.More} onClick={props.add} disabled={props.counts > 2}>More</button>
        </div>
    );

export default BuildControl;
