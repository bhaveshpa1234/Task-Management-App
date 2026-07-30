const express = require("express");

const { createTask, getTasks } = require("../controllers/taskController");
const { updateTask } = require("../controllers/taskController");
const { deleteTask } = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
