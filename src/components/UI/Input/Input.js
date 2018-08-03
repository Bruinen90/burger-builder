import React from 'react';

import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let invalidMessage = null;

    if (props.invalid && props.shouldValidate && props.ifChanged) {
        inputClasses.push(classes.Invalid);
        invalidMessage = <span className={classes.InvalidMessage}>Please, enter valid value</span>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement=
                <div>
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
                {invalidMessage}</div>;
            break;
        case ('textarea'):
            inputElement =
                <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />;
            break;
        case('select'):
            inputElement =
                <select
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            break;
        default:
            inputElement=
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />;
    }
    return (
    <div className={classes.Input}>
        <label classes={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
);}
export default Input;
