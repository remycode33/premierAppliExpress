const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');

const userRoutes = require('./routes/user');

const app = express();


/////////// connexion MongoDB
mongoose.connect('mongodb+srv://remycode33:remycode33@cluster0.cgajaww.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());// (eq à bodyparcer())permet de recupérer la requet ensuite (Express prendra toutes les req qui ont Content-type : application/json et met à dispo leur body dans l'obj req)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff', stuffRoutes)  // la logique des routes est importé ici
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;