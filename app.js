const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors') //允许跨域

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(cors()) //允许跨域
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// app.use(async (ctx, next) => {
// 	ctx.set('Access-Control-Allow-Origin', '*');
// 	ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
// 	ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// 	ctx.set("X-Powered-By", " 3.2.1");
// 	ctx.set("Content-Type", "application/json;charset=utf-8");
// 	await next();
// });

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

app.listen(3001, () => {
  console.log("localhost:3001");
})
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
