const koa = require('koa')
const koaBodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors');

const { connect } = require('./database/index')

;(async () => {
    await connect()

    // require('./tasks/movie')
    require('./crawler/video')

    const routers = require('./routes')

    const app = new koa()

    app.use(logger()).use(cors())

    routers(app)

    app.listen(3000, () => {
        console.log('node启动成功')
    })
})()