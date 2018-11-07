module.exports = app => {

    const Router = require('koa-router')

    const router = new Router()

    app.use(router.routes()).use(router.allowedMethods())

    router.get('/', async ctx => {
        ctx.body = 'hello world'
    })
}