const express = require('express');
const router= express.Router()
const pool = require('../connexion-bd.js');
const { getDetailsUE, getListeInscritsUE, getListeEtuEnCours, getListeInscrire } = require("./bd-details-UE");

// Route pour obtenir les détails d'une UE
router.get("/api/ue/:idUE",(req,res)=>{
    const codeUE = req.params.idUE;
    const sql = getDetailsUE();
    pool.query(sql, [codeUE], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

// Route pour obtenir la liste des étudiants inscrits à l'UE
router.get("/api/ue/:idUE/inscrits",(req,res)=>{
    const codeUE = req.params.idUE;
    const sql = getListeInscritsUE();
    pool.query(sql, [codeUE], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

// Route pour obtenir la liste des étudiants inscrits à l'UE pour le semestre en cours
router.get("/api/ue/:idUE/valider",(req,res)=>{
    const codeUE = req.params.idUE;
    const sql = getListeEtuEnCours();
    pool.query(sql, [codeUE], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

// Route pour obtenir la liste des étudiants pouvant s'inscrire à l'UE
router.get("/api/ue/:idUE/inscrire",(req,res)=>{
    const codeUE = req.params.idUE;
    const sql = getListeInscrire();
    pool.query(sql, [codeUE, codeUE], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});


// Route pour valider une UE
router.put("/api/ue/:idUE/validerUE",(req,res)=>{
    const { etudiantId, ueId, semestreId } = req.body;
    const sql = `update suivre set valide = true where etudiant_id = ? and ue_code = ? and semestre_id = ?`
    pool.query(sql, [etudiantId, ueId, semestreId], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});


// Route pour inscrire un étudiant à l'UE
router.post("/api/ue/:idUE/inscrireUE",(req,res)=>{
    const { etudiantId, ueId, semestreId } = req.body;
    const sql = `insert into suivre (etudiant_id, ue_code, semestre_id, valide) values (?, ?, ?, false);`
    pool.query(sql, [etudiantId, ueId, semestreId], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

// Route pour désinscrire un étudiant de l'UE
router.delete("/api/ue/:idUE/inscrireUE/:idEtu/:idSemestre",(req,res)=>{
    const codeUE = req.params.idUE;
    const etudiant = req.params.idEtu;
    const semestre = req.params.idSemestre;
    const sql = `delete from suivre where etudiant_id = ? and ue_code = ? and semestre_id = ?;`
    pool.query(sql, [etudiant, codeUE, semestre], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});



module.exports = router;
