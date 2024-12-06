import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import { addAppraisalForm } from '../redux/actions';
import Logout from './Logout';
import { jwtDecode } from 'jwt-decode';
import ViewAppraisalForms from './ViewAppraisalForms';

const Staff = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const questions = useSelector((state) => state.questions);
    const [selectedUser, setSelectedUser] = useState('');
    const [answers, setAnswers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [appraisalForms, setAppraisalForms] = useState([]);


    useEffect(() => {
        const fetchUsersAndQuestions = async () => {
            try {
                const usersResponse = await api.get('/users');
                const questionsResponse = await api.get('/questions');
                dispatch({ type: 'SET_USERS', payload: usersResponse.data });
                dispatch({ type: 'SET_QUESTIONS', payload: questionsResponse.data });

                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const currentUserResponse = await api.get(`/users/${decodedToken.id}`);
                setCurrentUser(currentUserResponse.data);
            } catch (error) {
                alert('Error fetching users and questions');
            }
        };
        fetchUsersAndQuestions();
    }, [dispatch]);

    useEffect(() => {
        const fetchAppraisalForms = async () => {
            if (selectedUser && currentUser && currentUser._id === users.find(user => user._id === selectedUser)?.supervisor) {
                try {
                    const response = await api.get(`/appraisalForms/user/${selectedUser}`);
                    setAppraisalForms(response.data);
                } catch (error) {
                    alert('Error fetching appraisal forms');
                }
            }
            else {
                setAppraisalForms([]);
            }
        };
        fetchAppraisalForms();
    }, [selectedUser, currentUser, users]);


    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const filledBy = decodedToken.id;

            const response = await api.post('/appraisalForms', { user: selectedUser, filledBy, answers });
            dispatch(addAppraisalForm(response.data));
            alert('Appraisal form submitted successfully');
        } catch (error) {
            alert('Error submitting appraisal form');
        }
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };


    const getUsersForAppraisal = () => {
        if (!currentUser) return [];

        const usersForAppraisal = [
            ...currentUser.juniors,
            ...currentUser.peers,
            currentUser._id
        ];

        users.forEach(user => {
            if (user.supervisor && user.supervisor.toString() === currentUser._id.toString()) {
                usersForAppraisal.push(user._id);
            }
            if (user.peers.includes(currentUser._id)) {
                usersForAppraisal.push(user._id);
            }
            if (user.juniors.includes(currentUser._id)) {
                usersForAppraisal.push(user._id);
            }

        });

        return users.filter(user => usersForAppraisal.includes(user._id));
    };

    return (
        <div>
            <h2>Staff Dashboard</h2>
            <Logout />
            <div>
                <h3>Select User</h3>
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Select User</option>
                    {getUsersForAppraisal().map((user) => (
                        <option key={user._id} value={user._id}>{user.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <h3>Appraisal Form</h3>
                {questions.map((question, index) => (
                    <div key={index}>
                        <label>{question.text}</label>
                        <input
                            type="text"
                            value={answers[index] || ''}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            style={{

                                padding: '10px',
                                fontSize: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                marginBottom: '10px',
                                backgroundColor: '#f1f1f1',
                            }}
                        />
                    </div>
                ))}
                <button onClick={handleSubmit}>Submit</button>
            </div>
            {appraisalForms.length > 0 && (
                <div>
                    <h3>Appraisal Forms for {users.find(user => user._id === selectedUser)?.name}</h3>
                    {appraisalForms.map((form, index) => (
                        <div key={index}>
                            <h4>Form by: {form.filledBy.name}</h4>
                            {form.answers.map((answer, idx) => (
                                <p key={idx}>{answer}</p>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Staff;