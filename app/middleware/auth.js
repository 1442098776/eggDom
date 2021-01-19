'use strict';
module.exports = options => {
  return async (ctx, next) => {
    const { token } = ctx.header
    if (!token) {
      if (options.router.includes(ctx.path)) {
        return await next()
      } else {
        ctx.throw('401', '未登录，请先登录')
      }
    }
    let user = {}
    try {
      user = ctx.helper.verify(token)
    } catch (err) {
      let fail = error.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!';
      ctx.throw(200, fail);
    }
    const info = await ctx.model.User.find({ tel: user.tel }, { password: 0, _id: 0 })
    if (info.length > 0) {
      ctx.state.user = user
    } else {
      ctx.throw('401', '用户信息验证失败')
    }
    await next()
  }
}
