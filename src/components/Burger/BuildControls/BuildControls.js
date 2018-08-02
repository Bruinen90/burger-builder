import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import CheckOutButton from './OrderButton/OrderButton';
import Aux from '../../../hoc/Auxx/Auxx';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},

];



    const BuildControls = (props) => {
        const counts = props.count;
        return(
            <div className = {classes.BuildControls}>
            <p>Total price: <span className={classes.Price}> ${props.price.toFixed(2)}</span></p>
                {controls.map(control => (
                    <Aux key = {control.label}>
                    <BuildControl
                    label = {control.label}
                    add = {() => props.addIngredient(control.type)}
                    remove = {() => props.removeIngredient(control.type)}
                    counts = {counts[control.type]}
                    />
                    {control.type === "meat" && counts[control.type] >0 ?
                        <div className={classes.Doneness}>
                            <button onClick={props.selectDoneness} value="rare" className={classes.Rare}>Rare</button>
                            <button onClick={props.selectDoneness} value="medium" className={classes.Medium}>Medium</button>
                            <button onClick={props.selectDoneness} value="well-done" className={classes.WellDone}>Well Done</button>
                        </div>
                    : null}
                    </Aux>
                ))}
                <CheckOutButton
                    totalIngredients = {props.totalIngredients}
                    click = {props.clickCheckout}
                />
            </div>
    );}

export default BuildControls;
