const base = `https://movie.douban.com/subject/`

const puppeteer = require('puppeteer')

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

process.on('message', async movies => { 

    console.log('开始爬取开始爬取视频和封面资源')
    
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'], // 传递给 chrome 实例的其他参数，比如你可以使用”–ash-host-window-bounds=1024x768”
        dumpio: false // 是否将浏览器进程stdout和stderr导入到process.stdout和process.stderr中。默认为false
    })

    const page = await browser.newPage()

    for (let index = 0; index < movies.length; index++) {

        await page.goto(base + movies[index].doubanId, {
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
            doubanId: movies[index].doubanId,
            video
        }
        process.send({ data })
    }

    browser.close() // 将浏览器关闭。
    process.exit(0) // 以结束状态码code指示Node.js同步终止进程
})



