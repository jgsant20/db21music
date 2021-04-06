import React from 'react';
import './LeftNavBar.scss';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

const NavigationButton = ({header, linkTo, IconComponent}) => {
  return (
    <ListItem button component={Link} to={linkTo} >
      <ListItemIcon>
        <IconComponent className="navigation-icon" />
      </ListItemIcon>
      <ListItemText fontSize="small" className="navigation-button" primary={header}/>
    </ListItem>
  )
}

const LeftNavBar = () => {
  return (
    <div className="left-nav-bar"> 
      <List className="navigation-button">
        <NavigationButton header="Home" linkTo="/home" IconComponent={HomeRoundedIcon}/>
        <NavigationButton header="Your Favorites" linkTo="/favorites" IconComponent={FavoriteRoundedIcon}/>
      </List>
    </div>
  )
}

export default LeftNavBar;
