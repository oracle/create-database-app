const express = require('express');
const router = express.Router();

// Require controller module
const tasksController = require('../utils/rest-services/tasks.cjs');

// Get tasks
router.get('/', async (req, res, next) => {
    try {
        const tasks = await tasksController.getTasks();
        res.send(tasks.rows);
        next();
    } catch (error) {
        next(error);
    }
});

// Get task by ID
router.get('/:id', async (req, res, next) => {
    try {
        const binds = {
            id: req.params.id
        }
        const task = await tasksController.getTaskById(binds);
        res.send(task.rows);
        next();
    } catch (error) {
        next(error);
    }
});

// Save task
router.post('/', async (req, res, next) => {
    try {
        const binds = req.body;
        const task = await tasksController.saveTask(binds);
        res.send(task.rows);
        next();
    } catch (error) {
        next(error);
    }
});

// Update task
router.put('/:id', async (req, res, next) => {
    try {
        const binds = {
            ...req.body,
            id: req.params.id
        };
        const task = await tasksController.updateTask(binds);
        res.send(task.rpws);
        next();
    } catch (error) {
        next(error);
    }
});

// Delete task
router.delete('/:id', async (req, res, next) => {
    try {
        const binds = {
            id: req.params.id
        };
        const task = await tasksController.deleteTask(binds);
        res.send(task.rows);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
