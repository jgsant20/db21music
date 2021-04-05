import React from "react";
import ReactDOM from "react-dom";
import Home from './Home';
import Login from "./Login"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
const App = () => (
  <>
    <BrowserRouter>
      <Link to="/home">Home</Link>
      <Switch>
        <Route exact path="/home">
          <h1>{process.env.API_URL}</h1>
          <Home />
        </Route>
      </Switch>
      <Link to="/Login">Login</Link>
      <Route exact path="/login">
        <h1>{process.env.API_URL}</h1>
          <Login />
        </Route>
    </BrowserRouter>
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
