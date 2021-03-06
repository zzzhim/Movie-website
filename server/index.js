const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')

const app = new koa()

const { connect } = require('./database/index')
const router = require('./routes')

;(async () => {
    await connect()

    // require('./tasks/movie')
    // await require('./tasks/api')
    // await require('./crawler/video')
    // await require('./tasks/trailer')
    // await require('./tasks/aliyunOSS')


    app.use(logger())
        .use(cors())
        .use(bodyParser())
        .use(router.routes())

    app.listen(3000, () => {
        console.log('node启动成功')
    })
})()