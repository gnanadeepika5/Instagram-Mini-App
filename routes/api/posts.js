const express = require('express');
const Post = require('../../models/Post');
const router = express.Router();
const passport = require('passport');
//const validatePostInput = require('../../validations/post');
//const isEmpty = require('../../validations/isEmpty');
// //test route from posts
// router.get('/Post', (req,res) => res.json({msg:'posts worked'}));


// @route   POST /api/posts/newPost
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
router.post('/newPost', (req, res) =>
{
  const newPost = new Post({
    //user: req.user.id,
    name: req.body.name,
    avatar: req.body.avatar,
    handle: req.body.handle,
    imageOrVideo: req.body.imageOrVideo
  });
  console.log(`NewPost created. Post details - ${newPost.name}, ${newPost.avatar}, ${newPost.imageOrVideo} `);
  newPost.save()
         .then(post => res.json(post))
         .catch(err => console.log(err));
})

// @route   GET /api/posts
// @access  public
// @desc    Get all posts
//router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  router.get('/allPosts', (req,res) =>{
  Post.find()
      .sort({date: -1}) // give the sorted data  by date in descending order
      .then(posts => res.json(posts))
      .catch(err => res.json({msg: 'No posts found'}));
})

// @route   GET /api/posts/:id
// @access  public
// @desc    Get single post details based on postid
//router.get('/id/:postid', passport.authenticate('jwt', {session: false}), (req, res) => {
  router.get('/id/:postid', (req,res) => {
  Post.findById(req.params.postid)
      .then(post => res.json(post))
      .catch(err => res.json({msg: 'No post with that id found'}));
})

// @route   GET /api/posts/:handle
// @access  PRIVATE
// @desc    Get posts made by a user(unique handle)
//router.get('/handle/:handle', passport.authenticate('jwt', {session: false}), (req, res) => {
  router.get('/handle/:handle', (req,res) => {
  Post.find({handle: req.params.handle})
      .then(post => res.json(post))
      .catch(err => res.json({msg: 'No post made by that user'}));
})







//   const newPost = new Post
//   ({
//     name: req.body.name,
//     email: req.body.email
//   });
//   console.log(`NewPost created. ${newPost.name}, ${newPost.email}`);
//   newPost.save()
//          .then(post => res.json(post))
//          .catch(err => console.log(err));

// })
//
// //@route POST api/posts/getbyuser
// // @desc get all the posts by the user
// //@access public
// router.get('/Post',(req,res) => {
//   console.log("printing");
//   console.log(req.query);//in postman, give email:some id from db in params tab
//   const email = (req.query).email;
//   Post.find({email})
//   .then((post) => res.json(post))
//   // .then(res.send({msg:'found' }))
//   .catch(err=>console.log(err));
// })



module.exports = router;



