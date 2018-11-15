const base = `https://movie.douban.com/subject/`

const puppeteer = require('puppeteer')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

;(async () => {
    const movies = await new Promise(resolve => {
        Movie.find({}, (err, data) => {
            resolve(data)
        })
    })
    console.log('开始爬取开始爬取视频和封面资源')
    
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'], // 传递给 chrome 实例的其他参数，比如你可以使用”–ash-host-window-bounds=1024x768”
        dumpio: false // 是否将浏览器进程stdout和stderr导入到process.stdout和process.stderr中。默认为false
    })

    const page = await browser.newPage()
    // console.log(movies[0].doubanId);
    

    // for (let index = 0; index < movies.length; index++) {
        // console.log(base + movies[index].doubanId);
    await movies.forEach(async element => {
        
        await page.goto(base + element.doubanId, {
            waitUntil: 'networkidle2'
        })

        await sleep(3000)

        const result = await page.evaluate(() => {
            var $ = window.$
            // 返回海报地址
            var cover = $('.nbgnbg img').attr('src').replace('s_ratio', 'l_ratio')
            // 获取视频网页地址
            var videoPath = $('.related-pic-video').attr('href')
            if ($('.related-pic-video').length > 0){
                return {
                    cover,
                    videoPath
                }
            }
            return {}
        })

        let video = null

        if(result.videoPath) {

            await page.goto(result.videoPath, {
                waitUntil: 'networkidle2'
            })
            await sleep(3000)
            video = await page.evaluate(() => {
                var $ = window.$

                var it = $('source')

                if(it && it.length>0) {
                    return it.attr('src')
                }
                return ''
            })
        }

        let data = {
            cover: result.cover,
            doubanId: element.doubanId,
            video
        }
    })
})()



