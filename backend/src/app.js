const express = require('express');
const cors = require('cors');
const syncRoutes = require('./routes/sync.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
  });
});

app.use('/api/sync', syncRoutes);

module.exports = app;
