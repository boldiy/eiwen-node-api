const Koa = require("koa")

const { APP_PORT } = require("./config/config.default")

const userRouter = require("./router/user.router")

const { koaBody } = require("koa-body")

const errHandler = require("./constant/err.handler")


const app = new Koa()

app.use(koaBody())
app.use(userRouter.routes())

app.on('error', errHandler)

app.listen(APP_PORT, () => {
    console.log(`this server is running on http://localhost:${APP_PORT}`);
})