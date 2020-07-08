const express = require('express');
const Post = require('../../models/Post');
const Logout = require('../../models/Logout');
const passport = require('passport');
const validatePostInput = require('../../validations/post');
const validateComment = require('../../validations/comment');
const isEmpty = require('../../validations/isEmpty');
const tokenValidator = require('../../config/tokenValidator');

const router = express.Router();

// //test route from posts
router.get('/test', (req,res) => res.json({msg:'posts worked'}));

/**
 * Create a new Post:  Create and upload a new audio/video post
 * @route Post api/posts
 * @group Posts
 * @param {string} id.required
 * @param {string} userHandle.body.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */

router.post('/', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {

  // Validation
  const {errors, isValid} = validatePostInput(req.body);
  console.log('In the post route of posts');
  if(!isValid)
  {
    return res.json(errors);
  }

  //creating a new post
  const newPost = new Post({
    user: req.user.id, //later it comes from token
    name: req.user.name,//later it comes from token
    avatar: req.user.avatar,//later it comes from token
    handle: req.user.handle,//later it comes from token
    text: req.body.text,
    imageOrVideo: req.body.imageOrVideo
  });
  console.log(`NewPost created. Post details - ${newPost.id}, ${newPost.name}, ${newPost.avatar}, ${newPost.imageOrVideo} `);
  //save in DB
  newPost.save()
         .then(post => res.json(post))
         .catch(err => console.log(err));
});


/**
 * Edit Post
 * @group Posts
 * @returns {object} 200 - Edited Post
 * @returns {Error} default - 400 timeout
 */

router.patch('/:postId', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {

  // Validation
  const {errors, isValid} = validatePostInput(req.body);
  console.log('In the post route of posts');
  if(!isValid)
  {
    return res.status(400).json(errors);
  }

  Post.find({_id: req.params.postId})
      .then(([post]) => {

        if (String(post.user).trim() !== String(req.user.id).trim()) {
          return res.status(403).json({NotAuthorized: 'Not Authorized'});
        }

        const timeout = +new Date(post.date) + 24*60*60*1000;

        if (timeout < +new Date) {
          return res.status(400).json({Timeout: "Post can't be edited: time is out"});
        }

        post.text = req.body.text;
        post.imageOrVideo = req.body.imageOrVideo;

        post.save()
        .then(() => res.status(200).json(post))
        .catch((err) => res.status(400).json({Error: err.message}));
      })
      .catch(({message}) => res.status(400).json({NoPostFound: message}));
});


/**
 * Get profile of user
 * @route Get api/posts
 * @group Posts
 * @param {string} id.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */

 // @route   GET /api/posts
// @access  private
// @desc    Get all posts
router.get('/', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
  
  Post.find()
      .sort({date: -1}) // give the sorted data  by date in descending order
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({NoPostFound: 'No posts found'}));
});

/**
 * Get post by the postId
 * @route Get api/posts/id/:postId
 * @group Posts
 * @param {string} id.required
 * @returns {object} 200 - Post by the user
 * @returns {Error}  default - 400 user profile not found
 */

router.get('/id/:postid', passport.authenticate('jwt', {session: false}), tokenValidator,(req, res) => {
   Post.findById(req.params.postid)
      .then(post => res.json(post))
      .catch(err => res.status(400).json({NoPostFound: 'No post with that id found'}));
});

/**
 * Get posts by the userId
 * @route Get api/posts/id/:userId
 * @group Posts
 * @param {string} id.required
 * @returns {object} 200 - Post by the user
 * @returns {Error}  default - 400 user profile not found
 */

// @route   GET /api/posts/id/:userid
// @access  PRIVATE
// @desc    Get all posts made by a userid
router.get('/id/:userid', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
  Post.find({user: req.params.userid})
  .then(post => {
    res.status(200).json(post);
  })
  .catch(err => { 
      return  res.status(400).json({NoPostMade: 'No post made by that user'});
    }
  );
});

// @route   GET /api/posts/handle/:handle
// @access  PRIVATE
// @desc    Get posts made by a userhandle(unique handle)
router.get('/handle/:handle', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
    Post.find({handle: req.params.handle})
      .then(post => { return res.status(200).json(post);})
      .catch(err => { return  res.status(400).json({NoPostMade: 'No post made by that user'});
      });
});


// @route   DELETE /api/posts/id/:postid
// @access  private
// @desc    Delete a post made by a user based on postid
router.delete('/id/:postid', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {

  Post.findOne({_id: req.params.postid})
      .then(post => {
        
        // check if the user is the author of the post
        if(post.user.toString() != req.user.id){
          return res.status(400).json({unAuthorizedUser: 'Not authorized to delete post'});
        }
        else{
        post.deleteOne()
            .then(() => res.json({PostDeleteSuccess: 'The requested post has been deleted successfully'}))
            .catch(err => res.status(400).json({NoPostFound: 'Post not found'}));
        }
      })
      .catch(err => console.log(err));
});


/**
 * DELETE all posts by userId
 * @route DELETE api/posts/users/:userId
 * @group Posts
 * @param {string} id.required
 * @returns {object} 200 - Post by the user
 * @returns {Error}  default - 400 user profile not found
 */

