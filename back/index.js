//Pour lancer le serveur :
// npm run dev

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())

// Pour relier tous les fichiers de routes à index.js
const accueil = require('./accueil/routes-accueil');
const liste_etudiants = require('./liste-etudiants/routes-liste-etudiants');
const details_etudiants = require('./details-etudiant/routes-details-etudiant');
const liste_UE = require('./liste-UEs/routes-liste-UEs');
const details_UE = require('./details-UE/routes-details-UE');
const semestre = require('./semestre/routes-semestre');

// Pour utiliser ces fichiers
app.use("/", accueil, liste_etudiants, details_etudiants, liste_UE, details_UE, semestre);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
