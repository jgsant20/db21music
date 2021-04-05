import React from "react";
import ReactDOM from "react-dom";
import Home from './Home';
import Login from "./Login"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import '@Themes/colors.scss';

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div style={{color: 'blue'}}>
            <Link to="/home">Click-to-go-to-home</Link>
          </div>
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
  <Link to="/Login">Login</Link>
      <Route exact path="/login">
        <h1>{process.env.API_URL}</h1>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
