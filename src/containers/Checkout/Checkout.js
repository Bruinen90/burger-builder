import React, { Component } from 'react';

import {Route} from 'react-router-dom';

import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from './Contact/Contact';

class Checkout extends Component {

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     for (let param of query.entries()) {
    //         if (param[0] === 'doneness') {
    //             this.setState({doneness: param[1]})
    //         }
    //         else if (param[0] === 'totalPrice') {
    //             this.setState({totalPrice: param[1]})
    //         }
    //         else {
    //         ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ingredients: ingredients})
    //
    // }

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
            ingredients={this.props.ings}
            doneness={this.props.done}
            clickContinue={this.clickContinueHandler}
            clickCancel={this.clickCancelHandler}
        />
        <Route path={this.props.match.url+'/address'} component={Contact} />
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        done: state.doneness,
    }
}

export default connect(mapStateToProps)(Checkout);
