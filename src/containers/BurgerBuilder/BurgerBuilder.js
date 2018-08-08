import React, {Component} from 'react';
import axios from '../../axios-orders.js';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Prompt from '../../components/UI/Prompt/Prompt';
import CheckOutPrompt from '../../components/Burger/CheckOutPrompt/CheckOutPrompt';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class BurgerBuilder extends Component {
    state = {
        displayPrompt: false,
        loading: false,
        error: false,
    };

    componentDidMount () {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }

    checkoutHandler = () => {
        this.setState({displayPrompt: true})
    }

    hidePromptHandler = () => {
        this.setState({displayPrompt: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render () {
        let orderPrompt = <Prompt
                backdropClick = {this.hidePromptHandler}
                display = {this.state.displayPrompt}
            >
                <CheckOutPrompt
                    price = {this.props.totalPrc}
                    orderedIngredients = {this.props.ings}
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

        let burger = this.state.error ?
            <p style={{textAlign: 'center', marginTop: '10%'}}>
            Sorry, an error occured, please try again in few minutes
            </p> :
            <Spinner />

        if (this.props.ings) {
            burger =
                <Aux>
                    <Burger
                        ingredients = {this.props.ings}
                        doneness = {this.props.done}
                    />
                    <BuildControls
                        addIngredient = {this.props.onIngredientAdded}
                        removeIngredient = {this.props.onIngredientRemoved}
                        count = {this.props.ings}
                        price = {this.props.totalPrc}
                        totalIngredients = {this.props.totalIngs}
                        clickCheckout = {this.checkoutHandler}
                        selectDoneness = {this.props.onChangeDoneness}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        done: state.doneness,
        totalIngs: state.totalIngredients,
        totalPrc: state.totalPrice,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
        onChangeDoneness: (newDoneness) => dispatch({type: actionTypes.CHANGE_DONENESS, newDoneness: newDoneness})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
