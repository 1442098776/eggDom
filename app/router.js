'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const auth = app.middleware.auth()
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/register', controller.login.register)
  router.post('/login', controller.login.login)
  router.get('/list', auth, controller.login.list)
};
