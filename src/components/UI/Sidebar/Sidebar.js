import React from 'react';
import Logo from '../Logo/Logo';
import NavItems from '../Navigation/NavItems/NavItems';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxx/Auxx';

import classes from './Sidebar.css';

const Sidebar = (props) => {
    let sideClass = [classes.Sidebar];
    if (props.displaySidebar) {
            sideClass.push(classes.Open);
    } else {
        sideClass.push(classes.Close);
    }
    return(
        <Aux>
        <Backdrop
            display={props.displaySidebar}
            click={props.clickSidebarBackdrop}
        />
        <div className={sideClass.join(' ')}>
        <Logo height="60px" />
        <NavItems />
        </div>
        </Aux>
    )
}


export default Sidebar;
