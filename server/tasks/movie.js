const mongoose = require('mongoose')

const Movie = mongoose.model('Movie')
const cp = require('child_process')

const { resolve } = require('path')
const script = resolve(__dirname, '../crawler/pa.js')
const child = cp.fork(script, []) // 启动一个子进程运行script

child.on('error', err => {
    console.log(err);
})

child.on('message', data => {
    data.result.forEach(async element => {
        // 查询数据库中是否存在doubanId
        let movie = await Movie.findOne({
            doubanId: element.doubanId
        })
        if(!movie) {
            // 不存在的话就把element存到数据库中
            movie = new Movie(element)
            await movie.save()
            console.log('Movie插入数据成功');
        }
    })
})
