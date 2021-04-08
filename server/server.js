const Koa= require('koa')
const app = new Koa()
const routes = require('./routes.js');
const cors = require('koa2-cors'); 
//运行跨域
app.use(cors());  
//路由
app.use(routes());
app.listen(3001,()=>{
    console.log('port is running at 3001')
})