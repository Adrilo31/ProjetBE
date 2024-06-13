const express = require('express');
//const pool = require('./connexion-bd'); // Assure-toi que c'est le bon chemin pour ton fichier de connexion à la BD
const pool = require('../connexion-bd.js'); // C'est celui la le bon
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.get('/api/ueactuelle/:idEtu', (req, res) => {
    const idEtu = req.params.idEtu;
    const sql = `
        SELECT nomUE 
        FROM UnitesEnseignement AS UE
        JOIN Suivre AS S ON S.ue_code = UE.code
        JOIN Etudiants AS E ON S.etudiant_id = E.idEtu
        WHERE E.idEtu = ? AND S.valide = false
    `;

    pool.query(sql, [idEtu], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête : ', error);
            return res.status(500).json({ error: 'Erreur lors de la requête' });
        }
        res.json(results);
    });
});


app.get('/api/uepassee/:idEtu', (req, res) => {
    const idEtu = req.params.idEtu;
    const sql = `
        SELECT nomUE 
        FROM UnitesEnseignement AS UE
        JOIN Suivre AS S ON S.ue_code = UE.code
        JOIN Etudiants AS E ON S.etudiant_id = E.idEtu
        WHERE E.idEtu = ? AND S.valide = true
    `;

    pool.query(sql, [idEtu], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête : ', error);
            return res.status(500).json({ error: 'Erreur lors de la requête' });
        }
        res.json(results);
    });
});


app.get('/api/uedisponible/:idEtu', (req, res) => {
    const idEtu = req.params.idEtu;
    const sql = `
        A FAIRE
    `;

    pool.query(sql, [idEtu, idEtu], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête : ', error);
            return res.status(500).json({ error: 'Erreur lors de la requête' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Serveur à l'écoute sur le port ${port}`);
});
