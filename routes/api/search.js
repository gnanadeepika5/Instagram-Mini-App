const express = require('express');
const Post = require('../../models/Post');
const User = require('../../models/User');
const search = require('../../models/Search');
const passport = require('passport');
//const isEmpty = require('../../validations/isEmpty');
const validateSearch = require('../../validations/search');
const tokenValidator = require('../../config/tokenValidator');

const router = express.Router();


// @route   get /api/search/captionOrText
// @access  private
// @desc    get all posts in db/app by searching for caption text by giving some random matching word
router.get('/captionOrText', passport.authenticate('jwt', {session:false}), tokenValidator, (req,res) =>{
  // Validation
  const {errors, isValid} = validateSearch(req.body);
  console.log('In the post route of posts');
  if(!isValid)
  {
    return res.json(errors);
  }
  Post.find()
      .then(postList =>{
        console.log(`Total no of posts in db- Post list is ${postList.length}`);
        // return res.json(postList);
        let postArray =[];
        
        for(i=0;i<postList.length;i++)
        {
           Caption = postList[i].text;
          console.log(`captionText is ${Caption}`);
          if(Caption.includes(req.body.searchText) === true)
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
        res.json(postArray);
        }
      })
    
    .catch(err => console.log(err));

          
})

// @route   get /api/posts/caption/:text
// @access  private
// @desc    get all the users of user by searching the user name by giving some random word
router.get('/UserName/:searchText', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
  User.find()
      .then(userList=>{
        console.log(`Total no of users in db- users list is ${userList.length}`);
        // return res.json(postList);
        let userArray =[];
        
        for(i=0;i<userList.length;i++)
        {
          UserNameText = userList[i].name;
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
      .catch()
});

module.exports = router;