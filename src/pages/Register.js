import { Link } from 'react-router-dom';
import classes from './Register.module.css';
import { useState, useRef } from 'react';

const Register = () => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmedPassword] = useState('');
  const [error, setError] = useState(false);
  const [serverUpdate, setServerUpdate] = useState(null);

  const onEnteredName = (e) => {
    setEnteredName(e.target.value);
  };

  const onEnteredEmail = (e) => {
    setEnteredEmail(e.target.value);
  };

  const onEnteredPassword = (e) => {
    setEnteredPassword(e.target.value);
  };

  const onEnteredConfirmPassword = (e) => {
    setEnteredConfirmedPassword(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //validate for name, email

    const emailIsValid =
      enteredEmail.includes('@') && enteredEmail.includes('.');
    if (enteredName.trim() === '' || !emailIsValid) {
      return setError(true);
    }

    const passwordIsValid = enteredPassword.length >= 5;
    const confirmPasswordIsValid = enteredConfirmPassword.length >= 5;

    if (
      !passwordIsValid ||
      !confirmPasswordIsValid ||
      enteredPassword !== enteredConfirmPassword
    ) {
      return setError(true);
    }
    console.log(enteredName, enteredEmail, enteredPassword);

    setEnteredName('');
    setEnteredEmail('');
    setEnteredPassword('');
    setEnteredConfirmedPassword('');
    setError(false);

    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register');
      }

      // Handle successful registration (e.g., redirect to another page)
      setServerUpdate('Registration Successful, proceed to login now');
    } catch (error) {
      setServerUpdate(error.message); // Set server error message
    }
  };

  return (
    <div className={classes.signUp}>
      <h1>Register</h1>
      <form onSubmit={onSubmitHandler}>
        <label>User-Name</label>
        <input
          id="text"
          name="text"
          type="text"
          onChange={onEnteredName}
          value={enteredName}
        />
        <label>Email</label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={onEnteredEmail}
          value={enteredEmail}
        />
        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={onEnteredPassword}
          value={enteredPassword}
        />
        <label>Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={onEnteredConfirmPassword}
          value={enteredConfirmPassword}
        />
        <div className={classes.validationControl}>
          {error && (
            <p>
              Please ensure you have the right inputs and also that the password
              matches and it is above 5 characters
            </p>
          )}
          <div className={classes.validationControl2}>{serverUpdate}</div>
        </div>

        <button>Submit</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
