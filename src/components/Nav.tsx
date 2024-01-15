import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
            <Link to="/">Home Page</Link>
        </li>
        <li>
          <Link to="/albums">Albums</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;