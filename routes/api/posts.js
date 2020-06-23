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
    user: req.body.id, //later it comes from token
    name: req.body.name,//later it comes from token
    avatar: req.body.avatar,//later it comes from token
    handle: req.body.handle,//later it comes from token
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
                    post.deleteOne()
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
      post[i].deleteOne()
            .then(()=>console.log(postListItem))
            .catch(err => console.log(err));
    }
    res.json({msg:'All the posts associated with handle got deleted successfully'})
  })
  .catch(err => console.log(err));
      
})

// @router POST /api/posts/comment/:id
// @desc comment a post based on post id
// @access public
router.post('/comment/:id', (req,res) =>
{
  Post.findById(req.params.id)
      .then(post =>{
        //create a new comment
        const newComment = {
          user: req.body.id,//later it comes from token
          text:req.body.text,
          name:req.body.name,
          avatar:req.body.avatar
        }
        //append the new comment to the comments array by using unshift() method.And this will also returns the new length after appending new comment everytime.To append back of array use push() method
        post.comments.unshift(newComment);
        //save in db
        post.save()
            .then(post, res.json(post))
            .catch(err => console.log(err));
      })
      .catch(err=> console.log(err));
})

//@router delete api/posts/comment/:post_id/:comment_id
//@desc delete comment on post  by comment id(go to post so post id,find a comment want to delete so comment id)
//access public
router.delete('/comment/:post_id/:comment_id', (req,res)=>{
  //find   a post by post_id
  Post.findById(req.params.post_id)
      .then(post=> {
        //find the comment you want to delete from the comments array in the post
        if(post.comments.filter(comment=>comment._id.toString() === req.params.comment_id).length===0)
        {
          return res.json({commentUnavailable: 'No comment to be deleted'});
        }
        // console.log('comment length'+ req.params.comment_id.length);
        //comment exists, find index of the comment to be deleted
        const removeIndex = post.comments
                                .map(comment => comment._id.toString()) // goes to every comment and get the comment id in string type so that our comment_id passed in params can be found
                                .indexOf(req.params.comment_id);//gets the index of comment_id which found through map() function above
        //splice the array
        post.comments.splice(removeIndex, 1);
        //save
        post.save()
            .then(post=>res.json(post))
            .catch(err =>console.log(err));
      })
      .catch(err=>console.log(err));
})



module.exports = router;



