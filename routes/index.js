const router = require('koa-router')()
let Mock = require('mockjs'); //引入mockjs
let Random = Mock.Random; //引入mock随机属性的函数

//给当前路由添加前缀(相当于/index/list)
router.prefix('/index')

router.get('/', async (ctx, next) => {
  await new Promise((resolve) => {
    setTimeout(async () => {
      resolve()
      console.log(1)
    }, 1000 * 20);
  })
  // await ctx.render('index', {
  //   title: 'Hello Koa 2!'
  // })
  ctx.body = {
    status: "success",
    data: {},
  }


})

router.get('/string', async (ctx, next) => {
  ctx.body = await Mock.mock({
    status: "success",
    'self': {
      money: 0,
      nick_name: 'nick_name',
      user_id: 1,
      user_picture: ''
    },
    'arr|1-10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id': 1,
      'author|+1': Random.cname(),
      'img': Random.image('100x100'),
      'title': Random.csentence(5, 9)
    }]
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

var MockRandom = Mock.Random;
// var pageCount = MockRandom.integer(1, 10);
var pageCount = 3;

var haseMore = true;//是否结束分页
var ids = 10000;//自增长id
var bookListTemplate = {};//数据模板


router.get('/index', function (ctx, next) {
  let req = ctx.requst
  let res = ctx.response

  var currPage = parseInt(ctx.query.page || 1);
  ids = currPage * 10000;
  if (currPage === pageCount) {
    haseMore = false;
    bookListTemplate = {
      'list|1-10': [//最后一页的数据在1-10的区间产生
        {
          'user_id|+1': ids,
          'nick_name': '@ctitle(5, 15)',
          'user_picture': MockRandom.image('200x100', '#4A7BF7', '@name book'),//经测试MockRandom.dataImage()无效,看了下源码，是有该函数的 - 下的mockjs@1.0.1-beta3包
          'card_num': 32
        }
      ],
      'self': {
        money: 0,
        nick_name: 'nick_name',
        user_id: 1,
        user_picture: ''
      }
    }
  } else {
    bookListTemplate = {
      'list|20': [//有分页的时候一页10条数据
        {
          'user_id|+1': ids,
          'nick_name': '@ctitle(5, 15)',
          'user_picture': MockRandom.image('200x100', '#4A7BF7', '@name book'),//经测试MockRandom.dataImage()无效,看了下源码，是有该函数的 - 下的mockjs@1.0.1-beta3包
          'card_num': 32
        }
      ],
      'self': {
        money: 0,
        nick_name: 'nick_name',
        user_id: 1,
        user_picture: MockRandom.image('200x100', '#4A7BF7', '@name book'),//经测试
      }
    }
  }
  var mockData = Mock.mock(bookListTemplate);

  ctx.body = {
    status: "success",
    data: mockData,
  }
})


router.get('/index1', function (ctx, next) {
  let req = ctx.requst
  let res = ctx.response

  console.log(req);
  var currPage = parseInt(ctx.query.currPage || 1);
  console.log('当前请求page页：' + currPage)
  ids = currPage * 10000;
  if (currPage === pageCount) {
    haseMore = false;
    bookListTemplate = {
      'hasMore': false,
      'totalPage': pageCount,
      'list|1-10': [//最后一页的数据在1-10的区间产生
        {
          'id|+1': ids,
          'title': '@ctitle(5, 15)',
          'desc': '@cparagraph(2, 5)',
          'img': MockRandom.image('200x100', '#4A7BF7', '@name book'),//经测试MockRandom.dataImage()无效,看了下源码，是有该函数的 - 下的mockjs@1.0.1-beta3包
          'time': MockRandom.now('yyyy-MM-dd')
        }
      ]
    }
  } else {
    bookListTemplate = {
      'hasMore': true,
      'totalPage': pageCount,
      'list|10': [//有分页的时候一页10条数据
        {
          'id|+1': ids,
          'title': '@ctitle(5, 15)',
          'desc': '@cparagraph(2, 5)',
          'img': MockRandom.image('200x100', '#4A7BF7', '@name book'),//经测试MockRandom.dataImage()无效,看了下源码，是有该函数的 - 下的mockjs@1.0.1-beta3包
          'time': MockRandom.now('yyyy-MM-dd')
        }
      ]
    }
  }
  var mockData = Mock.mock(bookListTemplate);
  // res.json({
  //   status: true,
  //   data: mockData,
  //   msg: ''
  // });
  ctx.body = {
    status: true,
    data: mockData,
    msg: ''
  }
})


module.exports = router
