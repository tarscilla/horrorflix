require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const videoRoutes = require('./routes/videoRoutes');
const userRoutes = require('./routes/userRoutes');
const StreamingController = require('./controllers/streaming');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.error('Erro ao conectar o MongoDB:', err));

app.use('/videos', videoRoutes);
app.use('/users', userRoutes);

app.post('/views', StreamingController.registerView);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server on: http://localhost:${PORT}`);
});