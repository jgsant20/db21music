import React from "react";
import ReactDOM from "react-dom";
import Home from './Home';
import Login from "@Components/Login/Login"
import Register from "@Components/Register/Register"
import SongSubmission from "@Components/Song-Submission/Song-submission";
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

import '@Themes/colors.scss';

const checkAuth = () => {
  return false
}

const PrivateRoute = ({component, ...rest}) => {
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

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to='/home' />
        </Route>
        <PrivateRoute path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
