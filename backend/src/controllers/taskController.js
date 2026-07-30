const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { name, time, description, isImportant } = req.body;

    if (!name || !time) {
      return res.status(400).json({
        message: "Name and time are required",
      });
    }

    const task = await Task.create({
      name,
      time,
      description,
      isImportant,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;

    const search = req.query.search || "";

    const query = {
      user: req.user._id,
      name: { $regex: search, $options: "i" },
    };

    const totalTasks = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      tasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};