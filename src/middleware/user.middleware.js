const { getUserInfo } = require("../service/user.service");
const { userFormatError, userExists, registerError, userNotExists, passwordNotEmpty, oldPasswordError } = require("../constant/err.type");
const bcrypt = require('bcryptjs')

//检查用户名密码是否填写
const userValidator = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        return ctx.app.emit('error', userFormatError, ctx)
    }
    await next()
}

//根据用户名检查用户是否存在
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

//登录 (合理性)
const verifyLogin = async (ctx, next) => {
    try {
        const { username, password } = ctx.request.body;
        const userInfo = await getUserInfo({ username })
        //检查用户是否存在
        if (!userInfo) {
            return ctx.app.emit('error', userNotExists, ctx)
        }
        //检查密码是否正确
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

//修改密码（检查合法性）
const validatorPassowrd = async (ctx, next) => {
    try {
        const { password, oldpassword } = ctx.request.body;
        //检查新老密码是否为空
        if (!password || !oldpassword) {
            return ctx.app.emit('error', passwordNotEmpty, ctx)
        }
    } catch (error) {
        console.error('发生异常', error);
        return
    }
    await next()
}

//修改密码（检查合理性）
const verifyPassowrd = async (ctx, next) => {
    try {
        const { oldpassword } = ctx.request.body;

        //检查用户是否存在
        const userInfo = await getUserInfo({ username: ctx.jwt.username })
        if (!userInfo) {
            return ctx.app.emit('error', userNotExists, ctx)
        }
        //检查密码是否正确
        if (!bcrypt.compareSync(oldpassword, userInfo.password)) {
            return ctx.app.emit('error', oldPasswordError, ctx)
        }
    } catch (error) {
        console.error('发生异常', error);
        return
    }
    await next()
}
module.exports = { userValidator, userVerify, verifyLogin, validatorPassowrd, verifyPassowrd }