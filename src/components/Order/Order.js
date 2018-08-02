import React from 'react';

import classes from './Order.css'
const Order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            })
    }

    const ingredientsOutput = ingredients.map(ing => {
        return <span key={ing.name} className={classes.IngredientsList}>{ing.name} : ({ing.amount})</span>
    })
    const customerData = props.customerData
    const customerDataOutput =
        <div>
            <div>Name: {customerData.name}</div>
            <div>Phone: {customerData.phone}</div>
            <div>Street address: {customerData.street}, {customerData.zipCode}</div>
            <div>E-mail: {customerData.email}</div>
            <div>Delivery type: {customerData.deliveryMethod}</div>
        </div>

    return (
        <div className={classes.Order}>
            <div>
                Ingredients: {ingredientsOutput}<br />
                Doneness: {props.doneness}<br />
                Price: <strong>{props.price}</strong>
            </div>
            <div className={classes.ShippingDataWrapper}>
                <strong>Shipping data:</strong>
                    {customerDataOutput}
            </div>
        </div>
);}
export default Order;
