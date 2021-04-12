import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState(""); //useState creates a Hook so that we can store the value of "email" that the user inputs
    // we use this Hook to validate the users login information with the dbms
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        const formData = new FormData();
    
        const errors = validate();
        console.log(errors);
    
        if(Object.keys(errors).length === 0){
            formData.append('email', email);
            formData.append('password', password);
        
            for (var value of formData.values()) {
              console.log(value);
           }
        
            fetch(`${process.env.API_URL}/api/login`,
              //insert upload API
              {
                method: 'POST',
                mode: 'no-cors',
                body: formData,
              }
            )
              .then((response) => response.json)
              .then((result) => {
                console.log('Success: ', result);
              })
              .catch((error) => {
                console.error('Error: ', error);
              });
        }
    
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
                <Button block size = "lg" type = "submit" disabled = {!validateForm}>
                    Login
                </Button>
            </Form>
        </div>
    );
}
export default Login;