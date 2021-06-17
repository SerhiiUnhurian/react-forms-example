import React, { useImperativeHandle, useRef } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const { type, id, value, label, isValid, onChange } = props;
  const inputRef = useRef();

  const focus = () => inputRef.current.focus();

  useImperativeHandle(ref, () => ({
    focus,
  }));

  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

export default Input;
