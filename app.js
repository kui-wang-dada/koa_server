const Koa = require('koa')
const app = new Koa();
const config = require('./config');

const views = require('koa-views')
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// 路由分发
const router = require('./routes')
app.use(router.routes()).use(router.allowedMethods());


app.listen(config.port, function listening() {
    console.log('服务器启动成功！端口：', config.port)
})