import { Link } from 'react-router-dom';
import classes from './Login.module.css';

const Login = () => {
  return (
    <div className={classes.login}>
      <h1>Login</h1>
      <form>
        <label>Email</label>
        <input type="email" placeholder="" />
        <label>Password</label>
        <input type="password" placeholder="" />
      </form>
      <p>
        Not have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
