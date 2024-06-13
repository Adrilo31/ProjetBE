//Pour lancer le serveur :
// npm run dev

const express = require('express');
const app = express();
const port = 3000;

// Pour relier tous les fichiers de routes à index.js
const accueil = require('./accueil/routes-accueil');
const liste_etudiants = require('./liste-etudiants/routes-liste-etudiants');
const details_etudiants = require('./details-etudiant/routes-details-etudiant');
const liste_UE = require('./liste-UEs/routes-liste-UEs');
const details_UE = require('./details-UE/routes-details-UE');

// Pour utiliser ces fichiers
app.use("/", accueil, liste_etudiants, details_etudiants, liste_UE, details_UE);


app.listen(port, () => {
    console.log(`Serveur : http://localhost:${port}`);
});
