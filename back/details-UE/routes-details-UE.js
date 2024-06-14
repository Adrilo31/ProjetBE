const express = require('express');
const router= express.Router()
const pool = require('../connexion-bd.js');
const { getDetailsUE } = require("./bd-details-UE");

// Route spécifique à une UE, pour obtenir ses détails
router.get("/api/ue/:idUE",(req,res)=>{

    const codeUE = req.params.idUE;
    const sql = getDetailsUE();

    pool.query(sql, [codeUE, codeUE], (err, result) => {
        if(err) throw err;
        res.json(result);
    });

});


module.exports = router;
