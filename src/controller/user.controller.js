const { createUser, getUserInfo } = require("../service/user.service");
const { registerError, userNotExists } = require("../constant/err.type")
const env = require("../config/config.default")
const jwt = require("jsonwebtoken")

class UserController {
  //用户注册
  async register(ctx, next) {
    const { username, password } = ctx.request.body;
    try {
      const res = await createUser(username, password);
      ctx.body = {
        message: "注册成功",
        result: res
      };

    } catch (error) {
      console.error('发生异常', error);
      ctx.app.emit('error', registerError, ctx)
    }
  }
  //用户登录后颁发Token
  async login(ctx, next) {
    try {
      //获取用户信息
      const userInfo = await getUserInfo(ctx.request.body.username);
      if (!userInfo) {
        return ctx.app.emit('error', userNotExists, ctx)
      }
      //踢除函数，除了password全部赋值给resUser
      const { password, ...resUser } = userInfo;

      //根据用户信息生成Token
      const token = jwt.sign(resUser, env.JWT_SECRET, { expiresIn: '1d' })

      ctx.body.userInfo.token = token
      ctx.body = {
        code: 0,
        message: '登录成功',
        result: ctx.body.userInfo
      }

    } catch (error) {
      console.error('发生异常', error);
      ctx.app.emit('error', registerError, ctx)
    }
  }
}

module.exports = new UserController();
