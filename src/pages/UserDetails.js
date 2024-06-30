import React, { useEffect, useState } from 'react';
import MainNavigation2 from '../components/MainNavigation2.js';
import classes from './UserDetails.module.css';

const UserDetails = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/user');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <MainNavigation2 />
      <div className={classes.heading}>User Details</div>
      <div className={classes.text}>
        Congratulations, you have been logged in and you have made it to the
        list and page of Dedicated IT Enthusiast and you can see your name and
        email and also see other members
      </div>
      {userData ? (
        userData.users.map((user) => (
          <div key={user.id} className={classes.userDetails}>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
          </div>
        ))
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDetails;
