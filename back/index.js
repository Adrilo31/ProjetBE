//Pour lancer le serveur :
// npm run dev

const express = require('express');
const app = express();
const port = 3000;


const accueil = require('./accueil/routes-accueil');
const liste_etudiants = require('./liste-etudiants/routes-liste-etudiants');
const details_etudiants = require('./details-etudiant/routes-details-etudiant');
const liste_UE = require('./liste-UEs/routes-liste-UEs');
const details_UE = require('./details-UE/routes-details-UE');

app.use("/", accueil);
app.use("/etudiants", liste_etudiants);
app.use("/etudiants/:id", details_etudiants);
app.use("/ue", liste_UE);
app.use("/ue/:id", details_UE);


app.listen(port, () => {
    console.log(`Serveur : http://localhost:${port}`);
});
const pool = require('./connexion-bd');




