const pool = require('../connexion-bd.js');// Importation de la connexion à la bd
// Fonction pour obtenir la liste des UE
const getUEs = (req, res) => {
    pool.query('SELECT code, nomUE, M.nomMen AS mention, ouverture, credits FROM UnitesEnseignement AS UE JOIN Mentions AS M ON UE.mention_id = M.idMen', (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

// Fonction pour ajouter une UE
const addUE = (req, res) => {
    const { code, nomUE, mention_id, ouverture, credits } = req.body;
    pool.query('INSERT INTO UnitesEnseignement (code, nomUE, mention_id, ouverture, credits) VALUES (?, ?, ?, ?, ?)', [code, nomUE, mention_id, ouverture, credits], (error, results) => {
        if (error) throw error;
        res.status(201).json({ message: 'UE ajoutée avec succès', id: results.insertId });
    });
};

const getUesByMention = (req, res) => {
    const idMention = req.params.idMention;
    pool.query('SELECT code, nomUE, M.nomMen AS mention, ouverture, credits FROM UnitesEnseignement AS UE JOIN Mentions AS M ON UE.mention_id = M.idMen and mention_id = ?', [idMention], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des UE par mention:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des UE par mention', error: error.message });
            return;
        }
        res.status(200).json(results);
    });
};

module.exports = {
    getUEs,
    addUE,
    getUesByMention,
};

