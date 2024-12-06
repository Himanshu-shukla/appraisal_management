import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('staff');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);

            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;
            dispatch({ type: 'SET_ROLE', payload: role });


            if (role === 'admin') {
                navigate('/admin');
            } else if (role === 'staff') {
                navigate('/staff');
            } else {
                alert('Unknown role');
            }
        } catch (error) {
            alert('Login failed');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/auth/register', { name, email, password, role });
            alert('Registration successful');
            setIsRegistering(true);
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h2>{!isRegistering ? 'Register' : 'Login'}</h2>
            {!isRegistering ? (
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                    </select>
                    <button onClick={handleRegister}>Register</button>
                    <button onClick={() => setIsRegistering(true)}>Back to Login</button>
                </div>
            ) : (
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={() => setIsRegistering(false)}>Register</button>
                </div>
            )}
        </div>
    );
};

export default Login;