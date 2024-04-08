const { createUser } = require("../service/user.service");
const { registerError } = require("../constant/err.type")
class UserController {
  //用户注册
  async register(ctx, next) {
    const { username, password } = ctx.request.body;

    //创建用户 
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
}

module.exports = new UserController();
