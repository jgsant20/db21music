import React from "react";
import ReactDOM from "react-dom";
import Home from './Home';
import Login from "@Components/Login/Login"
import SongSubmission from "@Components/Song-Submission/Song-submission";
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
        <Route path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
