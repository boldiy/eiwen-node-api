const Router = require('koa-router')

const router = new Router({ prefix: '/product' })

const { upload } = require('../controller/product.controller')

router.post('/upload', upload)

module.exports = router