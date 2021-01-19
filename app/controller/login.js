'use strict';

const Controller = require('egg').Controller;
class LoginController extends Controller {
  // 登录
  async login() {
    const { ctx, service } = this
    let data = ctx.request.body
    if (!data.tel || !data.password) {
      ctx.body = {
        code: 500,
        msg: '参数不合法'
      }
      return
    }
    data.password = await ctx.helper.encryption(String(data.password))
    const info = await this.service.login.userOne({ tel: data.tel }, { password: 0 })
    if (!info) {
      ctx.body = {
        code: 400,
        msg: '暂没此用户，请去注册'
      }
      return
    }
    const user = await service.login.userOne(data, { password: 0 })
    if (user) {
      ctx.body = {
        code: 200,
        msg: '登录成功',
        token: ctx.helper.getToken(user.toJSON()),
        user
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '账号或密码不正确'
      }
    }
  }
  // 注册
  async register() {
    const { ctx, service } = this
    let data = ctx.request.body
    if (!data.tel || !data.password) {
      ctx.body = {
        code: 500,
        msg: '参数不合法'
      }
      return
    }
    const user = await service.login.user({ tel: data.tel }, { password: 0 })
    if (user.length > 0) {
      ctx.body = {
        code: 500,
        msg: '该用户已存在'
      }
      return
    }
    // const count = await ctx.model.User.count()
    data.password = await ctx.helper.encryption(String(data.password))
    const info = await service.login.user({ }, { password: 0 })
    data = Object.assign({}, data, { id: info.length === 0 ? 1 : info[info.length - 1].id + 1 })
    const createUser = await service.login.save(data)
    if (createUser) {
      const userInfo = await service.login.userOne({ tel: data.tel }, { password: 0, _id: 0 })
      ctx.body = {
        code: 200,
        msg: '注册成功',
        res: {
          user: userInfo,
          token: ctx.helper.getToken(userInfo.toJSON())
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败'
      }
    }
  }
  async list() {
    console.log(this.ctx.state)
    this.ctx.body = '列表'
  }
}

module.exports = LoginController;
