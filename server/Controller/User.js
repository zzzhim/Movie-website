const mongoose = require('mongoose')
const User = mongoose.model('User')
// 引入查询方法
const { getUserByName } = require('../utils/Search')
// 引入创建token的方法
const createToken = require('../utils/createToken')
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
                // 把用户数据存到数据库
                const UserSchame = await new User({ username, password: pass, email })
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


}

module.exports = new UserController