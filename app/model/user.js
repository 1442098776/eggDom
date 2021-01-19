'use strict';
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const PostSchema = new Schema({
    id: {
      type: Number,
      required: true
    },
    tel: {
      type: Number
    },
    password: {
      type: String
    },
    name: {
      type: String
    },
    age: {
      type: Number
    },
    sex: {
      type: Number,
      enum: [ 1, 2 ] // 1男2女
    },
    time: {
      type: Date,
      default: new Date()
    }
  })
  return mongoose.model('User', PostSchema, 'user')
}
