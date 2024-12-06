import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

    return (
        <div style={{position:"relative", top:"10px", left:"20px"}}>
            <button
                onClick={handleLogout}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#f44336',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Logout
            </button>
        </div>
    )
}

export default Logout;
