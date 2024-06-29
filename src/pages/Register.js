import { Link } from 'react-router-dom';
import classes from './Register.module.css';

const Register = () => {
  return (
    <div className={classes.signUp}>
      <h1>Register</h1>
      <form>
        <label>User-Name</label>
        <input type="text" placeholder="" />
        <label>Email</label>
        <input type="email" placeholder="" />
        <label>Password</label>
        <input type="password" placeholder="" />
        <label>Confirm Password</label>
        <input type="password" placeholder="" />
        <button>Submit</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
