const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const { getUserByName, getUserByNameAll } = require('../utils/Search')

class MovieController {
    async home(ctx) {

        const MovieAll = await getUserByNameAll(Movie)

        console.log(MovieAll);
        
    }


}

module.exports = new MovieController()