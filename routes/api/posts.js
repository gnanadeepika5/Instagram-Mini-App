const express = require('express');
const Post = require('../../models/Post');
const router = express.Router();
const passport = require('passport');
//const validatePostInput = require('../../validations/post');
//const isEmpty = require('../../validations/isEmpty');
// //test route from posts
// router.get('/Post', (req,res) => res.json({msg:'posts worked'}));


// @route   POST /api/posts
// @access  private
// @desc    Create and upload a new audio/video post
//code for private access aunthenticationa dn validation begins
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
//   // Validation
//   const {errors, isValid} = validatePostInput(req.body);
//   console.log('In the post route of posts');
//   if(!isValid)
//   {
//     return res.json(errors);
//   }
// code for private access ends here
//router.post('/', (req, res) =>
//{
  const newPost = new Post({
    user: req.user.id, //later it comes from token
    name: req.user.name,//later it comes from token
    avatar: req.user.avatar,//later it comes from token
    handle: req.user.handle,//later it comes from token
    imageOrVideo: req.body.imageOrVideo
  });
  console.log(`NewPost created. Post details - ${newPost.id}, ${newPost.name}, ${newPost.avatar}, ${newPost.imageOrVideo} `);
  newPost.save()
         .then(post => res.json(post))
         .catch(err => console.log(err));
})

// @route   GET /api/posts
// @access  private
// @desc    Get all posts
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  //router.get('/', (req,res) =>{
  Post.find()
      .sort({date: -1}) // give the sorted data  by date in descending order
      .then(posts => res.json(posts))
      .catch(err => res.json({msg: 'No posts found'}));
})

// @route   GET /api/posts/id/:postid
// @access  private
// @desc    Get single post details based on postid
router.get('/id/:postid', passport.authenticate('jwt', {session: false}), (req, res) => {
  //router.get('/id/:postid', (req,res) => {
  Post.findById(req.params.postid)
      .then(post => res.json(post))
      .catch(err => res.json({msg: 'No post with that id found'}));
})

// @route   GET /api/posts/handle/:handle
// @access  PRIVATE
// @desc    Get posts made by a user(unique handle)
router.get('/handle/:handle', passport.authenticate('jwt', {session: false}), (req, res) => {
  //router.get('/handle/:handle', (req,res) => {
  Post.find({handle: req.params.handle})
      .then(post => res.json(post))
      .catch(err => res.json({msg: 'No post made by that user'}));
})






// //@route Delete api/posts/id/:id
// //@access public
// //@desc delete a post based on post id
// router.delete('/id/:postid', (req,res) =>
// {
//   Post.findOne({_id:req.params.postid})
//       .then(post => {
//                     post.remove()
//                         .then(()=>res.json({msg:'Post deleted successfully'}))
//                         .catch(err => res.json({msg:'post not found'}));
//       })
//       .catch(err =>console.log(err));

// })

// @route   DELETE /api/posts/id/:id
// @access  private
// @desc    Delete a post made by a user based on postid
router.delete('/id/:postid', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.findOne({_id: req.params.postid})
      .then(post => {
        //onsole.log(`post in delete by post id id: ${post}`);

        // check if the user is the author of the post
        if(post.user.toString() != req.user.id){
          return res.status(400).json({unAuthorizedUser: 'Not authorized to delete post'});
        }
        else{
        post.deleteOne()
            .then(() => res.json({msg: 'The requested post has been deleted successfully'}))
            .catch(err => res.status(400).json({msg: 'Post not found'}));
        }
      })
      .catch(err => console.log(err));
})

// @route   DELETE /api/posts/handle/:handle
// @access  PRIVATE
// @desc    Delete all posts made by the userid
router.delete('/user/:id', passport.authenticate('jwt', {session: false}), (req,res) => {

  Post.find({user: req.params.id})
  .then(post => {
    console.log('post details: name= ' + post)
    console.log('post length'+ post.length);

    for(i=0;i<post.length;i++)
    {
      postUser = post[i].user.toString();
      console.log(`post user  is ${postUser}`);

      if(postUser != req.user.id)
      {
       return res.json({msg:'you are not a valid user to delete this post'});
      }
      else{
      
      postListItem = post[i];
      // console.log('post is'+post[i]);
      post[i].deleteOne()
            .then(()=>console.log(postListItem))
            .catch(err => console.log(err));
      }
    }
    res.json({msg:'All the posts associated with handle got deleted successfully'})
  })
  .catch(err => console.log(err));
      
})
// @router POST /api/posts/comment/:id
// @desc comment a post based on post id
// @access private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
//router.post('/comment/:id', (req,res) =>
//{
  Post.findById(req.params.id)
      .then(post =>{
        //create a new comment
        const newComment = {
          user: req.user.id,//later it comes from token
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
//access private

router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {session: false}), (req,res)=>{
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
        console.log(`remove index in comments${removeIndex}`);
        //splice the array
        post.comments.splice(removeIndex, 1);
        //save
        post.save()
            .then(post=>res.json(post))
            .catch(err =>console.log(err));
      })
      .catch(err=>console.log(err));
})


// @router    POST /api/posts/like/:id
// @desc      Like a post based on postId
// @access    Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Post.findById(req.params.id)
      .then(post => {
        // Loop through the likes array in the post collection
        // to check whether the user has liked the post before
        if((post.likes.filter(like => like.user.toString() === req.user.id).length > 0)){
          
          // User already liked the post, delete him from likes list
            // The below sentence does not enable a user who has liked a post to like it again.
            // return res.status(400).json({msg: 'Already liked the post. Cannot relike.'})

            const removeIndex = post.likes.map(like => like.user)
                                        .indexOf(req.user.id);
          
            if(removeIndex == -1)
            {
              return res.status(400).json({likeError: 'Already liked the post'})
            }                           

          // //User found, remove user from likes array
          // post.likes.splice(removeIndex, 1);
        }
        else{
        // User has not liked the post yet, add userid to the likes array
          const newLike = {
            user: req.user.id,
            name: req.user.name,
            handle: req.user.handle,
            avatar: req.user.avatar
          }
          post.likes.unshift(newLike);
        }
        // Save
        post.save()
            .then(post => res.json(post))
            .catch(err => console.log(err));
      })
      .catch(err => res.status(400).json({msg: 'Could not like the post'}));
})



// @router    POST /api/posts/unlike/:id
// @desc      Unlike a post based on postId
// @access    Private
router.post('/unlike/:id',passport.authenticate('jwt', {session:false}), (req,res) =>{
  //find the post which need to be unliked
  Post.findById(req.params.id)
      .then(post =>{
        //check if user already liked the post
        if(post.likes.filter(like=>(like.user.toString() === req.user.id)).length ===0){
          //user has not liked the post
          return res.status(400).json({notLiked: 'You have not yet liked this post'});
        }
        else{
          //user has liked it, so dislike the post
          //find removeIndex of like in like Array
          const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
          //splice removeIndex like from the likes array
          post.likes.splice(removeIndex, 1);
          //save
          post.save()
              .then(post => res.json(post))
              .catch(err => console.log(err));
        }
      })
      .catch(err => res.status(400).json({postNotFound: 'Post Not Found'}));
});

module.exports = router;



