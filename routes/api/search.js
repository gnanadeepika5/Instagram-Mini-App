const express = require('express');
const Post = require('../../models/Post');
const passport = require('passport');
const isEmpty = require('../../validations/isEmpty');

const router = express.Router();

// @route   get /api/posts/caption/:text
// @access  private
// @desc    get all posts in db/app by searching for caption text by giving some random matching word
router.get('/caption/:text', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.find()
      .then(post =>{
        console.log(`Total No;of posts in db ${post.length}`)
        let postArray = [];
        //console.log(`pst details in search ${post}`)
        //res.json(post)
        for(i=0;i<post.length;i++)
        {
          
          captionText = post[i].text;
          console.log(`captionText is ${captionText}`);
          if(captionText.includes(req.params.text) == true){
             
            //push post objects into Array
            postArray.push(post[i]);
            console.log(post[i]);

          }
        }
        res.json(postArray);
      }
      )
      .catch(err => console.log(err));
})

// @route   get /api/posts/caption/:text
// @access  private
// @desc    get all the posts of user by searching the user name by giving some random word
//router.get('/caption/:text', passport.authenticate('jwt', {session: false}), (req, res) => {

module.exports = router;