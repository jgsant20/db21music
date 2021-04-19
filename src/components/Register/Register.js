import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from '@material-ui/core/Button';
import "./Register.scss"
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { isEmail } from 'validator'
import FormHelperText from '@material-ui/core/FormHelperText'



const Register = () => {
  const [emailState, setEmailState] = useState("");
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [firstNameState, setfirstNameState] = useState("");
  const [lastNameState, setlastNameState] = useState("");
  const [userTypeState, setUserTypeState] = useState("");
  const [errorsState, setErrorsState] = useState({});

  const validate = () => {
      let errors = {};

      if (firstNameState === '') errors.firstName = 'First Name can not be blank.'
      if (lastNameState === '') errors.lastName = 'Last Name can not be blank.'
      if (!isEmail(emailState)) errors.email = 'Email must be valid.';
      if (emailState === '') errors.email = 'Email can not be blank.';
      if (usernameState === '') errors.username = 'Username can not be blank.';
      if (passwordState !== confirmPasswordState) errors.confirmPassword = 'Passwords must match'
      if (passwordState === '') errors.password = 'Password can not be blank.'
      if (userTypeState === '') errors.userType = 'User Type can not be blank.'

      if (Object.keys(errors) !== 0){
        setErrorsState(errors)
        return errors;
      }

  }

  const handleSubmission = () => {
    const formData = new FormData();
    
    const errors = validate();

    if(Object.keys(errors).length === 0){
        formData.append('email', emailState);
        formData.append('username', usernameState);
        formData.append('password', passwordState);
        formData.append('firstName', firstNameState);
        formData.append('lastName', lastNameState);
        formData.append('userType', userTypeState);
    
        for (var value of formData.values()) {
          console.log(value);
       }
    
        fetch(`${process.env.API_URL}/api/register`,
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

  };

  return (
    <div className="register">
      <form className="register__container"> 
      <h1>User Registration:</h1>
        <div className="Names">
            <label>First Name:</label>
            <input
                type='text'
                name="firstName"
                id="firstName"
                value={firstNameState.firstName}
                onChange={(e)=>setfirstNameState(e.target.value)}
            />
            <FormHelperText error= {errorsState.firstName ? true : false}>
                {errorsState.firstName}
            </FormHelperText>
            <label>Last Name:</label>
            <input
                type='text'
                name="lastName"
                id="lastName"
                value={lastNameState.lastName}
                onChange={(e)=>setlastNameState(e.target.value)}
            />
            <FormHelperText error= {errorsState.lastName ? true : false}>
                {errorsState.lastName}
            </FormHelperText>
        </div>
        <div className= "information">
            <div className="Email">
                <label htmlFor="Email">Email:</label>
                <input
                    type='text'
                    name="email"
                    id="email"
                    value={emailState.email}
                    onChange={(e)=>setEmailState(e.target.value)}
                />
            <FormHelperText error= {errorsState.email  ? true : false}>
                {errorsState.email}
            </FormHelperText>
            </div>
            <div className="Username">
                <label htmlFor="Username">Username:</label>
                <input
                    type='text'
                    name="username"
                    id="username"
                    value={usernameState.username}
                    onChange={(e)=>setUsernameState(e.target.value)}
                />
            <FormHelperText error= {errorsState.username ? true : false}>
                {errorsState.username}
            </FormHelperText>            </div>
            <div className="Password">
                <label htmlFor="Password">Password:</label>
                    <input
                    type='password'
                    name="password"
                    id="password"
                    value={passwordState.password}
                    onChange={(e)=>setPasswordState(e.target.value)}
                />
            <FormHelperText error= {errorsState.password ? true : false}>
                {errorsState.password}
            </FormHelperText>                
            <label htmlFor="ConfirmPassword">Confirm Password:</label>
                    <input
                    type='password'
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPasswordState.confirmPassword}
                    onChange={(e)=>setConfirmPasswordState(e.target.value)}
                />
            <FormHelperText error= {errorsState.confirmPassword ? true : false}>
                {errorsState.confirmPassword}
            </FormHelperText>            </div>
            <label>Type of User: </label>
            <Select
                labelId="userTypeSelect"
                id='userType'
                value={userTypeState.userType}
                onChange={(e)=>setUserTypeState(e.target.value)}>
                <MenuItem value ='listener'>Listener</MenuItem>
                <MenuItem value ='musician'>Musician</MenuItem>
            </Select>
        </div>
        <input type= "button" value="Submit" onClick={handleSubmission}/>
      </form>
    </div>
  );
}

export default Register;
