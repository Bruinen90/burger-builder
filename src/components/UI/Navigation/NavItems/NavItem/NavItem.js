import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavItem.css';

const NavItem = (props) => (

        <div
            className={classes.NavItem}
        >
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}
        >
            {props.children}
        </NavLink>
        </div>

);
export default NavItem;
