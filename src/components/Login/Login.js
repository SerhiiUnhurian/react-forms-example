import React, { useContext, useReducer, useRef } from 'react';
import AuthContext from '../store/auth-context';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
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

const Login = () => {
  const [formInput, dispatch] = useReducer(emailReducer, {
    email: '',
    password: '',
    isEmailValid: null,
    isPasswordValid: null,
  });

  const ctx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const { isEmailValid, isPasswordValid } = formInput;

  const emailChangeHandler = event => {
    dispatch({ type: 'EMAIL_CHANGED', payload: event.target.value });
  };

  const passwordChangeHandler = event => {
    dispatch({ type: 'PASSWORD_CHANGED', payload: event.target.value });
  };

  const submitHandler = event => {
    event.preventDefault();

    if (!isEmailValid) {
      return emailRef.current.focus();
    } else if (!isPasswordValid) {
      return passwordRef.current.focus();
    }

    ctx.onLogin(formInput.email, formInput.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          type="email"
          id="email"
          label="Email"
          value={formInput.email}
          isValid={isEmailValid}
          onChange={emailChangeHandler}
        />
        <Input
          ref={passwordRef}
          type="password"
          id="password"
          label="Password"
          value={formInput.password}
          isValid={isPasswordValid}
          onChange={passwordChangeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
