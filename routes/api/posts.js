const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load Post model
const Post = require("../../models/Post");

// load Profile model
const Profile = require("../../models/Profile");

// load post validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 }) // sort by date DESC
    .then(posts => res.json(posts)) // 200 OK => sorted posts
    .catch(err => res.status(404).json(err)); // 404 Not found => err
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        return res.status(404).json({ post: "Post not found" }); // 404 => post not found
      }
      res.json(post); // 200 OK => post
    })
    .catch(err => res.status(404).json(err)); // 404 Not found => err
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // check validation
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors); // 400 Bad Request => validation errors
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post)); // 200 OK => post
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ post: "Post not found" }); // 404 => post not found
        }

        // check for post owner (post.user is an ObjectID, which needs to be converted to a string)
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorized: "User not authorized to delete this comment"
          }); // 401 Unauthorized => not your comment to delete
        }

        // delete post
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ post: "Post not found" }); // 404 => post not found
        }

        // if already liked, return 400
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" }); // 400 => user already liked post
        }

        // add user id to likes array
        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ post: "Post not found" }); // 404 => post not found
        }

        // if not liked, return 400
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "User has not liked this post" }); // 400 => user not liked post
        }

        // get remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // splice out of array
        post.likes.splice(removeIndex, 1);
        post.save().then(post => res.json(post)); // 200 => post
      })
      .catch(err => res.status(404).json(err)); // 404 => err
  }
);

// @route   POST api/posts/comment/:post_id
// @desc    Add a comment to a post
// @access  Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate input
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors); // 400 Bad Request => validation errors
    }

    // find post by post id and add comment to it
    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ post: "Post not found" }); // 404 => post not found
        }

        // create comment object
        const newComment = {
          text: req.body.text,
          user: req.user.id,
          name: req.body.name,
          avatar: req.body.avatar
        };

        // add comment to start of comments array
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post)); // 200 OK => post
      })
      .catch(err => res.status(404).json(err)); // 404 => err;
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete a comment from a post
// @access  Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // find post by post id and then remove comment from it
    Post.findById(req.params.post_id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ post: "Post not found" }); // 404 => post not found
        }

        // get remove index of comment in the comments array
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        if (removeIndex === -1) {
          return res
            .status(404)
            .json({ comment: "Comment to delete not found" }); // 404 => comment not found
        } else {
          // remove comment from comments array
          post.comments.splice(removeIndex, 1);
          post.save().then(post => res.json(post)); // 200 OK => post
        }
      })
      .catch(err => res.status(404).json(err)); // 404 => err;
  }
);

module.exports = router;
