'use strict';

const Service = require('egg').Service;

class IndexService extends Service {
  async echo() {
    const { ctx } = this
    let list = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
    const data = {
      name: '小红',
      age: Math.random(Math.random() * 1 + 120),
      sex: 2
    }
    const result = await ctx.model.User(data)
    await result.save()
    await ctx.model.User.find({}, (err, rp) => {
      if (err) {
        list = err
        return
      }
      list = rp
    })
    return list
  }
}

module.exports = IndexService;
