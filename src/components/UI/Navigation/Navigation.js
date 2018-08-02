import React from 'react';
import Logo from '../Logo/Logo';
import NavItems from './NavItems/NavItems';


import classes from './Navigation.css';

const Navigation = (props) => (
    <div className={classes.Navigation}>
        <Logo height="70%"/>
        <nav className={classes.ifMobile}>
            <NavItems />
        </nav>
        <div className={classes.sidebarToggler} onClick={props.toggleSidebar}>
            <div className={classes.toggleLine}></div>
            <div className={classes.toggleLine}></div>
            <div className={classes.toggleLine}></div>
        </div>
    </div>
);
export default Navigation;
