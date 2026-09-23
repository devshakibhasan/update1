require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
let mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/taskflow';

mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 })
  .then(() => console.log('Connected to Local MongoDB'))
  .catch(err => {
    console.log('Local MongoDB not found. Running in TEMPORARY IN-MEMORY ARRAY mode for instant testing.');
    process.env.USE_ARRAY_FALLBACK = "true";
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
