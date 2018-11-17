const Router = require('koa-router')

const router = new Router()

const { base_API } = require('../config/config')

const UserController = require('../Controller/User')
const MovieController = require('../Controller/Movie')

const checkToken = require('../utils/checkToken')

// 前端所有的请求发过来的时候都是http://localhost:3000/api/......
router.prefix(`${base_API}`)

// 注册
router.post('/registered', UserController.registered)
// 登录
router.post('/login', UserController.login)

// 首页
router.get('/home', checkToken, MovieController.home)

// 分类
router.get('/classIfication', checkToken, MovieController.classIfication)

module.exports = router