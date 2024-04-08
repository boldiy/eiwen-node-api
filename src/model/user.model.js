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
        type: DataTypes.CHAR(32),
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

// User.sync({ force: true }) //同步创建数据表

module.exports = User