import React, { Component } from 'react';

import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from './Contact/Contact';

class Checkout extends Component {
    state = {
        ingredients: null,
        doneness: 'medium',
        totalPrice: null,
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            if (param[0] === 'doneness') {
                this.setState({doneness: param[1]})
            }
            else if (param[0] === 'totalPrice') {
                this.setState({totalPrice: param[1]})
            }
            else {
            ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients: ingredients})

    }

    clickContinueHandler = () => {
        this.props.history.push(this.props.match.url+'/address')
        console.log(this.state)
    }

    clickCancelHandler = () => {
        this.props.history.goBack()
    }


    render() {
    return (
      <div>
        <CheckoutSummary
            ingredients={this.state.ingredients}
            doneness={this.state.doneness}
            clickContinue={this.clickContinueHandler}
            clickCancel={this.clickCancelHandler}
        />
        <Route path={this.props.match.url+'/address'} render={(props) => (
            <Contact
                ingredients={this.state.ingredients}
                doneness={this.state.doneness}
                price={this.state.totalPrice}
                {...props}
            />)} />
      </div>
    );
  }
}
export default Checkout;
