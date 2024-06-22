const express = require('express');
const router = express.Router();
const bd = require('./bd-parcours');



// Route pour obtenir tous les parcours
router.get('/parcours', bd.getParcours);

// Route pour obtenir les parcours par mention
router.get('/mentions/:idMention/parcours', bd.getParcoursByMention);

// Route pour obtenir un parcours par ID
router.get('/parcours/:id', bd.getParcoursById);



// Route pour obtenir les étudiants par parcours
router.get('/parcours/:id/etudiants', bd.getEtudiantsByParcours);








module.exports = router;