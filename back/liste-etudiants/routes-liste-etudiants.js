/*const express = require('express');
const router= express.Router()

router.get("/",(req,res)=>{
    res.send("test liste etudiants")
});


module.exports = router;
*/
const express = require('express');// Importation du module Express
const router = express.Router();// Création d'un routeur Express
// Importation du module de gestion de la base de données pour les étudiant
const bd = require('./bd-liste-etudiants');


// Route pour obtenir la liste des étudiants
router.get('/etudiants', bd.getEtudiants);
// Route pour ajouter un étudiant
router.post('/etudiants', bd.addEtudiant);


// Route pour obtenir un étudiant par ID
router.get('/etudiants/:id', bd.getEtudiantById);


// Exportation du routeur pour l'utiliser dans index.js
module.exports = router;