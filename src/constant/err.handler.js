module.exports = (err, ctx) => {
    let status = 0;
    switch (err.code) {
        case 10001:
            status = 400 //请求的数据有误
            break;
        case 10002:
            status = 409 //请求的数据冲突
            break;
        default:
            status = 500 //服务器内部错误
            break;
    }
    ctx.status = status;
    ctx.body = err;
}