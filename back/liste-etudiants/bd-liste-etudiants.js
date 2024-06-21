const pool = require('../connexion-bd.js');// Importation de la connexion à la bd

// code pour afficher tous les étudiants
const getEtudiants = (req, res) => {
    const sql = `
        SELECT E.IdEtu, E.prenomEtu, E.nomEtu, P.nomPar AS parcours, E.diplome
        FROM Etudiants E
        JOIN Parcours P ON E.parcours_id = P.idPar
    `;

    pool.query(sql, (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête : ', error);
            return res.status(500).json({ error: 'Erreur lors de la requête' });
        }
        res.status(200).json(results); // Envoie les résultats en réponse
    });
};

//code pour ajouter un étudiant
const addEtudiant = (req, res) => {
    const { prenomEtu, nomEtu, parcours_id, diplome } = req.body;
    pool.query('INSERT INTO Etudiants (prenomEtu, nomEtu, parcours_id, diplome) VALUES (?, ?, ?, ?)', [prenomEtu, nomEtu, parcours_id, diplome], (error, results) => {
        if (error) throw error;
        res.status(201).json({ message: 'Etudiant ajouté avec succès', id: results.insertId });
    });
};

module.exports = {
    getEtudiants,
    addEtudiant,
};