const express = require('express');
const router = express.Router();
const tasks = require('../controllers/tasks');

router.route('/:id')
    .get(tasks.getTaskById)
    .put(tasks.updateTask)
    .delete(tasks.deleteTask);

router.post('/', tasks.createTask);
router.get('/all/:status/:capa', tasks.getTasks);
router.post('/export', tasks.dumpTasks);
router.get('/project/:id', tasks.getProjectTaskList);

 module.exports = router;