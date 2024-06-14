/*const express = require('express');
const router= express.Router()

router.get("/",(req,res)=>{
    res.send("test liste UE")
});

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const bd = require('./bd-liste-UEs');

// Route pour obtenir la liste des UE
router.get('/UEs', bd.getUEs);

// Route pour ajouter une UE
router.post('/UEs', bd.addUE);

module.exports = router;