const koa = require('koa')
const koaBodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors');

const { connect } = require('./database/index')

;(async () => {
    await connect()

    // require('./tasks/movie')
    // require('./tasks/api')
    // require('./crawler/video')
    // require('./tasks/trailer')
    require('./tasks/aliyunOSS')


    const routers = require('./routes')

    const app = new koa()

    app.use(logger()).use(cors())

    routers(app)

    app.listen(3000, () => {
        console.log('node启动成功')
    })
})()