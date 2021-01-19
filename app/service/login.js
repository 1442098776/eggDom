'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async user(params = {}, params1 = {}) {
    return await this.ctx.model.User.find(params, params1)
  }
  async userOne(params = {}, params1 = {}) {
    return await this.ctx.model.User.findOne(params, params1)
  }
  async save(params) {
    return await this.ctx.model.User(params).save()
  }
}

module.exports = LoginService;
