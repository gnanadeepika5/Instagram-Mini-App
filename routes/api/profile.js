const express = require("express");
const Profile = require("../../models/Profile");
const passport = require("passport");
const validateProfileInput = require("../../validations/profile");
const validateExperienceInput = require("../../validations/experience");
const validateEducationInput = require("../../validations/education");
const Logout = require('../../models/Logout');
const tokenValidator = require('../../config/tokenValidator');

const router = express.Router();

/**
 * Get profile of user
 * @route Get api/profiles/:id
 * @group Profile
 * @param {string} id.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */
// @router GET api/profile
// @desc Private
// @desc get the profile details

router.get(
    "/",
    passport.authenticate("jwt", {
        session: false,
    }), tokenValidator,
    (req, res) => {
        const errors = {};

        // Find the user from DB
        Profile.findOne({
                user: req.user.id,
            })
            .populate("user", ["name", "avatar"])
            .then((profile) => {
                if (!profile) {
                    errors.noProfile = "There is no Profile for this User.";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch((err) => console.log(err));
    }
);

/**
 * Get profile of user
 * @route Get api/profiles/handle/:userHandle
 * @group Profile
 * @param {string} id.required
 * @param {string} userHandle.body.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */
// @router GET api/profiles/handle: userhandle
// @desc Private
// @desc get the profile details based on the handle name

router.get(
    "/handle/:userhandle",
    passport.authenticate("jwt", {
        session: false,
    }), tokenValidator,
    (req, res) => {
        const errors = {};

        Profile.findOne({
                handle: req.params.userhandle,
            })
            .populate("user", ["name", "avatar"])
            .then((profile) => {
                if (!profile) {
                    errors.noProfile = "There is no profile with that handle.";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch((err) => console.log(err));
    }
);

/**
 * Get profile of user by userName
 * @route Get api/profiles/name/:userName
 * @group Profile
 * @param {string} id.required
 * @param {string} userName.query.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */
// @router GET api/profiles/name: username
// @desc Private
// @desc get the profile details based on name
router.get(
    "/name/:username",
    passport.authenticate("jwt", {
        session: false,
    }), tokenValidator,
    (req, res) => {
        const errors = {};

        Profile.findOne({
                name: req.params.username,
            })
            .populate("user", ["name", "avatar"])
            .then((profile) => {
                if (!profile) {
                    errors.noProfile = "There is no profile with that name.";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch((err) => console.log(err));
    }
);

/**
 * Get profile of user by email
 * @route Get api/profiles/email:userEmail
 * @group Profile
 * @param {string} id.required
 * @param {string} userHandle.body.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */

// @router GET api/profiles/email: useremail
// @desc Private
// @desc get the profile details based on email id

router.get(
    "/email/:useremail",
    passport.authenticate("jwt", {
        session: false,
    }), tokenValidator,
    (req, res) => {
        const errors = {};
        Profile.findOne({
                email: req.params.useremail,
            })
            .populate("user", ["name", "avatar"])
            .then((profile) => {
                if (!profile) {
                    errors.noProfile = "There is no profile with that email.";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch((err) => console.log(err));
    }
);

/**
 * Get profile of all user
 * @route Get api/profiles/all
 * @group Profile
 * @param {string} id.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */
// @router api/profiles/all
// @desc Private
// @desc get the profile details of a single user

router.get(
    "/all",
    passport.authenticate("jwt", {
        session: false,
    }), tokenValidator,
    (req, res) => {
        const errors = {};

        //Find the user from DB
        Profile.find()
            .populate("user", ["name", "avatar"])
            .then((profile) => {
                if (!profile) {
                    errors.noProfile = "There are no profiles.";
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch((err) => console.log(err));
    }
);

/**
 * Edit profile of user
 * @route Post api/profiles/edit
 * @group Profile
 * @param {string} id.required
 * @param {string} userHandle.body.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */
// @router POST api/profiles/edit
// @desc Private
// @desc edit the Profile page

router.post(
    "/",
    passport.authenticate("jwt", {
        session: false,
    }), tokenValidator,
    (req, res) => {
        // Validations here.
        const {
            errors,
            isValid
        } = validateProfileInput(req.body);
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        // Get Fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.location) profileFields.location = req.body.location;
        // Split hobbies into an array
        if (typeof req.body.hobbies !== "undefined") {
            profileFields.hobbies = req.body.hobbies.split(",");
        }
        // Split countries visited into an array
        if (typeof req.body.countries !== "undefined") {
            profileFields.countries = req.body.countries.split(",");
        }
        // Split favorite places into an array
        if (typeof req.body.places !== "undefined") {
            profileFields.places = req.body.places.split(",");
        }
        // Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

        Profile.findOne({
            user: req.user.id
        }).then((profile) => {
            if (profile) {
                // Update
                Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {
                    new: true
                }).then((profile) => res.json(profile));
            } else {
                // Create

                // Check if handle exists
                Profile.findOne({
                    handle: profileFields.handle
                }).then((profile) => {
                    if (profile) {
                        errors.handle = "That handle already exists";
                        return res.status(400).json(errors);
                    }
                    // Save Profile
                    new Profile(profileFields)
                        .save()
                        .then((profile) => res.json(profile));
                });
            }
        });
    }
);

// @router  POST api/profiles/follow/handle/:handle
// @access  Private
// @desc    Following a user whose userhandle + avatar is passed in route
router.post(
    "/follow/handle/:handle/:avatarId",
    passport.authenticate("jwt", {
        session: false,
    }), tokenValidator,
    (req, res) => {
        // Add req.params.handle to following[] of req.user
        Profile.findOne({
                email: req.user.email,
            })
            .then((profile) => {
                // Check if following[] of req.user has req.params.handle
                if (
                    profile.following.filter((item) => item.handle === req.params.handle)
                    .length > 0 ||
                    req.params.handle === req.user.handle
                ) {
                    // User already following the handle
                    res.status(400).json({
                        error: "invalid request",
                    });
                }

                // Add req.params.handle to following[] list of req.user
                const newFollowing = {
                    handle: req.params.handle,
                    avatar: req.params.avatar,
                    name: req.params.name,
                };

                profile.following.unshift(newFollowing);
                profile
                    .save()
                    .then(() => res.json(profile))
                    .catch((err) => console.log(err));

                // Add req.user to followers[] list of req.params.handle
                Profile.findOne({
                        handle: req.params.handle,
                    })
                    .then((profile) => {
                        // Check if the follower of req.params.handle has req.user
                        if (
                            profile.followers.filter(
                                (item) => item.handle === req.user.handle
                            ).length > 0 ||
                            req.user.handle === req.params.handle
                        ) {
                            // Invalid addition to followers array of req.params.handle
                            res.status(400).json({
                                invalid: "invalid request",
                            });
                        }

                        const newFollower = {
                            handle: req.user.handle,
                            avatar: req.user.avatar,
                            name: req.user.name,
                        };

                        profile.followers.unshift(newFollower);
                        profile
                            .save()
                            .then(() => res.json(profile))
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }
);

/**
 * Get profile of user
 * @route Get api/profiles/unfollow
 * @group Profile
 * @param {string} id.required
 * @returns {object} 200 - Profile of user
 * @returns {Error}  default - 400 user profile not found
 */
// @router  POST api/profiles/unfollow/handle/:handle
// @access  Private
// @desc    Following a user whose userhandle is passed in route
router.post(
    "/unfollow/handle/:handle",
    passport.authenticate("jwt", {
        session: false,
    }), tokenValidator,
    (req, res) => {
        // remove req.params.handle from following[] of req.user
        Profile.findOne({
                email: req.user.email,
            })
            .then((profile) => {
                // Check if following[] of req.user has req.params.handle
                if (
                    profile.following.filter((item) => item.handle === req.params.handle)
                    .length === 0
                ) {
                    // User not in the following array
                    res.status(400).json({
                        inValid: "Invalid request",
                    });
                }

                // identify req.params index from the following[] array
                // remove req.params from following[] of req.users
                const removeIndex = profile.following
                    .map((item) => item.handle)
                    .indexOf(req.params.handle);
                // Splice the array
                profile.following.splice(removeIndex, 1);

                // Save
                profile
                    .save()
                    .then(() => res.json(profile))
                    .catch((err) => console.log(err));

                // remove req.user from followers[] of req.params.handle
                Profile.findOne({
                        handle: req.params.handle,
                    })
                    .then((profile) => {
                        // Check if followers[] of req.params.handle has req.user
                        if (
                            profile.followers.filter(
                                (item) => item.handle === req.user.handle
                            ).length === 0
                        ) {
                            // req.user not in the followers[] of req.params.handle. cannot perform remove operation
                            res.json({
                                inValid: "InValid request",
                            });
                        }

                        // identify the index of req.user from the followers[]
                        // remove req.user from followers[] of req.params.handle
                        const removeIndex = profile.followers
                            .map((item) => item.handle)
                            .indexOf(req.user.handle);

                        // Splice the array
                        profile.followers.splice(removeIndex, 1);

                        // Save
                        profile
                            .save()
                            .then(() => res.json(profile))
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }
);

// @router  GET api/profiles/following/handle/:handle
// @access  Private
// @desc    Get the list of people whom the user is following given the userHandle
router.get(
    "/following/handle/:handle",
    passport.authenticate("jwt", {
        session: false,
    }), tokenValidator,
    (req, res) => {
        const errors = {};
        Profile.findOne({
                handle: req.params.handle,
            })
            .then((profile) => {
                if (isEmpty(profile.following) && profile.following[0] !== "") {
                    errors.followingNone = "You are not following anyone.";
                    return res.status(400).json(errors);
                }
                res.json(profile.following);
            })
            .catch((err) => console.log(err));
    }
);

// router GET api/profiles/followers/handle/:handle
// @access Private
// @desc Get the list of followers of a user given the userHandle
router.get(
    "/followers/handle/:handle",
    passport.authenticate("jwt", {
        session: false,
    }), tokenValidator,
    (req, res) => {
        const errors = {};
        Profile.findOne({
                handle: req.params.handle,
            })
            .then((profile) => {
                if (isEmpty(profile.followers) && profile.followers[0] !== "") {
                    errors.noFollowers = "You do not have any followers";
                    return res.status(400).json(errors);
                }
                res.json(profile.followers);
            })
            .catch((err) => console.log(err));
    }
);

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

//@route POST api/profile/experience
//@desc Add experience to profile
//@access Private

router.post('/experience', passport.authenticate('jwt', {
    session: false
}), tokenValidator, (req, res) => {
    const {
        errors,
        isValid
    } = validateExperienceInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({
        user: req.user.id
    }).then((profile) => {
        if (!profile) {
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
        }
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        };

        // Add to exp array
        profile.experience.unshift(newExp);

        profile.save().then((profile) => res.json(profile));
    });
});

//@route POST api/profile/education
//@desc Add education to profile
//@access Private

router.post('/education', passport.authenticate('jwt', {
    session: false
}), tokenValidator, (req, res) => {
    const {
        errors,
        isValid
    } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({
        user: req.user.id
    }).then((profile) => {
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        };

        // Add to exp array
        profile.education.unshift(newEdu);

        profile.save().then((profile) => res.json(profile));
    });
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
    "/experience/:exp_id",
    passport.authenticate("jwt", {
        session: false
    }), tokenValidator,
    (req, res) => {
        let errors = {};
        Profile.findOne({
                user: req.user.id
            })
            .then((profile) => {
                // Get remove index
                const removeIndex = profile.experience
                    .map((item) => item.id)
                    .indexOf(req.params.exp_id);

                if (removeIndex === -1) {
                    errors.experiencenotfound = "Experience not found";
                    // Return any errors with 404 status
                    return res.status(404).json(errors);
                }
                // Splice out of array
                profile.experience.splice(removeIndex, 1);

                // Save
                profile.save().then((profile) => res.json(profile));
            })
            .catch((err) => res.status(404).json(err));
    }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
    "/education/:edu_id",
    passport.authenticate("jwt", {
        session: false
    }), tokenValidator,
    (req, res) => {
        Profile.findOne({
                user: req.user.id
            })
            .then((profile) => {
                // Get remove index
                const removeIndex = profile.education
                    .map((item) => item.id)
                    .indexOf(req.params.edu_id);

                if (removeIndex === -1) {
                    errors.educationnotfound = "Education not found";
                    // Return any errors with 404 status
                    return res.status(404).json(errors);
                }

                // Splice out of array
                profile.education.splice(removeIndex, 1);

                // Save
                profile.save().then((profile) => res.json(profile));
            })
            .catch((err) => res.status(404).json(err));
    }
);

module.exports = router;