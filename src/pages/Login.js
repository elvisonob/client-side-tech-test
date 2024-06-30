import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import classes from './Login.module.css';

const Login = () => {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [serverInfo, setServerInfo] = useState(null);

  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const emailIsValid =
      enteredEmail.includes('@') && enteredEmail.includes('.');
    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);

    const passwordIsValid = enteredPassword.length >= 5;
    if (!passwordIsValid) {
      setPasswordIsInvalid(true);
      return;
    }

    setPasswordIsInvalid(false);

    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }

      navigate('/userDetails');
    } catch (error) {
      setServerInfo(error.message);
    }
  };

  return (
    <div className={classes.login}>
      <h1>Login</h1>
      <form onSubmit={onHandleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" ref={email} />
        <div className={classes.validationControl}>
          {emailIsInvalid && <p>Please enter a valid email address</p>}
        </div>

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" ref={password} />
        <div className={classes.validationControl}>
          {passwordIsInvalid && (
            <p>Please ensure password is at least 5 characters</p>
          )}
        </div>
        <div className={classes.validationControl}>
          <p>{serverInfo}</p>
        </div>
        <button>Submit</button>
      </form>
      <p>
        Not have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
