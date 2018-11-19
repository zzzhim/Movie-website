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
        console.log(name);
        console.log(dateTime);
        
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
}

module.exports = new MovieController()