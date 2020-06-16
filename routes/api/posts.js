const express = require('express');
const router = express.Router();
//test route from posts
router.get('/test', (req,res) => res.json({msg:'posts worked'}));
module.exports = router;
