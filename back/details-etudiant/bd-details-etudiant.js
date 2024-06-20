const { db } = require('../connexion-bd');

function getUeActuelle(idEtu) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT UE.nomUE 
            FROM UnitesEnseignement AS UE
            JOIN Suivre AS S ON S.ue_code = UE.code
            WHERE S.valide = false
            AND S.etudiant_id = ?
        `;
        db.query(sql, [idEtu], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

function getUePassee(idEtu) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT nomUE 
            FROM UnitesEnseignement AS UE
            JOIN Suivre AS S ON S.ue_code = UE.code
            WHERE S.etudiant_id = ? AND S.valide = true
        `;
        db.query(sql, [idEtu], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

function getUeDisponible(idEtu) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT UE.nomUE
            FROM UnitesEnseignement AS UE
            JOIN EtrePrerequis AS EP ON UE.code = EP.ue_visee_code
            JOIN Suivre AS S ON EP.ue_prerequise_code = S.ue_code
            WHERE S.etudiant_id = ? AND S.valide = true;
        `;
        db.query(sql, [idEtu], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

function updateEtudiant(idEtu, attribut, valeur) {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE Etudiants
            SET ${attribut} = ?
            WHERE IdEtu = ?
        `;
        db.query(sql, [valeur, idEtu], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

function deleteEtudiant(idEtu) {
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM Etudiants
            WHERE IdEtu = ?
        `;
        db.query(sql, [idEtu], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

module.exports = {
    getUeActuelle,
    getUePassee,
    getUeDisponible,
    updateEtudiant,
    deleteEtudiant
};
