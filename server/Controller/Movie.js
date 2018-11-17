const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const { getUserByName, getUserByNameAll } = require('../utils/Search')

class MovieController {
    async home(ctx) {
        console.log(ctx);
        const MovieAll = await getUserByNameAll(Movie)
        console.log(MovieAll);
        
        ctx.body = {
            status: 200,
            success: true,
            message: '',
            data: MovieAll
        }
    }


}

module.exports = new MovieController()