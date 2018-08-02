import React, {Component} from 'react';
import Aux from '../../../hoc/Auxx/Auxx';

import Button from '../../UI/Button/Button';

import classes from './CheckOutPrompt.css';

class checkOutPrompt extends Component {
    render () {
    const order = Object.keys(this.props.orderedIngredients).map(key => {
        return (
            <div key={key}>
            <span style={{textTransform:"capitalize"}}>
                {key}
            </span>:
                {this.props.orderedIngredients[key]}
            </div>
        )
    })
    return(
        <Aux>
            <div className={classes.Header}>Order</div>
            <div className={classes.OrderDetails}>{order}</div>
            <div className={classes.Price}>${this.props.price}</div>
            <Button click={this.props.clickContinue} type="Green">Continue</Button>
        </Aux>
    );
    }
}
export default checkOutPrompt;
