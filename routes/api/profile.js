// const express = require('express');
// const Profile = require('../../models/Profile');
// const passport = require('passport');
// const validateProfileInput = require('../../validations/profile');

// const router = express.Router();

// // @router api/profiles/
// // @desc Private
// // @desc get the profile details

// router.get('/', passport.authenticate('jwt', {
//     session: false
// }, (req, res) => {
//     let errors = {};

//     // Find the user from DB
//     Profile.findOne({
//             user: req.user.id
//         })
//         .then(profile => {
//             if (!profile) {
//                 errors.noProfile = "There is no Profile for this User.";
//                 return res.status(400).json(errors)
//             }
//             return res.json(profile);
//         }).catch(err => console.log(err));
// }))

// // @router api/profiles/handle: userhandle
// // @desc Private
// // @desc get the profile details based on the handle name

// router.get('/handle/userhandle', passport.authenticate('jwt', {
//     session: false
// }, (req, res) => {
//     let errors = {};
//     Profile.findOne({
//             handle: req.params.userhandle
//         })
//         .then(profile => {
//             if (!profile) {
//                 errors.noProfile = "There is no profile with that handle.";
//                 return res.status(400).json(errors);
//             }
//             return res.json(profile);
//         }).catch(err => console.log(err));
// }))

// // @router api/profiles/name: username
// // @desc Private
// // @desc get the profile details based on name

// router.get('/name/username', passport.authenticate('jwt', {
//     session: false
// }, (req, res) => {
//     let errors = {};
//     Profile.findOne({
//             name: req.params.username
//         })
//         .then(profile => {
//             if (!profile) {
//                 errors.noProfile = "There is no profile with that name.";
//                 return res.status(400).json(errors);
//             }
//             return res.json(profile);
//         }).catch(err => console.log(err));
// }))

// // @router api/profiles/email: useremail
// // @desc Private
// // @desc get the profile details based on email id

// router.get('/email/useremail', passport.authenticate('jwt', {
//     session: false
// }, (req, res) => {
//     let errors = {};
//     Profile.findOne({
//             email: req.params.useremail
//         })
//         .then(profile => {
//             if (!profile) {
//                 errors.noProfile = "There is no profile with that email.";
//                 return res.status(400).json(errors);
//             }
//             return res.json(profile);
//         }).catch(err => console.log(err));
// }))

// // @router api/profiles/all
// // @desc Private
// // @desc get the profile details of a single user

// router.get('/all', passport.authenticate('jwt', {
//     session: false
// }, (req, res) => {
//     let errors = {};

//     //Find the user from DB
//     Profile.find()
//         .then(profile => {
//             if (!profile) {
//                 errors.noProfile = "There are no profiles.";
//                 return res.status(400).json(errors);
//             }
//             return res.json(profile);
//         }).catch(err => console.log(err));
// }))

// // @router api/profiles/edit
// // @desc Private
// // @desc edit the Profile page

// router.post('/edit', passport.authenticate('jwt', {
//     session: false
// }), (req, res) => {
//     // Validations here.
//     const {
//         errors,
//         isValid
//     } = validateProfileInput(req.body)
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }

//     const profileFields = {};
//     profileFields.user = req.user.id;
//     if (req.body.website) profileFields.website = req.body.website;
//     if (req.body.bio) profileFields.bio = req.body.bio;
//     if (req.body.location) profileFields.location = req.body.location;
//     // Split hobbies into an array
//     if (typeof req.body.hobbies !== 'undefined') {
//         profileFields.hobbies = req.body.hobbies.split(',');
//     }
//     // Split countries visited into an array
//     if (typeof req.body.countries !== 'undefined') {
//         profileFields.countries = req.body.countries.split(',');
//     }
//     // Split favorite places into an array
//     if (typeof req.body.places !== 'undefined') {
//         profileFields.places = req.body.places.split(',');
//     }

//     Profile.findOne({
//             user: req.user.id
//         })
//         .then(profile => {
//             if (profile) {
//                 // Profile exists, update profile
//                 Profile.findOneAndUpdate({
//                         user: req.user.id
//                     }, {
//                         $set: profileFields
//                     }, {
//                         new: true
//                     })
//                     .then(profile => res.json(profile))
//                     .catch(err => console.log(err));
//             }
//         })
//         .catch(err => console.log(err));
// });