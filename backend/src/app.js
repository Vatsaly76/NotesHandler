const express = require('express');
const authRoutes = require('./routes/auth.routes');
const notesRoutes = require('./routes/notes.routes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

module.exports = app;