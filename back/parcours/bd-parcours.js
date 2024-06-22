const pool = require('../connexion-bd.js'); // Importation de la connexion à la bd


const getParcours = (req, res) => {
    pool.query('SELECT * FROM Parcours', (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des parcours:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des parcours' });
            return;
        }
        res.status(200).json(results);
    });
};


const getParcoursById = (req, res) => {
    const idParcours = req.params.id;
    pool.query('SELECT * FROM Parcours WHERE idPar = ?', [idParcours], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération du parcours par ID :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération du parcours par ID' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Parcours non trouvé' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

const getParcoursByMention = (req, res) => {
    const mentionId = req.params.idMention;
    pool.query('SELECT idPar, nomPar FROM Parcours WHERE mention_id = ?', [mentionId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des parcours par mention:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des parcours par mention' });
            return;
        }
        res.status(200).json(results);
    });
};


// Fonction pour obtenir les étudiants par parcours
const getEtudiantsByParcours = (req, res) => {
    const parcoursId = req.params.id;
    pool.query('SELECT * FROM Etudiants WHERE parcours_id = ?', [parcoursId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des étudiants par parcours:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des étudiants par parcours' });
            return;
        }
        res.status(200).json(results);
    });
};


module.exports = {
    getParcours,
    getParcoursByMention,
    getParcoursById,
    getEtudiantsByParcours,
};
