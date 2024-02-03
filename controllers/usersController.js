// controllers/usersController.js
const pool = require("../config/db");

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.execute("SELECT * FROM users");
    console.log(users);
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
    const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    res.json(user[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// POST a new user
const createUser = async (req, res) => {
  const { username, password, name, token } = req.body;
  try {
    await pool.execute("INSERT INTO users (username, password, name, token) VALUES (?, ?, ?, ?)", [
      username,
      password,
      name,
      token,
    ]);

    const [newUser] = await pool.execute("SELECT * FROM users WHERE id = LAST_INSERT_ID()");
    res.json(newUser[0]);
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
    await pool.execute("UPDATE users SET username = ?, password = ?, name = ?, token = ? WHERE id = ?", [
      username,
      password,
      name,
      token,
      id,
    ]);

    const [updatedUser] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    res.json(updatedUser[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// DELETE a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute("DELETE FROM users WHERE id = ?", [id]);
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
