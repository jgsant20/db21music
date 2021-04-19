import React from 'react';
import './LeftNavBar.scss';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

import { checkAuth } from "@Src/verifyLogin";

const NavigationButton = ({header, linkTo, IconComponent}) => {
  return (
    <ListItem button component={Link} to={linkTo} className="navigation" >
      <ListItemIcon>
        <IconComponent className="navigation-icon" />
      </ListItemIcon>
      <ListItemText fontSize="small" className="navigation-button" primary={header}/>
    </ListItem>
  )
}

const LeftNavBar = () => {
	const { path } = useRouteMatch();

  return (
    <div className="left-nav-bar"> 
      <List className="navigation-button">
        <NavigationButton header="Home" linkTo={`${path}`} IconComponent={HomeRoundedIcon}/>
        <NavigationButton header="Favorites" linkTo={`${path}/favorites`} IconComponent={FavoriteRoundedIcon}/>

        {!checkAuth("musician") ? null : (
          <>  
            <NavigationButton header="Upload" linkTo={`${path}/songsubmission`} IconComponent={PublishRoundedIcon}/>
            <NavigationButton header="My Songs" linkTo={`${path}/mysongs`} IconComponent={LibraryMusicIcon}/>
          </>
        )}
      </List>
    </div>
  )
}

export default LeftNavBar;
