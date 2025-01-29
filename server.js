const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const documentsRouter = require('./routes/documents');

dotenv.config();

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Route pour la racine
app.get('/', (req, res) => {
  res.send('Bienvenue à la médiathèque');
});

app.use('/documents', documentsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));