import express from 'express'
import {index} from '../controllers/todo.controller'

const router = express.Router();

/* GET home page. */
router.get('/', index)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// module.exports = router;
export default router
