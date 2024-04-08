const User = require('../model/user.model')

class UserService {
  async createUser(username, password) {
    const res = await User.create({ username, password });
    return res
  }
  //获取用户信息
  async getUserInfo({ id, username, password }) {
    let where = {}
    //拼接查询条件
    id && Object.assign(where, { id })
    username && Object.assign(where, { username })
    password && Object.assign(where, { password })

    //开始查询
    const res = await User.findOne({
      attributes: ['id', 'username', 'age', 'password', 'isAdmin'],
      where
    })
    return res ? res.dataValues : null
  }
}

module.exports = new UserService();
