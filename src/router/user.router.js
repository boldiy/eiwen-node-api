const Router = require("koa-router");

const { register, login, modifyPassword } = require("../controller/user.controller");
const { userValidator, userVerify, verifyLogin, validatorPassowrd, verifyPassowrd } = require("../middleware/user.middleware")
const { auth } = require("../middleware/auth.middleware")
const { bcryptPassword } = require("../middleware/bcrypt")

//声明构造函数
const router = new Router({ prefix: "/user" });

//默认接口
router.get("/", (ctx, next) => {
    ctx.body = "hello user";
});

//注册接口
router.post("/register", userValidator, userVerify, bcryptPassword, register)

//登录接口
router.post("/login", userValidator, verifyLogin, login)

//修改密码
router.patch("/password", auth, validatorPassowrd, verifyPassowrd, bcryptPassword, modifyPassword)

module.exports = router;
