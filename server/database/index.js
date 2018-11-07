const mongoose = require('mongoose')

const db = 'mongodb://localhost/blackRide'

require('./schema/movie')
require('./schema/category')
mongoose.Promise = global.Promise


module.exports = {
    connect () {

        let maxConnectTimes = 0

        mongoose.connect(db)

        mongoose.connection.on('disconnected', () => {
            maxConnectTimes++

            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库挂了吧，快去修吧少年')
            }
        })


        mongoose.connection.on('error', err => {
            console.log(err)
            maxConnectTimes++

            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库挂了吧，快去修吧少年')
            }
        })

        mongoose.connection.once('open', () => {

            console.log('MongoDb 连接成功')
        })
    }
}