'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.state)
    // const list = await service.index.echo()
    // console.log(list)
    // ctx.body = 'hi, egg';
    console.log('index', ctx)
    ctx.body = ctx.request
  }
}

module.exports = HomeController;
