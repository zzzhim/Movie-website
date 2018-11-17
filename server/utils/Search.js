class Search {
    // 定义一个查询方法
    async getUserByName(db, name) {
        return await new Promise((resolve, reject) => {
            db.findOne(name, (err, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    }

    async getUserByNameAll(db) {
        return await new Promise((resolve, reject) => {
            db.find({}, (err, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    }

    async getUserByNameClassAll(db, name) {
        return await new Promise((resolve, reject) => {
            db.find( name, (err, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    }
}

module.exports = new Search()