import React from 'react';
import classes from './Logo.css';

import LogoImage from '../../../assets/burger-logo.png';

const Logo = (props) => (
    <img src={LogoImage} alt="Burger Builder App" className={classes.Logo} style={{height: props.height}}/>
);
export default Logo;
