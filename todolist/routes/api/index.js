var express = require('express');
var router = express.Router();

// router.get('/', function(req, res, next) {
//   res.json({ title: 'Express' });
// });

router.use('/todos', require('./todos.route'));

module.exports = router;
