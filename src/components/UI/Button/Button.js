import React, {Component} from 'react';

import classes from './Button.css';
class Button extends Component {
    render() {
        let color = null;
        switch(this.props.type) {
            case 'Green': color = "#4caf50";
            break;
            case 'Red': color = "#ab003c";
            break;
            default:
            color = "#777";
        }
        const Style = {
            backgroundColor: color,
            }
        return <button className={classes.Button} style={Style} onClick={this.props.click} {...this.props}>{this.props.children}</button>
    }
}

export default Button;
