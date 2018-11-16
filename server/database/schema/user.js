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

const User = mongoose.model('User', UserSchema)