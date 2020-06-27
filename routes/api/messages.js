const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const validateMessage = require('../../validations/messages');

// @route   POST api/messages/sendMessage
// @desc    Register user
// @access  Public 
router.post('/sendMessage', (req, res) => {
  // //Validation
  // const {errors, isValid} = validateRegisterInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const {toUser, fromUser, msg} = req.body;
  console.log(` message has been sent from ${fromUser} to ${toUser} and message is ${msg}`);
  return res.status(200).send({message: `message has been sent from ${fromUser} to ${toUser} and message is ${msg}`});
});

// @route   get api/users/search
// @desc    search user
// @access  Public 
router.get('/showMessages/:userName', (req, res) => {
    const {userName} = req.params;
    return res.status(200).send(`{msg: showing Messages of  user ${userName}}`);
});

module.exports = router;
