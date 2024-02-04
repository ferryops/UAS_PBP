// controllers/usersController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// GET a specific user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// POST a new user
const createUser = async (req, res) => {
  const { username, password, name, token } = req.body;
  try {
    const newUser = await prisma.users.create({
      data: {
        username,
        password,
        name,
        token,
      },
    });
    res.json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// PUT/update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, name, token } = req.body;
  try {
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        username,
        password,
        name,
        token,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// DELETE a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.users.delete({
      where: { id: parseInt(id) },
    });
    res.json("User deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
