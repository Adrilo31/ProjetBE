const express = require('express');
const router= express.Router()
const pool = require('../connexion-bd.js');
const { getDetailsUE, getListeInscritsUE, getListeEtuEnCours, getListeInscrire } = require("./bd-details-UE");
const { validerUE } = require('./bd-details-UE');


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
router.post('/validerUE', (req, res) => {
    const { etudiantId, ueId } = req.body;
    validerUE(etudiantId, ueId)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});


module.exports = router;
