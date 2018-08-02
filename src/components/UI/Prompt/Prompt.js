import React, {Component} from 'react';
import Aux from '../../../hoc/Auxx/Auxx';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Prompt.css';

class Prompt extends Component {
    render() {
        return(
        <Aux>
            <Backdrop
                display = {this.props.display}
                click = {this.props.backdropClick}
            />
            <div className={classes.Prompt} style={this.props.display ? {top: "20%"} : {top: "-100%"}}>
                {this.props.children}
            </div>
        </Aux>
    )}
}

export default Prompt;
