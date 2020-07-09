const express = require('express');
const Story = require('../../models/Story');
const Logout = require('../../models/Logout');
const passport = require('passport');
const validateStoryInput = require('../../validations/story');
//const validateComment = require('../../validations/comment');
//const isEmpty = require('../../validations/isEmpty');
const tokenValidator = require('../../config/tokenValidator');

const router = express.Router();

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
// @route   get /api/stories
// @access  private
// @desc    get all stories of a user by user id
router.get('/id/:userid', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
Story.find({user : req.params.userid})
     .then(storyList=>res.json({storyList}))
     .catch(err=>res.status(400).json({NoStoryMade: 'No Story made by that user'}));

});

// @route   get /api/stories/all
// @access  private
// @desc    get all stories
router.get('/all', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
  Story.find()
     .sort({date: -1})
     .then(storyList=>res.json({storyList}))
     .catch(err=>res.status(400).json({NoStoryMade: 'No Story made yet'}));

});
// @route   get /api/stories
// @access  private
// @desc    get all stories of the person who is getting the api call by taking user id from token
router.get('/', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
  Story.find({user : req.user.id})
       .then(storyList=>res.json({storyList}))
       .catch(err=>res.status(400).json({NoStoryMade: 'No Story made by you yet'}));
  
  });

// @route   get /api/stories
// @access  private
// @desc    get a stories by story id
router.get('/id/:id', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
  Story.findById(req.params.id)
       .then(story=>res.json(story))
       .catch(err=>res.status(400).json({NoStoryFound: 'No Story found with that id'}))

      });
 // @route   DELETE /api/posts/id/:postid
// @access  private
// @desc    Delete a story made by a user based on storyid
router.delete('/id/:storyid', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {

  Story.findOne({_id: req.params.storyid})
      .then(story => {
        
        // check if the user is the author of the post
        if(story.user.toString() != req.user.id){
          return res.status(400).json({unAuthorizedUser: 'Not authorized to delete story'});
        }
        else{
        story.deleteOne()
            .then(() => res.json({storyDeleteSuccess: 'The requested story has been deleted successfully'}))
            .catch(err => res.status(400).json({NostoryFound: 'story not found'}));
        }
      })
      .catch(err => console.log(err));
});
// @route   DELETE /api/posts/user/:userid
// @access  PRIVATE
// @desc    Delete all stories made by the userid
router.delete('/', passport.authenticate('jwt', {session: false}), tokenValidator, (req,res) => {

  Story.find({user: req.user.id})
  .then(story => {
    
    for(i=0;i<story.length;i++)
    {
      storyUser = story[i].user.toString();
      console.log(`story user  is ${storyUser}`);

      // if(postUser != req.user.id)
      // {
      //  return res.status(400).json({UnAuthorizedUser:'UnAuthorized user to delete this post'});
      // }
      // else{
      
      storyListItem = story[i];
      
      story[i].deleteOne()
            .then(()=>console.log(storyListItem))
            .catch(err => console.log(err));
     // }
    }
    res.json({storysDeleteSuccess:'All the stories associated which you created got deleted successfully'})
  })
  .catch(err => console.log(err));
      
});



module.exports = router;
