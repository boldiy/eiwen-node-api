class ProductController {
    async upload(ctx, next) {
        try {
            ctx.body = '图片上传成功'
        } catch (error) {
            console.log('发生异常', error);
        }
    }
}

module.exports = new ProductController()