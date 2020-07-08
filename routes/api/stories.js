const express = require('express');
const Story = require('../../models/Story');
const Logout = require('../../models/Logout');
const passport = require('passport');
const validateStoryInput = require('../../validations/story');
//const validateComment = require('../../validations/comment');
//const isEmpty = require('../../validations/isEmpty');
const tokenValidator = require('../../config/tokenValidator');

const router = express.Router();

/**
 * Post a story API
 * @route POST /api/stories
 * @group Stories
 * @param {string} userName.body.required - username or email - eg: syam
 * @param {string} handle.body.required 
 * @param {string} email.body.required 
 * @param {string} password.body.required 
 * @param {string} password2.body.required 
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - 500
 */

// @route   POST /api/stories
// @access  private
// @desc    Create and upload a new audio/video post

router.post('/', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
  // Validation
  const {errors, isValid} = validateStoryInput(req.body);
  console.log('In the post route of stories');
  if(!isValid)
  {
    return res.json(errors);
  }
  // //code to see whether user logged in or out
  // Logout.findOne({email:req.user.email})
  //       .then(logoutUser =>
  //         {
  //           if(logoutUser)
  //           {
  //            // console.log(`logout user is ${logoutUser}`);
  //             //console.log(`logout token list ${logoutUser.LogoutTokenList}`);
  //             AllTokenList = new Array();
  //             AllTokenList=logoutUser.LogoutTokenList;
  //             for(i=0;i<AllTokenList.length;i++)
  //             {
  //               if(AllTokenList[i].token.toString() === req.headers['authorization'].toString())
  //               {
  //                 return res.json({LoggingOut:'You are successfully logged out.Please login to continue.'})
  //               }
  //             }
  //           }
  //         })
  //       .catch(err=>console.log(err))
  // console.log(`user logout token from request is ${req.user.LogoutToken}`);
  // if(!isEmpty(req.user.LogoutToken))
  //                 {
  //                    return res.json({Logout:'You are successfully logged out'});
  //                 }
  const newStory = new Story({
    user: req.user.id, //later it comes from token
    name: req.user.name,//later it comes from token
    avatar: req.user.avatar,//later it comes from token
    handle: req.user.handle,//later it comes from token
    text: req.body.text,
    imageOrVideoOrtext: req.body.imageOrVideoOrtext
  });
  console.log(`NewPost created. Story details - ${newStory.id}, ${newStory.name}, ${newStory.avatar}, ${newStory.imageOrVideoOrtext} `);
  newStory.save()
         .then(story => res.json(story))
         .catch(err => console.log(err));
});
module.exports = router;

