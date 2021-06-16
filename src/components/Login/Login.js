import React, { useReducer } from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';

const emailReducer = (state, action) => {
  if (action.type === 'EMAIL_CHANGED') {
    return {
      ...state,
      email: action.payload,
      isEmailValid: action.payload.includes('@'),
    };
  }
  if (action.type === 'PASSWORD_CHANGED') {
    return {
      ...state,
      password: action.payload,
      isPasswordValid: action.payload.length > 6,
    };
  }

  return state;
};

const Login = props => {
  const [formInput, dispatch] = useReducer(emailReducer, {
    email: '',
    password: '',
    isEmailValid: null,
    isPasswordValid: null,
  });

  const { isEmailValid, isPasswordValid } = formInput;
  const isFormValid = isEmailValid && isPasswordValid;

  const emailChangeHandler = event => {
    dispatch({ type: 'EMAIL_CHANGED', payload: event.target.value });
  };

  const passwordChangeHandler = event => {
    dispatch({ type: 'PASSWORD_CHANGED', payload: event.target.value });
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onLogin(formInput.email, formInput.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            isEmailValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formInput.email}
            onChange={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            isPasswordValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formInput.password}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!isFormValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
