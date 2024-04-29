###  一款基于nodejs+koa的接口服务

####  使用到的中间件

* bcryptjs  用于密码的加解密
* dotenv  用于配置系统变量
* jsonwebtoken  JWT登录令牌验证
* koa-body  解析请求数据
* koa-onerror  统一异常处理
* koa-static  静态文件访问
* mysql2  数据库
* sequelize  数据库ORM工具

####  使用方法

1. npm i 安装依赖
2. 安装本地mysql服务（或修改.env文件连接远程数据库）
3. 配置.evn文件，确定连接地址及账号密码正确
4. 安装nodemon： `` npm i nodemon -g``
5. 运行程序：``npm run dev``

####  测试接口

post http://localhost:8001/user/register     {"username":"test","password":"123"}