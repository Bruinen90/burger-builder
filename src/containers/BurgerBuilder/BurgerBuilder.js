import React, {Component} from 'react';
import axios from '../../axios-orders.js';

import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Prompt from '../../components/UI/Prompt/Prompt';
import CheckOutPrompt from '../../components/Burger/CheckOutPrompt/CheckOutPrompt';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 1,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 3,
        totalIngredients: 0,
        displayPrompt: false,
        loading: false,
        error: false,
        doneness: 'medium',
    };

    componentDidMount () {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    addIngredientHandler = (type) => {
        const currentIngredients = {...this.state.ingredients};
        currentIngredients[type] += 1;
        let currentPrice = this.state.totalPrice;
        currentPrice += INGREDIENT_PRICES[type];
        let currentTotalIngredients = this.state.totalIngredients + 1;
        this.setState({
            ingredients: currentIngredients,
            totalPrice: currentPrice,
            totalIngredients: currentTotalIngredients,
        })
    };

    removeIngredientHandler = (type) => {
        const currentIngredients = {...this.state.ingredients};
        if (currentIngredients[type] > 0) {
        currentIngredients[type] -= 1;
        let currentPrice = this.state.totalPrice;
        currentPrice -= INGREDIENT_PRICES[type];
        let currentTotalIngredients = this.state.totalIngredients - 1;
        this.setState({
            ingredients: currentIngredients,
            totalPrice: currentPrice,
            totalIngredients: currentTotalIngredients,
        })
        }
    };

    changeDoneness = (event) => {
        this.setState({doneness: event.target.value})
    }

    checkoutHandler = () => {
        this.setState({displayPrompt: true})
    }

    hidePromptHandler = () => {
        this.setState({displayPrompt: false})
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('totalPrice=' + this.state.totalPrice);
        queryParams.push('doneness=' + this.state.doneness);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString,
        })
    }

    render () {
        let orderPrompt = <Prompt
                backdropClick = {this.hidePromptHandler}
                display = {this.state.displayPrompt}
            >
                <CheckOutPrompt
                    price = {this.state.totalPrice}
                    orderedIngredients = {this.state.ingredients}
                    clickContinue = {this.purchaseContinueHandler}
                />
            </Prompt>
        if (this.state.loading) {
            orderPrompt = <Prompt
                    backdropClick = {this.hidePromptHandler}
                    display = {this.state.displayPrompt}
                >
                <Spinner />
                </Prompt>
        }

        let burger = this.state.error ? <p style={{textAlign: 'center', marginTop: '10%'}}>Sorry, an error occured, please try again in few minutes</p> : <Spinner />

        if (this.state.ingredients) {
            burger =
                <Aux>
                    <Burger
                        ingredients = {this.state.ingredients}
                        doneness = {this.state.doneness}
                    />
                    <BuildControls
                        addIngredient = {this.addIngredientHandler}
                        removeIngredient = {this.removeIngredientHandler}
                        count = {this.state.ingredients}
                        price = {this.state.totalPrice}
                        totalIngredients = {this.state.totalIngredients}
                        clickCheckout = {this.checkoutHandler}
                        selectDoneness = {(event)=>this.changeDoneness(event)}
                    />
                    {orderPrompt}
                </Aux>
        }
        return (
            <Aux>
                {burger}

            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
