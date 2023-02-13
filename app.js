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

//requete POST
// on supprime le champs id car il est cré direct par MongoDB
// new instance de Thing
// Utilisation de la methode: .save() pour save la Thing dans la data base
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id; 
    const thing = new Thing({ 
      ...req.body  //opérateur spread pour copier les élément de l'obj req.body (et donc evite d'avoir a rerenseigner le champs et la valeur : title : req.body.title)
    });
    thing.save() 
      .then(() => res.status(201).json({ message: 'Objet enregistré !'})) // on renvoie une response à la frontend pour eviter l'expiration de la req
      .catch(error => res.status(400).json({ error }))
    });


// requete PUT
// utilisation de la methode: .updateOne() pour recupérer l'obj avec l'ID correspondant à la requete
app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) 
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
});


//requete GET avec URL dynamique: ':id'
//Utilisation de la methode: .findOne() pour chercher UN SEUL OBJ
app.get('/api/stuff/:id' , (req,res, next) => {
    Thing.findOne( {_id: req.params.id} )
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json( { error }))
}); 

// Utilisation de la methode: .find() pour récupère la liste complète des thing 
app.use('/api/stuff', (req, res, next) => {
Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error })); //raccourci de {error :error}
});

module.exports = app;