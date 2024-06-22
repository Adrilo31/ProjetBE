const pool = require('../connexion-bd.js'); // Importation de la connexion à la bd

// Fonction pour obtenir la liste des mentions
const getMentions = (req, res) => {
    pool.query('SELECT idMen, nomMen FROM Mentions', (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des mentions:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des mentions' });
            return;
        }
        res.status(200).json(results);
    });
};

const getMentionById = (req, res) => {
    const { id: mentionId } = req.params; // Récupère l'ID de la mention depuis les paramètres de l'URL
    pool.query('SELECT idMen, nomMen FROM Mentions WHERE idMen = ?', [mentionId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération de la mention par ID:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération de la mention par ID' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Mention non trouvée' });
            return;
        }
        res.status(200).json(results[0]);
    });
};

module.exports = {
    getMentions,
    getMentionById,
};
