const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const mongoose = require('mongoose');

let memoryTasks = [];
let nextId = 1;

router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required and cannot be empty.' });
    }

    if (process.env.USE_ARRAY_FALLBACK === "true") {
      const newTask = {
        _id: String(nextId++),
        title,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      memoryTasks.unshift(newTask);
      return res.status(201).json(newTask);
    }
    
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    if (process.env.USE_ARRAY_FALLBACK === "true") {
      return res.status(200).json(memoryTasks);
    }

    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (process.env.USE_ARRAY_FALLBACK === "true") {
      const index = memoryTasks.findIndex(t => t._id === id);
      if (index === -1) return res.status(404).json({ error: 'Task not found' });
      const task = memoryTasks.splice(index, 1)[0];
      return res.status(200).json({ message: 'Task deleted successfully', task });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, title } = req.body;

    if (process.env.USE_ARRAY_FALLBACK === "true") {
      const task = memoryTasks.find(t => t._id === id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      
      if (status) task.status = status;
      if (title) task.title = title;
      
      return res.status(200).json(task);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (status) task.status = status;
    if (title) task.title = title;
    
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
