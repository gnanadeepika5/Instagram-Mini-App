const express = require("express");
const Profile = require("../../models/Profile");
const passport = require("passport");
const validateProfileInput = require("../../validations/profile");
const Logout = require('../../models/Logout');
const tokenValidator = require('../../config/tokenValidator');

const router = express.Router();

/**
 * Get profile of user
 * @route Get api/profile/:id
 * @group Profile
 * @param {string} id.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */

// @router  api/profile
// @access  Private
// @desc    get the profile details of a single user
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};
    // Find the user from the database
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile for this user.';
                return res.status(400).json(errors)
            }
            return res.json(profile);
        })
        .catch(err => console.log(err));
});

/**
 * Get profile of user
 * @route Get api/profile/handle/:userHandle
 * @group Profile
 * @param {string} id.required
 * @param {string} userHandle.body.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */

// @router api/profiles/handle: userhandle
// @access PRIVATE
// @desc   get the profile details based on handle name
router.get('/handle/:userhandle', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};
    Profile.findOne({
            handle: req.params.userhandle
        })
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile with that handle.';
                return res.status(400).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => console.log(err));
})

/**
 * Get profile of user by userName
 * @route Get api/profile/name/:userName
 * @group Profile
 * @param {string} id.required
 * @param {string} userName.query.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */

// @router api/profiles/name: username
// @access PRIVATE
// @desc   get the profile details based on name
router.get('/name/:username', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};
    Profile.findOne({
            name: req.params.username
        })
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile with that name.';
                return res.status(400).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => console.log(err));
})

/**
 * Get profile of user by email
 * @route Get api/profile/email:userEmail
 * @group Profile
 * @param {string} id.required
 * @param {string} userHandle.body.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */

// @router api/profiles/email: useremail
// @access PRIVATE
// @desc   get the profile details based on email
router.get('/email/:useremail', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};
    Profile.findOne({
            email: req.params.useremail
        })
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There is no profile with that email.';
                return res.status(400).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => console.log(err));
})

/**
 * Get profile of all user
 * @route Get api/profile/all
 * @group Profile
 * @param {string} id.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */

// @router  api/profiles/all
// @access  Private
// @desc    get the profile details of a single user
router.get('/all', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};
    // Find the user from the database

    Profile.find()
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'There are no profiles.';
                return res.status(400).json(errors)
            }
            return res.json(profile);
        })
        .catch(err => console.log(err));
});

/**
 * Edit profile of user
 * @route Post api/profile/edit
 * @group Profile
 * @param {string} id.required
 * @param {string} userHandle.body.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */

// @router  api/profiles/edit
// @access  Private
// @desc    edit the profile page
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Validations here.
    const {
        errors,
        isValid
    } = validateProfileInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.location) profileFields.location = req.body.location;
    // Split hobbies into an array
    if (typeof req.body.hobbies !== 'undefined') {
        profileFields.hobbies = req.body.hobbies.split(',');
    }
    // Split countries visited into an array
    if (typeof req.body.countries !== 'undefined') {
        profileFields.countries = req.body.countries.split(',');
    }
    // Split favorite places into an array
    if (typeof req.body.places !== 'undefined') {
        profileFields.places = req.body.places.split(',');
    }

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (profile) {
                // Profile exists, update profile
                Profile.findOneAndUpdate({
                        user: req.user.id
                    }, {
                        $set: profileFields
                    }, {
                        new: true
                    })
                    .then(profile => res.json(profile))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
});

