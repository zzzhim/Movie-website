const mongoose = require('mongoose')
const User = mongoose.model('User')
// 引入查询方法
const { getUserByName } = require('../utils/Search')
// 引入创建token的方法
const createToken = require('../utils/createToken')
// 引入加密方法
const md5 = require('md5')

class UserController {
    // 注册
    async registered(ctx) {
        const { pass, checkPass, username, email } = ctx.request.body

        if(pass == checkPass) {
            let res = {
                status: 200,
                success: false,
                message: null,
                data: null
            }
            // 查询账户是否已存在
            const bool = await getUserByName(User, { email })
            
            if(!bool) {
                const password = md5(md5(md5(pass)))
                // 把用户数据存到数据库
                const UserSchame = await new User({ username, password, email })
                await UserSchame.save()
                const token = createToken(email)

                res.message = '注册成功'
                res.success = true
                res.data = { token }
                ctx.body = res
            }else {
                res.message = '账户已存在'
                ctx.body = res
            }
        }else {
            res.message = '两次密码不相同'
            ctx.body = res
        }
    }

    // 登录
    async login(ctx) {
        let res = {
            status: 200,
            success: false,
            message: null,
            data: null
        }

        const { email, password } = ctx.request.body
        // 查询账户是否存在
        const bool = await getUserByName(User, { email })
        console.log(bool);
        if(bool) {
            if (md5(md5(md5(password))) == bool.password) {
                const token = createToken(email)
                res.message = '登录成功'
                res.success = true
                res.data = { token }
                ctx.body = res
            }else {
                res.message = '账户或密码不正确!!!'
                ctx.body = res
            }
        }else {
            res.message = '账户或密码不正确!!!'
            ctx.body = res
        }
    }
}

module.exports = new UserController