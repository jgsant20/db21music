import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { checkAuth, setAuth } from '@Src/verifyLogin'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.scss";

import useFetch from "@Src/useFetch"

const Login = () => {
  const [username, setUsername] = useState(""); //useState creates a Hook so that we can store the value of "username" that the user inputs
  // we use this Hook to validate the users login information with the dbms
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    const formData = new FormData();
    
    formData.append('username', username);
    formData.append('password', password);

    fetch(`${process.env.API_URL}/api/login`, {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if(!res.ok) {
          throw Error('Could not fetch the data for that resource');
        }
        return res.json();
      })
      .then(res => {
        setAuth(res)
        window.location.assign("/home")
      })
      .catch(error => {
        console.log(error);
        setError(true);
      })
  }

  if (checkAuth()) {
    return (
      <Redirect to='/home' />
    )
  }

  return(
    <div className = "Login">
      <div className = "container">
        <div className="heading-text">
          Login Page
        </div>
        <Form onSubmit = {handleSubmit}>
          <Form.Group size = "lg" controlId = "username">
            <Form.Label className="text">Username</Form.Label>
            <Form.Control
              autoFocus
              type = "username"
              value = {username}
              onChange = {(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group size = "lg" controlId = "password">
            <Form.Label className="text">Password</Form.Label>
            <Form.Control
              type = 'password'
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <input type= "button" value="Submit" onClick={handleSubmit}/>
        </Form>
          <Button className = "register-button" onClick={event => window.location.href='/register'}>
            Register
          </Button>
      </div>
    </div>
  );
}
export default Login;
