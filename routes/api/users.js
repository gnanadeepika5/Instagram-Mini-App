const express = require('express');
const router = express.Router();
//test route from users
router.get('/test', (req,res) => res.json({msg:'users worked!'}));
module.exports = router;