
import express from 'express'
import {find} from '../../controllers/api/todo.controller'
import {ins} from '../../controllers/api/todo.controller'
import {upd} from '../../controllers/api/todo.controller'
import {del} from '../../controllers/api/todo.controller'
import {show} from '../../controllers/api/todo.controller'
import {search} from '../../controllers/api/todo.controller'

const router = express.Router()

router.route('/').get(find)

router.route('/show').get(show)

router.route('/').post(ins)

router.route('/').put(upd)

router.route('/').delete(del)

router.route('/search').post(search)


export default router