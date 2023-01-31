const express = require('express');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
require('dotenv').config('./env');
require('./config/db');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use('/api/project', projectRoutes);
app.use('/api/task', taskRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})