const { DataTypes } = require('sequelize')
const seq = require('../db/sequelize')

const User = seq.define("user", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        comment: "用户名，唯一"
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "年龄"
    },
    password: {
        type: DataTypes.CHAR(64),
        comment: "密码，经过加密"
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员，0否/1是'
    }
},
    {
        timestamps: false //是否生成创建时间和修改时间
    }
)

// User.sync({ force: true }) //将创建表,如果表已经存在,则将其首先删除
User.sync({ alter: true }) //这将检查数据库中表的当前状态
module.exports = User