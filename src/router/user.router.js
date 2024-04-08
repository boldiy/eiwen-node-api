const Router = require("koa-router");

const { register, login } = require("../controller/user.controller");
const { userValidator, userVerify, verifyLogin } = require("../middleware/user.middleware")
const { bcryptPassword } = require("../middleware/bcrypt")

//声明构造函数
const router = new Router({ prefix: "/user" });

//默认接口
router.get("/", (ctx, next) => {
    ctx.body = "hello user";
});

//注册接口
router.post("/register", userValidator, userVerify, bcryptPassword, register);

//登录接口
router.post("/login", userValidator, verifyLogin, login);

module.exports = router;
