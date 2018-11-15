const cp = require('child_process')

const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

;(async () => {
    let movies = await Movie.find({
        $or: [
            { video: { $exists: false } },
            { video: null }
        ]
    })

    // 拿到运行页面的地址
    const video = resolve(__dirname, '../crawler/video')
    const child = cp.fork(video, []) // 启动一个子进程运行script页面
    let invoked = false

    child.on('error', err => { // 如果程序出现错误  抛出错误
        if (invoked) return
        invoked = true
        console.log(err);
    })

    // 当接收到exit时代表爬取数据工作已经完成了  可以关闭进程了
    child.on('exit', code => { // 接收 process.exit(0)
        if (invoked) return
        invoked = true
        let err = code === 0 ? null : new Error('exit code' + code)
        console.log(err);
    })
    // 拿到 ../crawler/video页面发来的数据
    child.on('message', async ({ data }) => {
        let doubanId = data.doubanId

        let movie = await Movie.findOne({ doubanId }).exec()
        // 如果发送过来的数据中有视频地址就保存下来
        if(data.video) {
            movie.video = data.video
            movie.cover = data.cover
            await movie.save()
        }else {
        // 没有的话就把数据库中的这条数据删除掉
            await movie.remove()

            let movieTypes = movie.movieTypes

            for (let i = 0; i < movieTypes.length; i++) {
                let type = movieTypes[i]
                // 逐个查询Category下的name属性
                let cat = Category.findOne({
                    name: type
                })

                if (cat && cat.movies) {
                    let idx = cat.movies.indexOf(movie._id)

                    if (idx > -1) {
                        cat.movies = cat.movies.splice(idx, 1)
                    }

                    await cat.save()
                }
            }
        }

        console.log(111);
    })
    // 把查询到的数据发送到 ../crawler/video页面去  
    child.send(movies) // 发送
})()