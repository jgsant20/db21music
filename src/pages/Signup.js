import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';

import './Signup.css';

const Signup = () =>{
    const [firstNameState, setFirstName] = useState("");
    
    const [lastNameState, setLastName] = useState("");
    
    const [usernameState, setUsername] = useState("");
    
    const [emailState, setEmail] = useState("");
    
    const [passwordState, setPassword] = useState("");
    return(
        <div className="signup-wrapper">
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstNameState.firstName}
            onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
            type="text"
            name="lastName"
            id="firstName"
            value={lastNameState.lastName}
            onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor="username">Username</label>
            <input
            type="text"
            name="userName"
            id="userName"
            value={usernameState.username}
            onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
            type="text"
            name="email"
            id="email"
            value={emailState.email}
            onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
            type="text"
            name="password"
            id="password"
            value={passwordState.password}
            onChange={e => setPassword(e.target.value)}
            />
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
    )
}
export default Signup;