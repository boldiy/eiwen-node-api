const jwt = require("jsonwebtoken")
const env = require("../config/config.default")
const errType = require("../constant/err.type")

const auth = async (ctx, next) => {
    try {
        const authorization = ctx.request.headers.authorization;
        const token = authorization.replace("Bearer ", "")

        try {
            const user = jwt.verify(token, env.JWT_SECRET);
            ctx.jwt = user //验证jwt后，将用户信息存入ctx
        } catch (error) {
            console.error(error);
            switch (error.name) {
                case "TokenExpiredError":
                    return ctx.app.emit('error', errType.tokenExpired, ctx)
                case "JsonWebTokenError":
                    return ctx.app.emit('error', errType.invalidToken, ctx)
                default:
                    return ctx.app.emit('error', errType.invalidToken, ctx)
            }
        }

    } catch (error) {
        return console.error('发生异常', error)

    }

    await next()
}

//检查是否管理员
const isAdmin = async (ctx, next) => {
    try {
        const { isAdmin } = ctx.jwt
        if (!isAdmin) {
            return ctx.app.emit('error', errType.isAdminPermission, ctx)
        }
    } catch (error) {
        return console.error('发生异常', error)
    }
    await next()
}

module.exports = { auth, isAdmin }