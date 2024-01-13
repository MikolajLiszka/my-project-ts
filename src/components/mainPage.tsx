import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/login';
import { User } from '../models/User';
import ProfilePic from '../photos/user.png'

const MainPage = () => {
    const { user } = useContext(AuthContext) as { user: User | null }; 
  
    return (
      <div>
        <h1>Main Page</h1>
        <div>
          {user ? (
            <div>
              <h2>{user.name}</h2>
              <Link to="/profile"><img src={ProfilePic} alt="" /></Link>
              <Link to="/login" className="btn btn-primary">
                Logout
              </Link>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    );
  }
  
  export default MainPage;
