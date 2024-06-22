const express = require('express');
const router = express.Router();
const bd = require('./bd-mentions');


// Route pour obtenir la liste des mentions
router.get('/mentions', bd.getMentions);


// Route pour obtenir une mention par son ID
router.get('/mentions/:id', bd.getMentionById);



module.exports = router;
