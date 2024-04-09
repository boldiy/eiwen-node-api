const bcrypt = require("bcryptjs")

const bcryptPassword = async (ctx, next) => {
    try {
        const { password } = ctx.request.body
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        ctx.request.body.password = hash;
    } catch (error) {
        console.error(error);
        return
    }

    await next()
}

module.exports = { bcryptPassword }