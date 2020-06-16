const express = require('express');
const router = express.Router();
//test route from profile
router.get('/test',(req,res)=>res.json({msg : 'profile worked!'}));
module.exports = router;