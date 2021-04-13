import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

import useFetch from "@Src/useFetch"

const Login = () => {
  const [email, setEmail] = useState(""); //useState creates a Hook so that we can store the value of "email" that the user inputs
  // we use this Hook to validate the users login information with the dbms
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    const formData = new FormData();
    
    formData.append('email', email);
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
        console.log(res)
      })
      .catch(error => {
        console.log(error);
        setError(true);
      })
  }

  return(
    <div className = "Login">
      <Form onSubmit = {handleSubmit}>
        <Form.Group size = "lg" controlId = "email">
          <Form.Label>Email</Form.Label>
          <Form.Control
          autoFocus
          type = "email"
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size = "lg" controlId = "password">
          <Form.Label>Password</Form.Label>
          <Form.Control
          type = 'password'
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* <Button block size = "lg" type = "submit" disabled = {!validateForm}>
          Login
        </Button> */}
        <input type= "button" value="Submit" onClick={handleSubmit}/>
      </Form>
    </div>
  );
}
export default Login;