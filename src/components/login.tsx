import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../models/User';
import { Link } from 'react-router-dom';
import "../styles/container.css"

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});


const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
        params: {
          email,
        },
      });

      const matchedUser = response.data.find((user: any) => user.email === email);

      if (matchedUser) {
        console.log('Login successful:', matchedUser);
        setError(null);
        setUser(matchedUser); 
        navigate('/');
      } else {
        setError('User with the provided email not found');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Error during login');
    }
  };

  

  return (
    <div className="container mt-5 bg-light login">
      <h2 className="mb-4 loginText">Login</h2>
      <div className="mb-3">
        <form className='loginForm' onSubmit={handleLogin}>
          <label className="form-label">
            Email:
            <input type="text" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <div className="d-flex justify-content-center align-items-center btnCss">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <Link to="/">
              <button className="btn btn-primary btn-danger">
                Back
              </button>
            </Link>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

