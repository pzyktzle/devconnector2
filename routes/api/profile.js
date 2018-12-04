const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load Profile model
const Profile = require("../../models/Profile");

// load User model
const User = require("../../models/User");

// load Profile validation
const validateProfileInput = require("../../validation/profile");

// load experience validation
const validateExperienceInput = require("../../validation/experience");

// load education validation
const validateEducationInput = require("../../validation/education");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }), // authenticates req.user (populated if authenticated)
  (req, res) => {
    let errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"]) // populate "user" with fields from the referenced "users" model
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No profile for this user";
          return res.status(404).json(errors); // 404 Not Found => No profile
        }
        res.json(profile); // 200 OK => profile
      })
      .catch(err => res.status(404).json(err)); // 404 Not found => some internal server error or some shit
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public (but a backend API route - accessed only by the frontend, not directly)
router.get("/all", (req, res) => {
  let errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors); // 404 Not found => No profiles
      }
      res.json(profiles); // 200 OK => All profiles
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" })); // 404 Not found => No profiles
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public (but a backend API route - accessed only by the frontend, not directly)
router.get("/handle/:handle", (req, res) => {
  let errors = {};
  Profile.findOne({ handle: req.params.handle }) // req.params holds route parameters in the path portion of the URL (eg. :handle) as opposed to req.query which contains parameters after the "?" part of the URL
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile for this user";
        res.status(404).json(errors); // 404 Not found => No profile
      }
      res.json(profile); // 200 OK => profile
    })
    .catch(err => res.status(404).json(err)); // 404 Not found => some error
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public (but a backend API route - accessed only by the frontend, not directly)
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id }) // req.params holds route parameters in the path portion of the URL (eg. :handle) as opposed to req.query which contains parameters after the "?" part of the URL
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile for this user";
        res.status(404).json(errors); // 404 Not found => No profile
      }
      res.json(profile); // 200 OK => profile
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    ); // 404 Not found => some error
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }), // authenticates req.user (populated if authenticated)
  (req, res) => {
    // check validation
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors); // 400 Bad Request => profile.js validation errors
    }

    /*
     *  get all profile fields
     */
    let profileFields = {};
    profileFields.user = req.user.id; // Profile schema defines "user" as an ObjectId reference to the "users" model (fields from the "users" model can be populated into "user" e.g. user.name, user.avatar)
    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }
    if (req.body.company) {
      profileFields.company = req.body.company;
    }
    if (req.body.website) {
      profileFields.website = req.body.website;
    }
    if (req.body.location) {
      profileFields.location = req.body.location;
    }
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }
    if (req.body.status) {
      profileFields.status = req.body.status;
    }
    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername;
    }
    // skills => split into array from comma separated values
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // social => get all fields
    profileFields.social = {};
    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube;
    }
    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter;
    }
    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook;
    }
    if (req.body.linkedin) {
      profileFields.social.linkedin = req.body.linkedin;
    }
    if (req.body.instagram) {
      profileFields.social.instagram = req.body.instagram;
    }

    // find Profile for current user
    Profile.findOne({ user: profileFields.user }).then(profile => {
      if (profile) {
        // update Profile
        Profile.findOneAndUpdate(
          { user: profileFields.user },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile)); // 200 OK => updated profile
      } else {
        // check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "Handle already exists";
            res.status(400).json(errors); // 400 Bad Request => Handle already exists
          }

          // create new Profile for User
          new Profile(profileFields).save().then(profile => res.json(profile)); // 200 OK => new profile
        });
      }
    });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }), // authenticates req.user (populated if authenticated)
  (req, res) => {
    // check validation
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors); // 400 Bad Request => experience.js validation errors
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        let errors = {};
        if (!profile) {
          errors.noprofile = "No profile for this user";
          return res.status(404).json(errors); // 404 Not found => No profile
        }

        let newExperience = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // add to experience array
        profile.experience.unshift(newExperience); // unshift adds to beginning of array (push adds to the end)
        profile.save().then(profile => res.json(profile)); // 200 OK => profile with new experience added
      })
      .catch(err => res.status(404).json(err)); // 404 Not found => some error;
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }), // authenticates req.user (populated if authenticated)
  (req, res) => {
    // check validation
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors); // 400 Bad Request => experience.js validation errors
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        let errors = {};
        if (!profile) {
          errors.noprofile = "No profile for this user";
          return res.status(404).json(errors); // 404 Not found => No profile
        }

        let newEducation = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // add to experience array
        profile.education.unshift(newEducation); // unshift adds to beginning of array (push adds to the end)
        profile.save().then(profile => res.json(profile)); // 200 OK => profile with new experience added
      })
      .catch(err => res.status(404).json(err)); // 404 Not found => some error;
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }), // authenticates req.user (populated if authenticated)
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        if (removeIndex !== -1) {
          // splice out of array and save
          profile.experience.splice(removeIndex, 1);
          profile.save().then(profile => res.json(profile)); // 200 OK => profile
        } else {
          return res.status(404).json({
            experience: `Experience not found for id ${req.params.exp_id}`
          });
        }
      })
      .catch(err => res.status(404).json(err)); // 404 Not found => some error;
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }), // authenticates req.user (populated if authenticated)
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        if (removeIndex !== -1) {
          // splice out of array and save
          profile.education.splice(removeIndex, 1);
          profile.save().then(profile => res.json(profile)); // 200 OK => profile
        } else {
          return res.status(404).json({
            education: `Education not found for id ${req.params.edu_id}`
          });
        }
      })
      .catch(err => res.status(404).json(err)); // 404 Not found => some error;
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }), // authenticates req.user (populated if authenticated)
  (req, res) => {
    // delete profile of user
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      // delete user
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
