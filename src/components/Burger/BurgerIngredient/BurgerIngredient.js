import React, {Component} from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render () {
        let donenessColor = null;
        switch(this.props.doneness) {
            case('rare'):
                donenessColor =  {background: "linear-gradient(to bottom, #7c5d4f 0%,#d5561d 25%,#d5561d 75%,#7c5d4f 100%)"}
                break;
            case('medium'):
                donenessColor = {background: "linear-gradient(#7c5d4f, #d5561d, #7c5d4f)"}
                break;
            case('well-done'):
                donenessColor = {backgroundColor: "#7c5d4f"}
                break;
            default:
                donenessColor = null;
            }

        let ingredient = null;

          switch(this.props.type) {
              case('bread-bottom'):
                  ingredient = <div className={classes.BreadBottom}></div>;
                  break;
              case('bread-top'):
                  ingredient = (
                      <div className={classes.BreadTop}>
                          <div className={classes.Seeds1}></div>
                          <div className={classes.Seeds2}></div>
                      </div>
                  )
                  break;
              case('meat'):
                  ingredient = <div className={classes.Meat} style={donenessColor}></div>
                  break;
              case('salad'):
                  ingredient = <div className={classes.Salad}></div>
                  break;
              case('cheese'):
                  ingredient = <div className={classes.Cheese}></div>
                  break;
              case('bacon'):
                  ingredient = <div className={classes.Bacon}></div>
                  break;
              default:
                  ingredient = null;
          }

          return ingredient;
    }
}


BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;
