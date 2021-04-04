import React from "react";
import ReactDOM from "react-dom";
import Home from './Home';
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
    </BrowserRouter>
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
