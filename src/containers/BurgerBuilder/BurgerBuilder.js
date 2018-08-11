import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Prompt from '../../components/UI/Prompt/Prompt';
import CheckOutPrompt from '../../components/Burger/CheckOutPrompt/CheckOutPrompt';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';



class BurgerBuilder extends Component {
    state = {
        displayPrompt: false,
    };

    componentDidMount () {
        this.props.onInitIngredients();
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

        let burger = this.props.error ?
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
        error: state.error,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onChangeDoneness: (newDoneness) => dispatch(burgerBuilderActions.changeDoneness(newDoneness)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
