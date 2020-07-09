const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const validateMessage = require('../../validations/messages');
const isEmpty = require ('../../validations/isEmpty');
const { json } = require('body-parser');
const Logout = require('../../models/Logout');
const tokenValidator = require('../../config/tokenValidator');


/**
 * Register User API
 * @route POST /api/users/register
 * @group Users
 * @param {string} userName.body.required - username or email - eg: syam
 * @param {string} handle.body.required 
 * @param {string} email.body.required 
 * @param {string} password.body.required 
 * @param {string} password2.body.required 
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - 500
 */

// @route   POST api/users/register
// @desc    Register user
// @access  Public 
router.post('/register', (req, res) => {
  //Validation
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: 'Email already exists'
        });
      }
      // Check if handle already taken
      User.findOne({
          handle: req.body.handle
        })
        .then(user => {
          if (user) {
            return res.json({
              handle: 'Handle already taken. Choose another handle'
            });
          }

          //create an avatar
          const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
          });
      
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            handle: req.body.handle,
            avatar,
            password: req.body.password
          });

          //generate a key for hashing the password
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;

            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {

                  // The moment a newUser is saved in mongoDB, create a profile with the user details and upload it to the profile document in mongoDB

                  const newProfile = new Profile({
                    user: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    email: user.email,
                    handle: user.handle
                  });
                  newProfile
                    .save()
                    .then(profile => {
                      return res.status(200).json({
                        message : 'User and Profile created successfully',
                        userDetails: user,
                        profileDetails: profile
                      });
                    })
                    .catch((err) => 
                    {
                      return res.status(500).json(err);
                    });
                })
                .catch((err) => {
                  return res.status(500).json(err);
                });
            });
          });
        });
    })
    .catch(err => { 
      return res.status(500).json(err);
    });
})

/**
 * Get users names matching to userName criteria
 * @route GET /api/users/search/:userName
 * @group Users
 * @param {string} userName.query.required - username or email - eg: syam
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - 500
 */
// Search the users matching the name to be shown on the UI
// @route   get api/users/search 
// @desc    search user
// @access  Public 
router.get('/search/:userName',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const {
      userName
    } = req.params;

    //validation
    const {
      errors,
      isValid
    } = validateMessage(req.body);
    if (!isValid) {
      return res.status(500).json(errors);
    }
    User.findOne({
        name: req.param.name
      })
      .then(user => {
        if (!user) {
          return res.status(400).json({
            errors: `No user found with the name ${req.params.userName}`
          });
        }
      })
      .catch(err => {
        return res.status(500).json( {message: `Failed to get the user info ${err}`});
      });
    return res.status(200).send({message: `Searching user ${userName}}`});
});

/**
 * Get Random list of People info
 * @route GET /api/users/showPeople
 * @group Users
 * @param {string} userName.query.required - username or email - eg: syam
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - 500
 */
router.get('/showPeople', (req, res) => {
  User.find({})
    .limit(10)
    .then(users => {
      if (!users) {
        return res.status(400).json({
          errors: `No user found with the name ${req.params.userName}`
        });
      }
      console.log(' List of people');
      return res.status(200).send(users);
    })
    .catch(err => {
      return res.status(500).json( {message:`Failed to get the user info ${err}`});
    });
    
});

/**
 * Get a message fromUser to different User
 * @route get api/users/messages
 * @group Users
 * @param {string} fromId.query.required - username or email - eg: syam
 * @param {string} toId.query.required - username or email - eg: deepika
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - 500
 */
// @route   get api/users/messages
// @desc    post message to a user
// @access  Public 
router.get('/messages', (req, res) => {
  return res.status(200).send({message: `get messages from others`});
});


// @route   POST api/users/test
// @desc    Register user
// @access  Public 
router.get('/test', (req, res) => {
  return res.status(200).send({message: 'user test'});
});

/**
 * Login User API
 * @route POST /api/users/login
 * @group Users
 * @param {string} email.body.required - username or email - eg: syam
 * @param {string} password.body.required 
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - 500
 */
// @route   POST api/users/login
// @desc    Login user/returning a token
// @access  Public 
router.post('/login', (req, res) => {
  //Validation
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({
      email
    })
    .then(user => {
      console.log('email is' + req.body.email);
      if (!user) {
        return res.status(404).json({
          email: 'User not found'
        });
      }
      //Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //Payload
            const payload = {id: user.id, name: user.name, email:user.email, avatar: user.avatar, TokenExpirationTime: (new Date().getTime() + 60 * 60 * 1000)/1000};
            //sign token
            jwt.sign(
              payload,
              keys.secretOrKey, {
                expiresIn: 3600
              },
              (err, token) => {
                return res.json({
                  token: 'Bearer ' + token
                });
              })

          } else {
            return res.status(400).json({
              password: 'Password incorrect'
            });
          }
        })
    })
    .catch();
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false}), tokenValidator, (req, res) => {
    return res.json(req.user);
});

/**
 * Delete a user
 * @route Delete api/users/messages/:id
 * @group Users
 * @returns {object} 200 - User Deleted
 * @returns {Error}  default - 500
 */
// @route   Delete api/users/delete
// @desc    Delete user
// @access  private  

router.post('/delete', passport.authenticate('jwt', {session:false}), tokenValidator, function(req, res){
    
const successMessage = `User has been deleted.`;
const errorMessage = `User has not been deleted!`;
req.user.remove()
  .then(( ) => res.status(200).json({message: successMessage}))
  .catch(( ) => res.status(400).json({message: errorMessage}))
    });

module.exports = router;
