const express = require('express');
const Post = require('../../models/Post');
const router = express.Router();
const passport = require('passport');
//const validatePostInput = require('../../validations/post');
//const isEmpty = require('../../validations/isEmpty');
// //test route from posts
// router.get('/Post', (req,res) => res.json({msg:'posts worked'}));


// @route   POST /api/posts
// @access  public
// @desc    Create and upload a new audio/video post
//code for private access aunthenticationa dn validation begins
// router.post('/newPost', passport.authenticate('jwt', {session: false}), (req, res) => {
//   // Validation
//   const {errors, isValid} = validatePostInput(req.body);
//   console.log('In the post route of posts');
//   if(!isValid)
//   {
//     return res.json(errors);
//   }
// code for private access ends here
router.post('/', (req, res) =>
{
  const newPost = new Post({
    user: req.body.id,
    name: req.body.name,
    avatar: req.body.avatar,
    handle: req.body.handle,
    imageOrVideo: req.body.imageOrVideo
  });
  console.log(`NewPost created. Post details - ${newPost.id}, ${newPost.name}, ${newPost.avatar}, ${newPost.imageOrVideo} `);
  newPost.save()
         .then(post => res.json(post))
         .catch(err => console.log(err));
})

// @route   GET /api/posts
// @access  public
// @desc    Get all posts
//router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  router.get('/', (req,res) =>{
  Post.find()
      .sort({date: -1}) // give the sorted data  by date in descending order
      .then(posts => res.json(posts))
      .catch(err => res.json({msg: 'No posts found'}));
})

// @route   GET /api/posts/id/:postid
// @access  public
// @desc    Get single post details based on postid
//router.get('/id/:postid', passport.authenticate('jwt', {session: false}), (req, res) => {
  router.get('/id/:postid', (req,res) => {
  Post.findById(req.params.postid)
      .then(post => res.json(post))
      .catch(err => res.json({msg: 'No post with that id found'}));
})

// @route   GET /api/posts/handle/:handle
// @access  PRIVATE
// @desc    Get posts made by a user(unique handle)
//router.get('/handle/:handle', passport.authenticate('jwt', {session: false}), (req, res) => {
  router.get('/handle/:handle', (req,res) => {
  Post.find({handle: req.params.handle})
      .then(post => res.json(post))
      .catch(err => res.json({msg: 'No post made by that user'}));
})

//@route Delete api/posts/id/:id
//@access public
//@desc delete a post based on post id
router.delete('/id/:postid', (req,res) =>
{
  Post.findOne({_id:req.params.postid})
      .then(post => {
                    post.remove()
                        .then(()=>res.json({msg:'Post deleted successfully'}))
                        .catch(err => res.json({msg:'post not found'}));
      })
      .catch(err =>console.log(err));
    
})

//@route Delete api/posts/handle/:handle
//@access public
//@desc Delete all the posts made by the user
router.delete('/handle/:handle', (req,res) => {

  Post.find({handle: req.params.handle})
  .then(post => {
    console.log('post details: name= ' + post)
    console.log('post length'+ post.length);
    for(i=0;i<post.length;i++)
    {postListItem = post[i];
      console.log('post is'+post[i])
      post[i].remove()
            .then(()=>console.log(postListItem))
            .catch(err => console.log(err));
    }
    res.json({msg:'All the posts associated with handle got deleted successfully'})
   
    // post.deleteMany()
    //     .then(() => res.json({msg: 'All of your posts have been successfully deleted.'}))
    //     .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
      
})



module.exports = router;



