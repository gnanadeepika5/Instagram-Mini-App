const express = require('express');
const Post = require('../../models/Post');
const User = require('../../models/User');
const search = require('../../models/Search');
const passport = require('passport');
//const isEmpty = require('../../validations/isEmpty');
const validateSearch = require('../../validations/search');
const tokenValidator = require('../../config/tokenValidator');

const router = express.Router();

/**
 * Search API by caption or text
 * @route GET /api/search/captionOrText
 * @group Search
 * @param {string} userName.body.required - username or email - eg: syam
 * @param {string} handle.body.required 
 * @param {string} email.body.required 
 * @param {string} password.body.required 
 * @param {string} password2.body.required 
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - 500
 */


// @route   get /api/search/captionOrText
// @access  private
// @desc    get all posts in db/app by searching for caption text by giving some random matching word
router.get('/captionOrText/:searchText', passport.authenticate('jwt', {session:false}), tokenValidator, (req,res) =>{
  // Validation
  const {errors, isValid} = validateSearch(req.params);
  console.log('In the post route of posts');
  if(!isValid)
  {
    return res.json(errors);
  }
  Post.find()
      .then(postList =>{
        console.log(`Total no of posts in db- Post list is ${postList.length}`);
        // return res.json(postList);
        var postArray =[];
        
        for(var i = 0; i < postList.length; i++)
        {
          var Caption = postList[i].text;
          console.log(`captionText is ${Caption}`);
          if(Caption.includes(req.params.searchText) === true)
          {
            //push post objects into Array
             postArray.push(postList[i]);
            console.log(postList[i]);
          }
        }
        if(postArray.length === 0)
        {
          return res.json({NoPostFound:'No post found for the required search as Caption'});
        }
        else{
            return res.json(postArray);
        }
      })
    .catch(err => console.log(err));
});

/**
 * Search API by caption or text
 * @route GET /api/search/UserName
 * @group Search
 * @param {string} searchText.query.required - username or email - eg: syam
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - 500
 */
// @route   get /api/posts/caption/:text
// @access  private
// @desc    get all the users of user by searching the user name by giving some random word
router.get('/UserName/:searchText', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
  User.find()
      .then(userList=>{
        console.log(`Total no of users in db- users list is ${userList.length}`);
        // return res.json(postList);
        var userArray =[];
        
        for(var i = 0; i < userList.length; i++)
        {
          var UserNameText = userList[i].name;
          console.log(`UserName Text is ${UserNameText}`);
          if(UserNameText.includes(req.body.searchText) === true)
          {
            //push post objects into Array
            userArray.push(userList[i]);
            console.log(userList[i]);
          }
        }
        if(userArray.length === 0)
        {
          return res.json({NoUserFound:'No user found for the required search as Caption'});
        }
        else{
        res.json(userArray);
        }
      } )
      .catch(err => {
        return res.status(400).json({
                    message: 'failed to query and get the users',
                    innerException: err
                  });
      });
});

module.exports = router;