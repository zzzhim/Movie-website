const koa = require('koa')

const app = new koa()

app.listen(3000, () => {
    console.log('node启动成功')
})