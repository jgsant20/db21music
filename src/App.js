import React from "react";
import ReactDOM from "react-dom";
import Home from './Home';
import Login from "./components/Login/Login"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
const App = () => (
  <>
    <BrowserRouter basename = "/login">
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
      <Switch>
        <Route exact path="/home">
          <h1>{process.env.API_URL}</h1>
          <Home />
        </Route>
       <Route exact path="/login">
          <h2>{process.env.API_URL}</h2>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
