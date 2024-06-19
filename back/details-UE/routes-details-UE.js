const express = require('express');
const router= express.Router()
const pool = require('../connexion-bd.js');
const { getDetailsUE } = require("./bd-details-UE");
const { validerUE } = require('./bd-details-UE');


// Route spécifique à une UE, pour obtenir ses détails
router.get("/api/ue/:idUE",(req,res)=>{

    const codeUE = req.params.idUE;
    const sql = getDetailsUE();

    pool.query(sql, [codeUE, codeUE], (err, result) => {
        if(err) throw err;
        res.json(result);
    });

});

router.post('/validerUE', (req, res) => {
    const { etudiantId, ueId } = req.body;
    validerUE(etudiantId, ueId)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});


module.exports = router;
