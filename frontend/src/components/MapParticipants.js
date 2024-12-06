import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import FillAppraisalForm from './FillAppraisalForm';
import ViewAppraisalForms from './ViewAppraisalForms';

const MapParticipants = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const [selectedUser, setSelectedUser] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [peers, setPeers] = useState([]);
    const [juniors, setJuniors] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                dispatch({ type: 'SET_USERS', payload: response.data });
            } catch (error) {
                alert('Error fetching users');
            }
        };
        fetchUsers();
    }, [dispatch]);

    const handleMapParticipants = async () => {
        try {
            await api.put(`/users/${selectedUser}/map`, { supervisor, peers, juniors });
            alert('Participants mapped successfully');
            setSelectedUser('');
            setSupervisor('');
            setPeers([]);
            setJuniors([]);
        } catch (error) {
            alert('Error mapping participants');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            <div style={{ padding: '10px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
                <h2 style={{ textAlign: 'center', color: '#4CAF50' }}>Map Participants</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ marginBottom: '8px' }}>Select User</p>
                        <select
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <p style={{ marginBottom: '8px' }}>Select Supervisor</p>
                        <select
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                            value={supervisor}
                            onChange={(e) => setSupervisor(e.target.value)}
                        >
                            <option value="">Select Supervisor</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ marginBottom: '8px' }}>Select Peers</p>
                        <select
                            multiple
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '150px' }}
                            value={peers}
                            onChange={(e) => setPeers(Array.from(e.target.selectedOptions, (item) => item.value))}
                        >
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <p style={{ marginBottom: '8px' }}>Select Juniors</p>
                        <select
                            multiple
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '150px' }}
                            value={juniors}
                            onChange={(e) => setJuniors(Array.from(e.target.selectedOptions, (item) => item.value))}
                        >
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={handleMapParticipants}
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
                        Map Participants
                    </button>
                </div>
            </div>
            {selectedUser ?(
                <>
                    <FillAppraisalForm userId={selectedUser} />
                    <ViewAppraisalForms userId={selectedUser} />
                </>
            ) : <><div></div><div></div></>}
        </div>
    );
};

export default MapParticipants;