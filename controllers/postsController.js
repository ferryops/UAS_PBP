// controllers/postsController.js
const pool = require("../config/db");

// GET all posts
const getAllPosts = async (req, res) => {
  try {
    const [posts] = await pool.execute("SELECT * FROM posts");
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// GET a specific post by ID
const getPostById = async (req, res) => {
  const { post_id } = req.params;
  try {
    const [post] = await pool.execute("SELECT * FROM posts WHERE post_id = ?", [post_id]);
    res.json(post[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// POST a new post
const createPost = async (req, res) => {
  const { user_id, title, content, tags } = req.body;
  try {
    await pool.execute("INSERT INTO posts (user_id, title, content, tags) VALUES (?, ?, ?, ?)", [user_id, title, content, tags]);

    const [newPost] = await pool.execute("SELECT * FROM posts WHERE post_id = LAST_INSERT_ID()");
    res.json(newPost[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// PUT/update a post by ID
const updatePost = async (req, res) => {
  const { post_id } = req.params;
  const { user_id, title, content, tags } = req.body;
  try {
    await pool.execute("UPDATE posts SET user_id = ?, title = ?, content = ?, tags = ? WHERE post_id = ?", [
      user_id,
      title,
      content,
      tags,
      post_id,
    ]);

    const [updatedPost] = await pool.execute("SELECT * FROM posts WHERE post_id = ?", [post_id]);
    res.json(updatedPost[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// DELETE a post by ID
const deletePost = async (req, res) => {
  const { post_id } = req.params;
  try {
    await pool.execute("DELETE FROM posts WHERE post_id = ?", [post_id]);
    res.json("Post deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
