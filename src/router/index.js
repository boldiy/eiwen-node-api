const fs = require('fs')

const Router = require("koa-router")

const router = new Router()

//遍历目录中所有路由，并引入文件及使用
fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        let r = require('./' + file)
        router.use(r.routes())
    }
})

module.exports = router