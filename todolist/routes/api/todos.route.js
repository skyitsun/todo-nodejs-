const express = require('express');
const router = express.Router();

const controller = require('../../controllers/todo/todo.controller');

router.route('/').get(controller.get)

module.exports = router;