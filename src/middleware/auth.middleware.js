const jwt = require("jsonwebtoken")
const env = require("../config/config.default")
const errType = require("../constant/err.type")

const auth = async (ctx, next) => {
    try {
        const authorization = ctx.request.headers.authorization;
        const token = authorization.replace("Bearer ", "")

        try {
            const user = jwt.verify(token, env.JWT_SECRET);
            ctx.request.body.jwt = user
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
        console.error(error);
    }

    await next()
}

module.exports = { auth }