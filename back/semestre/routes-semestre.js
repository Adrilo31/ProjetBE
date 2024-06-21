const express = require('express');
const router= express.Router()
const pool = require('../connexion-bd.js');

// Route pour obtenir le semestre en cours
router.get("/api/semestre/actuel",(req,res)=>{
    const sql = `select idSem, CONCAT(annee_debut, ' - ', annee_fin) annee, nomSem, en_cours
                        from semestres inner join annee on semestres.annee_id = annee.idAnn
                        where en_cours;`;
    pool.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

// Route pour obtenir le semestre suivant
router.get("/api/semestre/suivant",(req,res)=>{
    const sql = `select IFNULL(idSem, 'erreur') idSem, IFNULL(CONCAT(annee_debut, ' - ', annee_fin), 'erreur') annee, 
                        IFNULL(nomSem, 'erreur') nomSem, IFNULL(en_cours, 'erreur') en_cours
                        from (select idSem+1 idSemSuiv from semestres where en_cours) semestreSuivant
                        left join semestres on semestres.idSem = semestreSuivant.idSemSuiv
                        left join annee on semestres.annee_id = annee.idAnn;`;
    pool.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

// Route pour obtenir le nombre d'étudiant qui n'ont pas validé par UE
router.get("/api/semestre/pas-valide",(req,res)=>{
    const sql = `select ue_code, nomUE, count(etudiant_id) nb_non_valide
                        from semestres inner join suivre on semestres.idSem = suivre.semestre_id
                        inner join unitesenseignement on suivre.ue_code = unitesenseignement.code
                        where en_cours
                        and !valide
                        group by ue_code;`;
    pool.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

// Route pour passer au semestre suivant
router.put("/api/semestre/changer",(req,res)=>{
    const { semestreActuel, semestreSuivant } = req.body;
    const sql = `update semestres
                        set en_cours = case
                            when idSem = ? then false
                            when idSem = ? then true
                            else en_cours
                        end
                        where idSem in (?, ?);`;
    pool.query(sql, [semestreActuel, semestreSuivant, semestreSuivant, semestreActuel], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});


module.exports = router;
