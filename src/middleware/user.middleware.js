const { getUserInfo } = require("../service/user.service");
const { userFormatError, userExists, registerError } = require("../constant/err.type");

//验证合法性
const userValidator = async (ctx, next) => {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
        ctx.app.emit('error', userFormatError, ctx)
        return
    }
    await next()
}

//验证合理性
const userVerify = async (ctx, next) => {
    const { username } = ctx.request.body;
    try {
        if (await getUserInfo({ username })) {
            ctx.app.emit('error', userExists, ctx)
            return
        }
    } catch (error) {
        console.error('发生异常', error);
        ctx.app.emit('error', registerError, ctx)
        return
    }

    await next()
}
module.exports = { userValidator, userVerify }