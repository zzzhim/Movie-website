const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

const { getUserByNameAll, getUserByNameClassAll } = require('../utils/Search')

class MovieController {
    // 首页
    async home(ctx) {
        const MovieAll = await getUserByNameAll(Movie)
        
        ctx.body = {
            status: 200,
            success: true,
            message: '',
            data: MovieAll
        }
    }

    // 分类
    async classIfication(ctx) {
        const name = ctx.request.query.name
        
        const MovieAll = await getUserByNameClassAll(Movie, { tags: name})

        if (MovieAll.length > 0) {
            ctx.body = {
                status: 200,
                success: true,
                message: name + '列表',
                data: MovieAll
            }
        }else {
            ctx.body = {
                status: 200,
                success: false,
                message: '暂无',
                data: null
            }
        }

        
    }
}

module.exports = new MovieController()