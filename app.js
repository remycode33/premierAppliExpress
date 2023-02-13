const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

const app = express();


/////////// connexion MongoDB
mongoose.connect('mongodb+srv://remycode33:remycode33@cluster0.cgajaww.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());//permet de recupérer la requet ensuite (Express prendra toutes les req qui ont Content-type : application/json et met à dispo leur body dans l'obj req)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({ // new instance de Thing
      ...req.body  //opérateur spread
    });
    thing.save() // le modèle dispose d'une methode pour save sa Thing dans la data base
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

app.use('/api/stuff', (req, res, next) => {
Thing.find() // on récupère la liste complète des thing 
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;