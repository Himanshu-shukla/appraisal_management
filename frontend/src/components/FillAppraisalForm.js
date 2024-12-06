import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';

const FillAppraisalForm = ({ userId }) => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get('/questions');
                dispatch({ type: 'SET_QUESTIONS', payload: response.data });
            } catch (error) {
                alert('Error fetching questions');
            }
        };
        fetchQuestions();
    }, [dispatch]);

    const handleSubmit = async () => {
        try {
            await api.post('/appraisalForms', { user: userId, answers });
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

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Fill Appraisal Form</h2>

            {questions.map((question, index) => (
                <div
                    key={index}
                    style={{
                        marginBottom: '20px',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                    }}
                >
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '10px',
                            fontSize: '16px',
                            color: '#555',
                        }}
                    >
                        {question.text}
                    </label>
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

            <button
                onClick={handleSubmit}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    color: '#fff',
                    backgroundColor: '#4CAF50',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px',
                    display: 'block',
                    width: '100%',
                }}
            >
                Submit
            </button>
        </div>
    );

};

export default FillAppraisalForm;