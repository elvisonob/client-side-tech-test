import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import classes from './Login.module.css';

// import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [serverError, setServerError] = useState(null);
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
    console.log(enteredEmail, enteredPassword);
    // email.current.value = '';
    // password.current.value = '';

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

      // Handle successful login (e.g., redirect to dashboard)
      console.log('Login successful');
      navigate('/UserDetails'); // Redirect to dashboard page
    } catch (error) {
      setServerError(error.message); // Set server error message
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
          <p>{serverError}</p>
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
