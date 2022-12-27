const express = require('express');
const mongoose = require('mongoose');

const app = express();

const authRoutes = require('./routes/auth');

app.get('/', (req, res) => {
  res.send('sea');
});

app.use('/api/users', authRoutes);

mongoose.connect('mongodb+srv://Sygn53:531798@cluster0.5eml2fo.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(3000, () => console.log('server run'));
  })
  .catch(err => console.log(err));

app.listen(3000, () => console.log('Server Starting'));
