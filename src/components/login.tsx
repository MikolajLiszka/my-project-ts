import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <div className="mb-3">
          <form onSubmit={handleLogin}>
            <label className="form-label">
              Email:
              <input type="text" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <button type="submit" className="btn btn-primary">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
      </div>
    </div>
  );
};

export default Login;



