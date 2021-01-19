'use strict'
const crypto = require('crypto');
module.exports = {
  // 密码加密
  encryption(pwd) {
    return crypto.createHash('md5').update(pwd).digest('hex');
  },
  // 生成token
  getToken(val) {
    return this.app.jwt.sign(val, this.config.jwt.secret, { expiresIn: this.config.jwt.expiresIn })
  },
  verify(token) {
    try {
      return this.app.jwt.verify(token, this.app.config.jwt.secret, { expiresIn: this.config.jwt.expiresIn })
    } catch (err) {
      return err.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!'
    }
  }
}
