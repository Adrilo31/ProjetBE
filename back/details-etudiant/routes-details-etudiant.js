const express = require('express');
const router= express.Router()

const pool = require('../connexion-bd.js'); // C'est celui la le bon
const port = 3000;
router.get('/ueactuelle/:idEtu', (req, res) => {
    const idEtu = req.params.idEtu;
    const sql = `
        SELECT UE.code, UE.nomUE, M.nomMen AS mention, UE.credits
        FROM UnitesEnseignement AS UE
        JOIN Suivre AS S ON S.ue_code = UE.code
        JOIN Mentions AS M ON UE.mention_id = M.idMen
        WHERE S.valide = false
        AND S.etudiant_id = ?
    `;

    pool.query(sql, [idEtu], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête : ', error);
            return res.status(500).json({ error: 'Erreur lors de la requête' });
        }
        res.json(results);
    });
});


router.get('/uepassee/:idEtu', (req, res) => {
    const idEtu = req.params.idEtu;
    const sql = `
        SELECT UE.code, UE.nomUE, M.nomMen AS mention, UE.credits
        FROM UnitesEnseignement AS UE
        JOIN Suivre AS S ON S.ue_code = UE.code
        JOIN Mentions AS M ON UE.mention_id = M.idMen
        WHERE S.valide = true
        AND S.etudiant_id = ?
    `;

    pool.query(sql, [idEtu], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête : ', error);
            return res.status(500).json({ error: 'Erreur lors de la requête' });
        }
        res.json(results);
    });
});


router.get('/uedisponible/:idEtu', (req, res) => {
    const idEtu = req.params.idEtu;
    const sql = `
        SELECT UE.code, UE.nomUE, M.nomMen AS mention, UE.credits
        FROM UnitesEnseignement AS UE
        JOIN Parcours AS P ON UE.mention_id = P.mention_id
        JOIN Etudiants AS E ON E.parcours_id = P.idPar
        JOIN Semestres AS Sem ON Sem.annee_id = E.annee_id AND Sem.en_cours = true
        JOIN Mentions AS M ON UE.mention_id = M.idMen
        WHERE E.idEtu = ? 
        AND UE.code NOT IN (
            SELECT ue_code
            FROM Suivre
            WHERE etudiant_id = ?
        )
        UNION
        SELECT UE1.nomUE AS prerequis
        FROM UnitesEnseignement AS UE
        JOIN EtrePrerequis AS EP ON UE.code = EP.ue_prerequise_code
        JOIN UnitesEnseignement AS UE1 ON EP.ue_visee_code = UE1.code
        JOIN Suivre AS S ON S.ue_code = UE.code
        JOIN Mentions AS M ON UE1.mention_id = M.idMen
        WHERE S.etudiant_id = ? 
        AND S.valide = true;
    `;

    pool.query(sql, [idEtu, idEtu, idEtu], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête : ', error);

            console.error('Détails de l erreur : ', error.message);
            return res.status(500).json({ error: 'Erreur lors de la requête' });
        }
        res.json(results);
    });
});


router.put('etudiants/:id', (req, res) => {
    const idEtu = req.params.id;
    const { attribut, valeur } = req.body; // Supposons que vous envoyez un objet { attribut: 'prenomEtu', valeur: 'Nouveau prénom' }


    const sql = `
        UPDATE Etudiants
        SET ${attribut} = ?
        WHERE IdEtu = ?
    `;


    pool.query(sql, [valeur, idEtu], (error, results) => {
        if (error) {
            console.error('Erreur lors de la mise à jour : ', error);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'étudiant' });
        }
        res.json({ message: 'Étudiant mis à jour avec succès' });
    });
});
router.delete('etudiants/:id', (req, res) => {
    const idEtu = req.params.id;


    const sql = `
        DELETE FROM Etudiants
        WHERE IdEtu = ?
    `;


    pool.query(sql, [idEtu], (error, results) => {
        if (error) {
            console.error('Erreur lors de la suppression : ', error);
            return res.status(500).json({ error: 'Erreur lors de la suppression de l\'étudiant' });
        }
        res.json({ message: 'Étudiant supprimé avec succès' });
    });
});
module.exports = router;