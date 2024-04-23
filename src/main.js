const Koa = require("koa")

const { APP_PORT } = require("./config/config.default")

const router = require("./router")

const { koaBody } = require("koa-body")

const errHandler = require("./constant/err.handler")

const onerror = require('koa-onerror')

const app = new Koa()

onerror(app)


app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods()) //当接收到不支持的请求方式时报提示 

app.on('error', errHandler)

app.listen(APP_PORT, () => {
    console.log(`this server is running on http://localhost:${APP_PORT}`);
})