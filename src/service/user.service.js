const User = require('../model/user.model')

class UserService {
  async createUser(username, password) {
    const res = await User.create({ username, password });
    return res
  }
  async getUserInfo({ username, id }) {
    const where = {}
    //拼接查询条件
    id && Object.assign(where, { id })
    username && Object.assign(where, { username })

    //开始查询
    const res = await User.findOne({
      attributes: ['id', 'username', 'age', 'isAdmin'],
      where
    })
    return res ? res.dataValues : null
  }
}

module.exports = new UserService();
