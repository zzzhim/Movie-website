const Router = require('koa-router')

const router = new Router()

const { base_API } = require('../config/config')

const UserController = require('../Controller/User')

// 前端所有的请求发过来的时候都是http://localhost:3000/api/......
router.prefix(`${base_API}`)

// 注册
router.post('/registered', UserController.registered)
// 登录
router.post('/login', UserController.login)

module.exports = router