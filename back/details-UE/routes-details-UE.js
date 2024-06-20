const express = require('express');
const router = express.Router();
const {
    getUeActuelle,
    getUePassee,
    getUeDisponible,
    updateEtudiant,
    deleteEtudiant
} = require('./bd-details-etudiant');

router.get('/api/ueactuelle/:idEtu', (req, res) => {
    const idEtu = req.params.idEtu;
    getUeActuelle(idEtu)
        .then(results => res.json(results))
        .catch(err => res.status(500).json({ error: 'Erreur lors de la requête', details: err }));
});

router.get('/api/uepassee/:idEtu', (req, res) => {
    const idEtu = req.params.idEtu;
    getUePassee(idEtu)
        .then(results => res.json(results))
        .catch(err => res.status(500).json({ error: 'Erreur lors de la requête', details: err }));
});

router.get('/api/uedisponible/:idEtu', (req, res) => {
    const idEtu = req.params.idEtu;
    getUeDisponible(idEtu)
        .then(results => res.json(results))
        .catch(err => res.status(500).json({ error: 'Erreur lors de la requête', details: err }));
});

router.put('/api/etudiants/:id', (req, res) => {
    const idEtu = req.params.id;
    const { attribut, valeur } = req.body;
    updateEtudiant(idEtu, attribut, valeur)
        .then(results => res.json({ message: 'Étudiant mis à jour avec succès', results }))
        .catch(err => res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'étudiant', details: err }));
});

router.delete('/api/etudiants/:id', (req, res) => {
    const idEtu = req.params.id;
    deleteEtudiant(idEtu)
        .then(results => res.json({ message: 'Étudiant supprimé avec succès', results }))
        .catch(err => res.status(500).json({ error: 'Erreur lors de la suppression de l\'étudiant', details: err }));
});

module.exports = router;