// @router  api/profiles/follow/handle/:handle
// @access  Private
// @desc    Following a user whose userhandle + avatar is passed in route
router.post('/follow/handle/:handle', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    // Add req.params.handle to following[] of req.user
    Profile.findOne({
            email: req.user.email
        })
        .then(profile => {

            // Check if following[] of req.user has req.params.handle
            if ((profile.following.filter(item => item.handle === req.params.handle).length > 0) ||
                (req.params.handle === req.user.handle)) {
                // User already following the handle
                return res.status(400).json({
                    error: 'invalid request'
                });
            }

            // Add the removed first characters(in UI) back into req.params.avatar
            // const stitchedAvatarLink = `//www.gravatar.com/avatar/${req.params.avatarId}s=300&r=g&d=mm`;
            const avatarUrl = req.body.avatarUrl;
            console.log(`Stitched Avatar link: ${avatarUrl}`)
            // Add req.params.handle to following[] list of req.user
            const newFollowing = {
                handle: req.params.handle,
                avatar: avatarUrl,
            }

            profile.following.unshift(newFollowing);
            profile.save()
                .then(() => res.json(profile))
                .catch(err => console.log(err));

            // Add req.user to followers[] list of req.params.handle
            Profile.findOne({
                    handle: req.params.handle
                })
                .then(profile => {

                    // Check if the follower of req.params.handle has req.user
                    if ((profile.followers.filter(item => item.handle === req.user.handle).length > 0) ||
                        (req.user.handle === req.params.handle)) {
                        // Invalid addition to followers array of req.params.handle
                        return res.status(400).json({
                            invalid: 'invalid request'
                        });
                    }

                    const newFollower = {
                        handle: req.user.handle,
                        avatar: req.user.avatar,
                        name: req.user.name
                    }

                    profile.followers.unshift(newFollower);
                    profile.save()
                        .then(() => res.json(profile))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

/**
 * POST profile unfollow
 * @route Get api/profile/unfollow/handle
 * @group Profile
 * @param {string} id.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */

// @router  api/profiles/unfollow/handle/:handle
// @access  Private
// @desc    Following a user whose userhandle is passed in route
router.post('/unfollow/handle/:handle', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    // remove req.params.handle from following[] of req.user
    Profile.findOne({
            email: req.user.email
        })
        .then(profile => {

            // Check if following[] of req.user has req.params.handle
            if (profile.following.filter(item => item.handle === req.params.handle).length === 0) {
                // User not in the following array
                return res.status(400).json({
                    inValid: 'Invalid request'
                });
            }

            // identify req.params index from the following[] array 
            // remove req.params from following[] of req.users
            const removeIndex = profile.following.map(item => item.handle)
                .indexOf(req.params.handle);
            // Splice the array
            profile.following.splice(removeIndex, 1);

            // Save
            profile.save()
                .then(() => res.json(profile))
                .catch(err => console.log(err));

            // remove req.user from followers[] of req.params.handle
            Profile.findOne({
                    handle: req.params.handle
                })
                .then(profile => {
                    // Check if followers[] of req.params.handle has req.user
                    if (profile.followers.filter(item => item.handle === req.user.handle).length === 0) {
                        // req.user not in the followers[] of req.params.handle. cannot perform remove operation
                        return res.json({
                            inValid: 'InValid request'
                        })
                    }

                    // identify the index of req.user from the followers[]
                    // remove req.user from followers[] of req.params.handle
                    const removeIndex = profile.followers.map(item => item.handle)
                        .indexOf(req.user.handle);

                    // Splice the array
                    profile.followers.splice(removeIndex, 1);

                    // Save
                    profile.save()
                        .then(() => res.json(profile))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

// @router  api/profiles/following/handle/:handle
// @access  Private
// @desc    Get the list of people whom the user is following given the userHandle
router.get('/following/handle/:handle', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {}
    Profile.findOne({
            handle: req.params.handle
        })
        .then(profile => {
            if (isEmpty(profile.following) && profile.following[0] !== "") {
                errors.followingNone = 'You are not following anyone.';
                return res.status(400).json(errors)
            }
            return res.json(profile.following);
        })
        .catch(err => console.log(err));
})

// router api/profiles/followers/handle/:handle
// @access Private
// @desc Get the list of followers of a user given the userHandle
router.get('/followers/handle/:handle', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {}
    Profile.findOne({
            handle: req.params.handle
        })
        .then(profile => {
            if (isEmpty(profile.followers) && profile.followers[0] !== "") {
                errors.noFollowers = 'You do not have any followers';
                return res.status(400).json(errors);
            }
            return res.json(profile.followers);
        })
        .catch(err => console.log(err));
})

/**
 * DELETE profile 
 * @route DELETE api/profile
 * @group Profile
 * @param {string} id.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */

//@route DELETE api/profile
//@desc Delete user and profile
//@access Private

router.delete(
    "/",
    passport.authenticate("jwt", {
        session: false
    }), tokenValidator,
    (req, res) => {
        Profile.findOneAndRemove({
            user: req.user.id
        }).then(() => {
            User.findOneAndRemove({
                _id: req.user.id
            }).then(() =>
                res.json({
                    success: true
                })
            );
        });
    }
);

module.exports = router;