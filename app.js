const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express();
const port = 5000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev')) //Dependance morgan permettant d'afficher les logger dans la console. (Type de requete + URL + code de statut)
    .use(bodyParser.json())

sequelize.initDb()

//Ici, futur point de terminaisons
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);

//On ajoute la gestion des erreurs 404
app.use(({res}) => {
     const message = "Impossible de trouver la ressource demandée ! Essayez une autre URL.";
     res.status(404).json(message);
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))