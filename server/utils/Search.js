class Search {
    // 定义一个查询方法
    async getUserByName(db, name) {
        return await new Promise((resolve, reject) => {
            db.findOne(name, (err, data) => {
                err ? reject(err) : resolve(data)
            })
        })
    }

}

module.exports = new Search()