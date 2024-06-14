const pool = require('../connexion-bd.js');// Importation de la connexion à la bd
// Fonction pour obtenir la liste des UE
const getUEs = (req, res) => {
    pool.query('SELECT * FROM UnitesEnseignement', (error, results) => {
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

module.exports = {
    getUEs,
    addUE,
};

