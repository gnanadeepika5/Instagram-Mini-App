const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register user
// @access  Public 
router.post('/register', (req, res) => {
User.findOne({email: req.body.email})
.then(user => {
  if (user){
    return res.status(400).json({email: 'Email already exist'})
    ;
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    newUser.save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
  }
})
.catch(err => console.log(err));
})


// @route   get api/users/search
// @desc    search user
// @access  Public 
router.get('/search/:userName', (req, res) => {
    const {userName} = req.params;
    return res.status(200).send(`{msg: searching user ${userName}}`);
})

// @route   get api/users/showPeople
// @desc    showPeople
// @access  Public 
router.get('/showPeople', (req, res) => {
    return res.status(200).send(`{msg: respond with all people info}`);
})

// @route   get api/users/showMatches
// @desc    show Matches
// @access  Public 
router.get('/showMatches', (req, res) => {
  
  return res.status(200).send(`{msg: respond with matching people}`);
})

// @route   post api/users/:userName
// @desc    post message to a user
// @access  Public 
router.post('/messages', (req, res) => {
  const toUser =  req.body.toUser;
  const msg =  req.body.msg;
  if(toUser=='')
    {
      return res.status(400).send ({msg: 'user is mandatory'});
    }
  if(msg =="" || msg === undefined)
    {
      return res.status(400).send({msg: 'blank messages can not be sent'});
    }
  return res.status(200).send(`{msg: sending message ${msg} to user ${toUser}}`);
})

// @route   get api/users/messages
// @desc    post message to a user
// @access  Public 
router.get('/messages', (req, res) => {
  return res.status(200).send(`{msg: get Messages from others}`);

})

// @route   POST api/users/test
// @desc    Register user
// @access  Public 
router.get('/test', (req, res) => {
    return res.status(200).send('{msg: user test}')
})


module.exports = router;