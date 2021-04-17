import React from "react";
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { responsiveFontSizes } from "@material-ui/core";

export const setAuth = (res) => {
  localStorage.setItem('token', res['token'])
  console.log(res['token'])
}

export const destroyAuth = () => {
  localStorage.setItem('token', '')
}

export const checkAuth = () => {
  let token = localStorage.getItem('token')

  if (!token || token == '') {
    return false;
  }

  try {
    let decodedToken = jwt_decode(token);
    let expirationMS = new Date(decodedToken['expiration']).getTime();
    let currentMS = new Date().getTime();


    if (!(decodedToken['username'] && decodedToken['type'] && decodedToken['expiration'])) {
      return false; 
    } else if (currentMS > expirationMS) {
      return false;
    }

  } catch (e) {
    return false;
  }

  return true
}

export const PrivateRoute = ({component, ...rest}) => {
  const Component = component;
  return (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    )} />
  )
};
