const mongoose = require('mongoose')
const User = mongoose.model('User')
const { getUserByName } = require('../utils/Search')

class UserController {
    async registered(ctx) {
        // console.log(ctx.request.body);
        const { pass, checkPass, username, email } = ctx.request.body

        if(pass == checkPass) {
            // const bool = await new Promise((resolve, reject) => {
            //     User.findOne({ username }, (err, data) => {
            //         err ? reject(err) : resolve(data)
            //     })
            // })
            const bool = await getUserByName(User, { username })

            if(!bool) {
                const UserSchame = await new User({ username, pass, email })
                await UserSchame.save()
                ctx.body = {
                    status: 200,
                    success: true,
                    message: '注册成功',
                    data: null
                }
            }else {
                ctx.body = {
                    status: 200,
                    success: false,
                    message: '账户已存在',
                    data: null
                }
            }
        }else {
            ctx.body = {
                status: 200,
                success : false,
                message : '两次密码不相同',
                data: null
            }
        }
    }
}

module.exports = new UserController