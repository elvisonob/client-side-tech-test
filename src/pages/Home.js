import { Link } from 'react-router-dom';
import classes from './Home.module.css';

const Home = () => {
  return (
    <div className={classes.body}>
      <div className={classes.homepage}>
        <div className={classes.subhomepage}>
          <h4>
            Welcome to the British exclusive club of IT Enthusiast.
            <br />
            <br />
            Register to become a member today.
          </h4>
          <nav>
            <ul>
              <Link to="/register" className={classes.Link}>
                <li>Register</li>
              </Link>
              <Link to="/login" className={classes.Link}>
                <li>Login</li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
