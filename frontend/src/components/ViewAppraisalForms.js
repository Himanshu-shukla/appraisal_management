import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../api';

const ViewAppraisalForms = ({ userId }) => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await api.get(`/appraisalForms/user/${userId}`);
        setForms(response.data);
      } catch (error) {
        alert('Error fetching appraisal forms');
      }
    };
    fetchForms();
  }, [userId]);

  return (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
    <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>View Appraisal Forms</h2>
    {forms.map((form, index) => (
      <div
        key={index}
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#fff',
        }}
      >
        <h3 style={{ color: '#555', marginBottom: '10px' }}>
          Form by: <span style={{ fontWeight: 'bold' }}>{form.filledBy.name}</span>
        </h3>
        <div style={{ marginTop: '10px' }}>
          {form.answers.map((answer, idx) => (
            <p key={idx} style={{ fontSize: '16px', lineHeight: '1.5', color: '#333' }}>
              {answer}
            </p>
          ))}
        </div>
      </div>
    ))}
  </div>
);

};

export default ViewAppraisalForms;