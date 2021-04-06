import React from "react";
import ReactDOM from "react-dom";
import Home from './Home';
import Login from "./components/Login/Login"
import SongSubmission from "./components/Song-Submission/Song-submission";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
const App = () => (
  <>
    <BrowserRouter>
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
      <Link to = "/songsubmission">SongSubmission</Link>
      <Switch>
        <Route exact path="/home">
          <h1>{process.env.API_URL}</h1>
          <Home />
        </Route>
       <Route exact path="/login">
          <h1>{process.env.API_URL}</h1>
          <Login />
        </Route>
        <Route exact path="/songsubmission">
          <h1>{process.env.API_URL}</h1>
          <SongSubmission />
        </Route>
      </Switch>
    </BrowserRouter>
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
