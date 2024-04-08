const bcrypt = require("bcryptjs")

const bcryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash;
    await next()
}

module.exports = { bcryptPassword }