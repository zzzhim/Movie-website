// const movies = [{ // 测试
//     // video: 'http://vt1.doubanio.com/201810312110/47a18400c65c4022c66d7e416b9504ba/view/movie/M/402380333.mp4',
//     doubanId: '26290410',
//     poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2535437639.jpg',
//     cover: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2531097433.webp'
// }]

let OSS = require('ali-oss')
const fs = require('fs')
const request = require('request')
const nanoid = require('nanoid')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

const bucket = require('../config/index')

const client = new OSS(bucket)

;(async() => {
    
    let movies = await Movie.find({
        $or: [
            { videoKey: { $exists: false } },
            { videoKey: null },
            { videoKey: ''}
        ]
    })

    async function put(fileName,file) {
        try {
            // 上传文件到阿里云OSS
            await client.put(fileName, __dirname + `/imgs/${fileName}`);
            // await client.put(fileName, file);

            console.log(`上传成功: ${fileName}`)
        } catch (e) {
            console.log('上传失败')
            console.log(e)
        }
    }
    
    movies.forEach(async item => {
        for (let val in item) {
            // if ((item[val] == item.video) || (item[val] == item.poster) || (item[val] == item.cover)) {
            if ((item[val] == item.poster) || (item[val] == item.cover)) {

                let url = item[val]
                let arr = url.split('.')
                let imgName = nanoid() + '.' + arr[arr.length - 1] // 获取文件名

                item[val + 'Key'] = imgName

                await item.save()
                
                let ends = request.get(url) // 获取
                
                ends.pipe(fs.createWriteStream(__dirname + `/imgs/${imgName}`)) // 写入

                ends.on('end',async () => { // 写入后
                    // let data = await new Promise((resolve, reject) => {
                    //     fs.readFile(__dirname + `/imgs/${imgName}`, (err, data) => {
                    //         if(err){
                    //             reject(err)
                    //         }
                    //         resolve(data)
                    //     })
                    // })
                    // // 通过Buffer的方式传
                    // data = new Buffer.from(data)
                    put(imgName).then(val => {
                        // 当文件上传到阿里云OSS后 删除文件
                        fs.unlink(__dirname + `/imgs/${imgName}`,async function (err) {
                            if (err){
                                console.log(err);
                            }

                            console.log('文件删除成功');
                        })
                    })
                })
            }
        }
    })
})()
