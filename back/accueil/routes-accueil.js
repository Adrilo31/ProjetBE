const express = require('express');
const bd = require("./bd-accueil");
const router= express.Router()


//test
router.get("/",(req,res)=>{
    res.send("test accueil")
});


//routes stats  pr le tableau de bord
router.get('/etudiants/stats', bd.getEtudiantsStats);

router.get('/mentions/stats', bd.getMentionsStats);

router.get('/parcours/stats', bd.getParcoursStats);

router.get('/ues/stats', bd.getUesStats);




module.exports = router;