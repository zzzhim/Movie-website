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
    async dateTime(ctx) {
        const { name, dateTime } = ctx.request.query
        let MovieAll
        
        if(name == 'home') {
            MovieAll = await getUserByNameClassAll(Movie, { year: Number(dateTime) })
        }else {
            MovieAll = await getUserByNameClassAll(Movie, { tags: name, year: Number(dateTime) })
        }
        
        if (MovieAll.length > 0) {
            ctx.body = {
                status: 200,
                success: true,
                data: MovieAll
            }
        } else {
            ctx.body = {
                status: 200,
                success: false,
                message: '暂无',
                data: null
            }
        }
    }

    // 详情页
    async details(ctx) {
        const { id, tag } = ctx.request.query
        
        const MovieAll = await getUserByNameClassAll(Movie, { doubanId: id })
        const recommend = await getUserByNameClassAll(Movie, { movieTypes: tag })
        
        ctx.body = {
            status: 200,
            success: true,
            data: {
                MovieAll,
                recommend
            }
        }
    }
}

module.exports = new MovieController()