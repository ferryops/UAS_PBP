// routes/postsRoute.js
const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// GET all posts
router.get("/", postsController.getAllPosts);

// GET a specific post by ID
router.get("/:post_id", postsController.getPostById);

// POST a new post
router.post("/", postsController.createPost);

// PUT/update a post by ID
router.put("/:post_id", postsController.updatePost);

// DELETE a post by ID
router.delete("/:post_id", postsController.deletePost);

module.exports = router;
