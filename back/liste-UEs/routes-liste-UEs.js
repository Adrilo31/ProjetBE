const express = require('express');
const router= express.Router()

router.get("/",(req,res)=>{
    res.send("test liste UE")
});


module.exports = router;