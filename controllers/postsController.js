// controllers/postsController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.posts.findMany();
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
    const post = await prisma.posts.findUnique({
      where: { post_id: parseInt(post_id) },
    });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// POST a new post
const createPost = async (req, res) => {
  const { user_id, title, content, tags } = req.body;
  try {
    const newPost = await prisma.posts.create({
      data: {
        user_id,
        title,
        content,
        tags,
      },
    });
    res.json(newPost);
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
    const updatedPost = await prisma.posts.update({
      where: { post_id: parseInt(post_id) },
      data: {
        user_id,
        title,
        content,
        tags,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// DELETE a post by ID
const deletePost = async (req, res) => {
  const { post_id } = req.params;
  try {
    await prisma.posts.delete({
      where: { post_id: parseInt(post_id) },
    });
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
