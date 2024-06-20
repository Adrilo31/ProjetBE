// Requête pour récupérer des infos sur l'UE :
// * code, nom,
// * mention associée,
// * taux de réussite
function getDetailsUE() {
    return `
        select code, nomUE, nomMen, sum(suivre.valide)/count(suivre.etudiant_id) taux
        from unitesenseignement inner join mentions on unitesenseignement.mention_id = mentions.idMen
        inner join suivre on unitesenseignement.code = suivre.ue_code
        inner join semestres on suivre.semestre_id = semestres.idSem
        where code = ?
        group by code;
    `
}

// Requête pour récupérer la liste des étudiants inscrits à l'UE :
// * numéro étudiant,
// * prénom, nom,
// * année universitaire,
// * semestre, si en cours,
// * si validé ou non,
function getListeInscritsUE() {
    return `
        select IdEtu, prenomEtu, nomEtu, CONCAT(annee_debut, ' - ', annee_fin) annee, nomSem, valide, en_cours 
        from etudiants inner join suivre on etudiants.IdEtu = suivre.etudiant_id
        inner join unitesenseignement on suivre.ue_code = unitesenseignement.code
        inner join semestres on suivre.semestre_id = semestres.idSem
        inner join annee on semestres.annee_id = annee.idAnn
        inner join mentions on unitesenseignement.mention_id = mentions.idMen
        where ue_code = ?
        order by nomEtu, prenomEtu ASC;
    `
}


// Requête pour récupérer la liste des étudiants inscrits à l'UE pour le semestre en cours :
// * numéro étudiant,
// * prénom, nom,
// * si validé ou non,
// * numéro du semestre
function getListeEtuEnCours() {
    return `
        select IdEtu, prenomEtu, nomEtu, valide, semestre_id
        from etudiants inner join suivre on etudiants.IdEtu = suivre.etudiant_id
        inner join semestres on suivre.semestre_id = semestres.idSem
        where ue_code = ?
        and en_cours
        order by nomEtu, prenomEtu ASC;
    `
}


// Requête pour récupérer :
// - La liste des étudiants pouvant s'inscrire à l'UE (et qui ne l'ont pas déjà validée) :
// * numéro étudiant,
// * prénom, nom
function getListeInscrire() {
    return `
        select distinct IdEtu, prenomEtu, nomEtu
        from etudiants
        where IdEtu not in (select etudiant_id from suivre
                            where ue_code = ? and valide = true)
        and (select count(*) from etreprerequis
        left join suivre on etreprerequis.ue_prerequise_code = suivre.ue_code and suivre.etudiant_id = etudiants.IdEtu and valide = true
        where ue_visee_code = ? and etudiant_id is null) = 0;
    `
}



const { db } = require('../connexion-bd');

const validerUE = (etudiantId, ueId) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE etudiants_ue SET etat = "validé" WHERE etudiant_id = ? AND ue_id = ?';
        db.query(query, [etudiantId, ueId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    validerUE,
};


module.exports = { getDetailsUE, getListeInscritsUE, getListeEtuEnCours, getListeInscrire};
