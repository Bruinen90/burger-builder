import React, {Component} from 'react';
import Aux from '../Auxx/Auxx';
import classes from './Layout.css';
import Navigation from '../../components/UI/Navigation/Navigation';
import Sidebar from '../../components/UI/Sidebar/Sidebar';

class Layout extends Component {
    state = {
        displaySidebar: false,
    }
    sideBarCloseHandler = () => {
        this.setState({displaySidebar: false})
    }

    sideBarOpenHandler = () => {
        this.setState({displaySidebar: true})
    }



    render () {
        return (
            <Aux>
            <Navigation
                toggleSidebar = {this.sideBarOpenHandler}
            />
            <Sidebar
                clickSidebarBackdrop = {this.sideBarCloseHandler}
                displaySidebar = {this.state.displaySidebar}
            />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
