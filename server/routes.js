const compose = require('koa-compose');
const Router = require('koa-router');
var router = new Router();
const Index = require('./index');
router.get('/api/index', Index.index)
 
// app.use(router.routes()).use(router.allowedMethods());
module.exports = (ctx, next) => compose([router.routes(), router.allowedMethods()]);