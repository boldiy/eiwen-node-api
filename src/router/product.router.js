const Router = require('koa-router')

const router = new Router({ prefix: '/product' })

const { auth, isAdmin } = require('../middleware/auth.middleware')

const { upload } = require('../controller/product.controller')

router.post('/upload', auth, isAdmin, upload)

module.exports = router