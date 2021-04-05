import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { EvalSourceMapDevToolPlugin } from "webpack";

const Login = () => {
    const [email, setEmail] = useState(""); //useState creates a Hook so that we can store the value of "email" that the user inputs
    // we use this Hook to validate the users login information with the dbms
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    
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