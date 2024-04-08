const Router = require("koa-router");

const { register } = require("../controller/user.controller");
const { userValidator, userVerify } = require("../middleware/user.middleware")

//声明构造函数
const router = new Router({ prefix: "/user" });

//默认接口
router.get("/", (ctx, next) => {
    ctx.body = "hello user";
});

//注册接口
router.post("/register", userValidator, userVerify, register);

module.exports = router;