router.delete('/id/:userid', passport.authenticate('jwt', {session: false}), tokenValidator, (req,res) => {

  Post.find({user: req.params.id})
  .then(post => {
    
    for(i=0;i<post.length;i++)
    {
      postUser = post[i].user.toString();
      console.log(`post user  is ${postUser}`);

      if(postUser != req.user.id)
      {
       return res.status(400).json({UnAuthorizedUser:'UnAuthorized user to delete this post'});
      }
      else{
      
      postListItem = post[i];
      
      post[i].deleteOne()
            .then(()=>console.log(postListItem))
            .catch(err => console.log(err));
      }
    }
    res.json({PostsDeleteSuccess:'All the posts associated which you created got deleted successfully'})
  })
  .catch(err => console.log(err));
      
});

/**
 * Post a comment on a Post of a user
 * @route Post api/posts/comments/:id
 * @group Posts
 * @param {string} id.required
 * @param {string} userHandle.body.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */
// @router POST /api/posts/comment/:id
// @desc comment a post based on post id
// @access private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
  //validation
  const {errors, isValid} = validateComment(req.body);
  if(!isValid){
    return res.json(errors);
  }

  Post.findOne({_id:req.params.id})
      .then(post =>{

        if(!post){
          return res.status(400).json({NoPostFound: 'Post not found. Check the post id.'})
        }

        //create a new comment
        const newComment = {
          user: req.user.id,//later it comes from token
          text:req.body.text,
          handle:req.user.handle,//later it comes from token
          name:req.user.name,//later it comes from token
          avatar:req.user.avatar//later it comes from token
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

router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {session: false}), tokenValidator, (req,res)=>{
  //find   a post by post_id
  Post.findById(req.params.post_id)
      .then(post=> {
        //find the comment you want to delete from the comments array in the post
        if(post.comments.filter(comment=>comment._id.toString() === req.params.comment_id).length===0)
        {
          return res.status(400).json({commentUnavailable: 'No comment to be deleted'});
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


/**
 * POST  like based on postId
 * @route POST api/posts/like/:id
 * @group Posts
 * @param {string} id.required
 * @returns {object} 200 - Post by the user
 * @returns {Error}  default - 400 user profile not found
 */
// @access    Private


router.post('/like/:id', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
  
  Post.findById(req.params.id)
      .then(post => {
        // Loop through the likes array in the post collection
        // to check whether the user has liked the post before
        likesLength = post.likes.filter(like => like.user.toString() === req.user.id).length
        console.log(`likes length is like ${likesLength}`);
        //if((post.likes.filter(like => like.user.toString() === req.user.id).length > 0)){
          if(likesLength>0){
          
          // User already liked the post, so user in payload and user in post db are same. 
          //lets take length of the user likes(how many likes this user did) if user liked 1 or more than 1 time 
          //that means,if index will be 0 or more than 0
          //so get the index of one of his likes object and put it in removeIndex
          //so write if removeIndex is 0 or more than 0, that means not -1, then return response that user already liked this post
            // The below sentence does not enable a user who has liked a post to like it again.
            // return res.status(400).json({msg: 'Already liked the post. Cannot relike.'})

            const removeIndex = post.likes.map(like => like.user)
                                        .indexOf(req.user.id);
             console.log(`removeindex in like : ${removeIndex}`);
            if(removeIndex != -1){
              return res.status(400).json({likeError: 'Already liked the post'})
            }                           

          // User found, remove user from likes array
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
      .catch(err => res.status(400).json({UnableToLike: 'Could not like the post as post is not found with this id'}));
})


/**
 * Post unlike a post based on postId
 * @route Post api/posts/unlike/:Id
 * @group Posts
 * @param {string} id.required
 * @param {string} userHandle.body.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */
// @access    Private

router.post('/unlike/:id',passport.authenticate('jwt', {session:false}), tokenValidator, (req,res) =>{
  //find the post which need to be unliked
  Post.findById(req.params.id)
  //check if user already liked the post
      .then(post =>{
        likesLength = post.likes.filter(like=>(like.user.toString() === req.user.id)).length;
        console.log(`likes length is unlike ${likesLength}`);
        if(likesLength === 0){
          //user has not liked the post
          return res.status(400).json({NotAbleToUnLike: 'you wont be able to unlike this post as, You have not yet liked this post'});
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

/**
 * Get Posts liked by a users
 * @route Get api/posts/likedUsers/:postId
 * @group Posts
 * @param {string} id.required
 * @param {string} userHandle.body.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */
// @desc    Get all the likedUser profiles of a post

router.get('/likedUsers/:post_id', passport.authenticate('jwt', {session: false}), tokenValidator, (req, res) => {
  Post.findById(req.params.post_id)
      .then(post => {
        
        if(!isEmpty(post.likes)){
          res.json(post.likes);
          // console.log(post.likes.map(like => Profile.findOne({handle: like.handle})));
        }
      })
      .catch(err => res.json({NoLikes: 'No one has liked this post yet'}));
});

module.exports = router;
