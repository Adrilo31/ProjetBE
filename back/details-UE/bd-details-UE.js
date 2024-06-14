
// Requête pour récupérer :
// - Des infos sur l'UE :
// * nom,
// * mention associée,
// * taux de réussite
// - La liste des étudiants liés à l'UE et leurs infos :
// * numéro étudiant,
// * prénom,
// * nom,
// * année universitaire,
// * semestre,
// * si validé ou non
function getDetailsUE() {
    return `
        with infosUE as (
            select code, nomUE, nomMen, sum(suivre.valide)/count(suivre.etudiant_id) taux
            from unitesenseignement inner join mentions on unitesenseignement.mention_id = mentions.idMen
            inner join suivre on unitesenseignement.code = suivre.ue_code
            where code = ?
            group by code)
        select infosUE.code, infosUE.nomUE, infosUE.nomMen, infosUE.taux, 
        IdEtu, prenomEtu, nomEtu, concat(annee_debut, ' - ', annee_fin) annee, nomSem, valide 
        from etudiants inner join suivre on etudiants.IdEtu = suivre.etudiant_id
        inner join unitesenseignement on suivre.ue_code = unitesenseignement.code
        inner join semestres on suivre.semestre_id = semestres.idSem
        inner join annee on semestres.annee_id = annee.idAnn
        inner join mentions on unitesenseignement.mention_id = mentions.idMen
        inner join infosUE on unitesenseignement.code = infosUE.code
        where ue_code = ?
        order by nomEtu, prenomEtu ASC;
    `
}


module.exports = { getDetailsUE };
