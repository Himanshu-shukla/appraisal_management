const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const appraisalFormRoutes = require('./routes/appraisalFormRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://crazyphoton150hs:C00!buddy@cluster0.4mq6pjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error(err));
 
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/appraisalForms', appraisalFormRoutes);
app.use('/auth', authRoutes);


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});  