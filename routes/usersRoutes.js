// routes/usersRoute.js
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// GET all users
router.get("/", usersController.getAllUsers);

// GET a specific user by ID
router.get("/:id", usersController.getUserById);

// POST a new user
router.post("/", usersController.createUser);

// PUT/update a user by ID
router.put("/:id", usersController.updateUser);

// DELETE a user by ID
router.delete("/:id", usersController.deleteUser);

module.exports = router;
