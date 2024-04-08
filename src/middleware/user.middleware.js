const { getUserInfo } = require("../service/user.service");
const { userFormatError, userExists, registerError, userNotExists } = require("../constant/err.type");
const bcrypt = require('bcryptjs')

//检查用户名密码是否填写
const userValidator = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        return ctx.app.emit('error', userFormatError, ctx)
    }
    await next()
}

//检查用户是否存在
const userVerify = async (ctx, next) => {
    const { username } = ctx.request.body;
    try {
        if (await getUserInfo({ username })) {
            return ctx.app.emit('error', userExists, ctx)
        }
    } catch (error) {
        console.error('发生异常', error);
        return ctx.app.emit('error', registerError, ctx)
    }

    await next()
}

//检查用户名密码是否正确
const verifyLogin = async (ctx, next) => {
    try {
        const { username, password } = ctx.request.body;
        const userInfo = await getUserInfo({ username })
        //检查用户
        if (!userInfo) {
            return ctx.app.emit('error', userNotExists, ctx)
        }
        //检查密码
        if (!bcrypt.compareSync(password, userInfo.password)) {
            return ctx.app.emit('error', userNotExists, ctx)
        }

        ctx.body = { userInfo };
    } catch (error) {
        console.error('发生异常', error);
        return ctx.app.emit('error', registerError, ctx)
    }
    await next()

}
module.exports = { userValidator, userVerify, verifyLogin }