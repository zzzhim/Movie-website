const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: { //姓名
        required: true,
        type: String
    },
    password: { // 密码
        type: String,
        min: 6,
        max: 12
    },
    email: { // 邮箱
        unique: true,
        type: String
    },
    avatar: { // 头像
        type: String
    }
})

//可以添加一些自定义的实例方法
// UserSchema.statics = {
//     getUserByName: function (username) {
//         return new Promise((resolve, reject) => {
//             User.findOne({ username }, (err, doc) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     resolve(doc)
//                 }
//             })
//         })
//     },
//     updateForm(username, parameter) { // 修改数据
//         return new Promise((resolve, reject) => {
//             User.update(username, parameter, (err, raw) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(raw);
//                 }
//             })
//         })
//     },
// }

const User = mongoose.model('User', UserSchema)
