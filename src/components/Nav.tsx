import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./login";
import "../styles/container.css";

const Nav = () => {
  const { user } = useContext(AuthContext) || { user: null };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await fetch("https://jsonplaceholder.typicode.com/users");
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);
  

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home Page
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/albums" className="nav-link">
              Albums
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/posts" className="nav-link">
              Posts
            </Link>
          </li>

          {user ? (
            <div className="rightContainer">
              <li>
                <Link to="/profile">
                  <p className="userName">{user.name}</p>
                </Link>
              </li>
              <li className="logout">
                <Link to="/login" className="btn btn-primary ogoutA">
                  Logout
                </Link>
              </li>
            </div>
          ) : (
            <li>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
