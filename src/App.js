import React, { useState} from "react";
import ReactDOM from "react-dom";
import Home from './Home';
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import SongSubmission from "./components/Song-Submission/Song-submission";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
<<<<<<< Updated upstream
const App = () => (
=======
import '@Themes/colors.scss';

const App = () => {
  return(
>>>>>>> Stashed changes
  <>
    <BrowserRouter>
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
      <Link to = "/songsubmission">SongSubmission</Link>
      <Switch>
<<<<<<< Updated upstream
        <Route exact path="/home">
          <h1>{process.env.API_URL}</h1>
=======
        <Route path="/home">
>>>>>>> Stashed changes
          <Home />
        </Route>
       <Route path="/login">
          <Login />
        </Route>
        <Route path ="/SongSubmission">
          <SongSubmission /> 
        </Route>
      </Switch>
    </BrowserRouter>
  </>
  )};

ReactDOM.render(<App />, document.getElementById("root"));
