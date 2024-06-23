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


// Route pour supprimer un étudiant
router.delete('/etudiants/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM Etudiants WHERE IdEtu = ?', [id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la suppression de l\'étudiant:', error);
            return res.status(500).json({ error: 'Erreur lors de la suppression de l\'étudiant' });
        }
        res.json({ message: 'Étudiant supprimé avec succès' });
    });
});


// Exportation du routeur pour l'utiliser dans index.js
module.exports = router;