import React from 'react';
import { Link } from 'react-router-dom';


const MainPage = () => {
    return (
        <div>
            <h1>Main Page</h1>
            <div>
                <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
        </div>
    )
}

export default MainPage;

