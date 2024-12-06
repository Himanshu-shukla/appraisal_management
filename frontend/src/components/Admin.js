import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, addQuestion } from '../redux/actions';
import api from '../api';
import MapParticipants from './MapParticipants';
import Logout from './Logout'


const Admin = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({ name: '', email: '', password: '', role: 'staff' });
    const [question, setQuestion] = useState('');
    const [selectedUser, setSelectedUser] = useState('');


    const handleAddUser = async () => {
        try {
            const response = await api.post('/users', user);
            dispatch(addUser(response.data));
            setUser({ name: '', email: '', password: '', role: 'staff' });
            alert('User created');
        } catch (error) {
            alert('Error creating user');
        }
    };

    const handleAddQuestion = async () => {
        try {
            await api.post('/questions', { text: question });
            dispatch(addQuestion({ text: question }));
            setQuestion('');
            alert('Question created');
        } catch (error) {
            alert('Error creating question');
        }
    };

    return (
        <>
            <Logout />
            <h2 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '20px' }}>Admin Dashboard</h2>
            <div style={{ display: 'flex', direction: 'row', justifyContent: 'space-around', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>

                <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ color: '#3F51B5', marginBottom: '15px' }}>Add User</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <select
                            value={user.role}
                            onChange={(e) => setUser({ ...user, role: e.target.value })}
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        >
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                        </select>
                        <button
                            onClick={handleAddUser}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            Add User
                        </button>
                    </div>
                </div>

                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ color: '#3F51B5', marginBottom: '15px' }}>Add Question</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <button
                            onClick={handleAddQuestion}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            Add Question
                        </button>
                    </div>

                </div>
            </div>
            <MapParticipants />
        </>

    );
};

export default Admin;