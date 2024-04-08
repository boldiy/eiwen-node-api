const { Sequelize } = require("sequelize");
const env = require('../config/config.default')

const sequelize = new Sequelize(env.MYSQL_DB, env.MYSQL_USER, env.MYSQL_PASSWORD, {
    host: env.MYSQL_HOST,
    dialect: "mysql"
});

//测试连接
sequelize.authenticate().then((r) => {
    console.log("数据库连接成功");
}).catch((error) => {
    console.error("数据库连接失败", error);
});

module.exports = sequelize