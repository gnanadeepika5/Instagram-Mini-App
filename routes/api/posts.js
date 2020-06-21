const express = require('express');
const Post = require('../../models/Post');
const router = express.Router();
// //test route from posts
// router.get('/Post', (req,res) => res.json({msg:'posts worked'}));


// @route   POST api/users/AddPost
// @desc    Add  new Post
// // @access  public 
// router.post('/newPost', (req, res) =>
// {
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



