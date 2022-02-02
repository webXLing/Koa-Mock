const router = require('koa-router')()
let Mock = require('mockjs'); //引入mockjs
let Random = Mock.Random; //引入mock随机属性的函数

//给当前路由添加前缀(相当于/index/list)
router.prefix('/xly-poc')

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

// router.get('/test', async (ctx, next) => {
//     ctx.body = await Mock.mock({
//         status: "success",
//         'self': {
//             money: 0,
//             nick_name: 'nick_name',
//             user_id: 1,
//             user_picture: ''
//         },
//         'arr|1-10': [{
//             // 属性 id 是一个自增数,起始值为 1,每次增 1
//             'id': 1, s
//             'author|+1': Random.cname(),
//             'img': Random.image('100x100'),
//             'title': Random.csentence(5, 9)
//         }]
//     })
// })

// router.get('/json', async (ctx, next) => {
//     ctx.body = {
//         title: 'koa2 json'
//     }
// })

var MockRandom = Mock.Random;
// var pageCount = MockRandom.integer(1, 10);
var pageCount = 3;

var haseMore = true;//是否结束分页
var ids = 10000;//自增长id
var bookListTemplate = {};//数据模板


router.get('/page', function (ctx, next) {
    let req = ctx.requst
    let res = ctx.response

    var currPage = parseInt(ctx.query.page || 1);
    ids = currPage * 10000;
    if (currPage === pageCount) {
        haseMore = false;
        bookListTemplate = {
            'list|5-10': [//最后一页的数据在1-10的区间产生
                {
                    'user_id|+1': ids,
                    'nick_name': '@ctitle(5, 15)',
                    'user_picture': MockRandom.image('200x100', '#4A7BF7', '@name book'),//经测试MockRandom.dataImage()无效,看了下源码,是有该函数的 - 下的mockjs@1.0.1-beta3包
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
                    'user_picture': MockRandom.image('200x100', '#4A7BF7', '@name book'),//经测试MockRandom.dataImage()无效,看了下源码,是有该函数的 - 下的mockjs@1.0.1-beta3包
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
                    'img': MockRandom.image('200x100', '#4A7BF7', '@name book'),//经测试MockRandom.dataImage()无效,看了下源码,是有该函数的 - 下的mockjs@1.0.1-beta3包
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
                    'img': MockRandom.image('200x100', '#4A7BF7', '@name book'),//经测试MockRandom.dataImage()无效,看了下源码,是有该函数的 - 下的mockjs@1.0.1-beta3包
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



router.get('/ningbo-project/newcafe/rest/revolution/v1/space/3927/tag/treeData', function (ctx, next) {
    let bookListTemplate = [//最后一页的数据在1-10的区间产生
        {
            // 'id|+1': 731,
            // 'nick_name': '@ctitle(5, 15)',
            // 'user_picture': MockRandom.image('200x100', '#4A7BF7', '@name book'),//经测试MockRandom.dataImage()无效,看了下源码,是有该函数的 - 下的mockjs@1.0.1-beta3包
            // 'card_num': 32,
            id: 731,
            children: [],
            identifier: 'E2016',
            name: '奋进号平台系统',
            parentId: null,
            path: null,
            spaceId: 3757
        },
        {
            id: 888,
            children: [],
            identifier: 'D1513',
            name: '科技实验室',
            parentId: null,
            path: null,
            spaceId: 3757
        }
    ]
    var mockData = Mock.mock(bookListTemplate);

    ctx.body = mockData
})

router.post('/ningbo-project/newcafe/rest/revolution/v1/workflow/page', function (ctx, next) {
    let bookListTemplate =
    {
        'data|10': [//最后一页的数据在1-10的区间产生
            // 'data': [//最后一页的数据在1-10的区间产生

            {
                'id|+1': Math.floor(Math.random() * 48234)
                ,
                'title': '@ctitle(10, 25)',
                createTime: "2021-08-20 19:07:11",
                creator: '163709',
                creatorName: '江继征',
                handler: ["163709"],
                handlerVO: [
                    {
                        applyStatus: 'SUCCESS',
                        chineseName: '江继征',
                        id: 6131,
                        userName: '163709',
                        nickName: '163709'
                    }
                ],
                information: {},
                isDel: true,
                operator: null,
                stakeholderList: ["江继征(163709)"],
                status: "audit",
                systemName: "奋进号平台系统",
                sysTemNo: "E2016",
                type: "applyment",
                updateTime: "2021-08-20 19:08:22",
                url: "/xxxxx"
            }
        ],
        total: 48,
    }

    var mockData = Mock.mock(bookListTemplate);

    ctx.body = mockData
})


// 业务意向终止详情
const res1 =
{
    result: true,
    data: {
        "applicant": {
            "id": 11,
            "name": "k3332",
            "chineseName": "叶巧明",
            "editable": false
        },
        "applicationDate": new Date(),
        "businessNumber": "AM - 111",
        "businessTitle": "我是标题",
        "businessId": 111,
        "projectScale": 22,
        "projectScaleName": "大型",
        isKexnote: 66,
        "isKeynoteName": "重点项目",
        "firstDepts": [
            {
                "badge": "1234",
                "empName": "总行",
                "comPid": "2234",
            },
            {
                "badge": "1235",
                "empName": "永银",
                "comPid": "2235",
            }
        ],
        "deptId": 1234,
        "deptId": '',
        "secondManagerId": "183666",
        "firstManagerId": "183655",
        "secondlanager": {
            "id": 11,
            "name": "k3332",
            "chineseName": "叶巧明",
            "editable": false
        },
        "firstManager": {
            "id": 11,
            "name": "k3332",
            "chineseName": "叶巧明",
            "editable": false
        },
        "firstDept": {
            "badge": "1234",
            // "badge": "",
            "empName": "总行",
            "comPid": "2234"
        },
        "deptType": 'secondlanager',
        "compId": 1111,
        "terminReason": "终止原因",
        "type": "save",
        "status": "draft",
        "flowTitle": "1111",
        "comment": "审核意见",
        "handler": "k3332"
    }
}
console.log("bookListTemplate", res1);
router.get('/ningbo-project/newcafe/rest/revolution/v1/terminbusiness/getLaunch/', function (ctx, next) {

    var mockData = Mock.mock(res1);
    ctx.body = mockData
})

// 业务意向终止 2级部 经理总经理
router.post('/ningbo-project/newcafe/rest/revolution/v1/terminbusiness/getUsers', function (ctx, next) {
    let bookListTemplate =
    {
        "isSecondManaShow": true,
        "isFirstManaManaShow": true,
        "secondManagers": [
            {
                "badge": 'k3332',
                "empName": "叶巧明",
                "comPid": "1111"
            }
        ]
        ,
        "firstManagers": [
            {
                "badge": 'k3332',
                "empName": "叶巧明",
                "comPid": "1111"
            }
        ]
    }
    var mockData = Mock.mock(bookListTemplate);
    ctx.body = mockData
})

function getArr () {
    const result = []
    const count = Math.floor(Math.random() * 100)
    for (let index = 0; index < count; index++) {
        result.push({
            "badge": 'k' + Math.floor(Math.random() * 48234),
            "empName": '@ctitle(2, 5)',
            "comPid": Math.floor(Math.random() * 48234),
        })

    }
    return result
}
// 业务意向终止 2级部 经理总经理 模糊
router.get('/ningbo-project/newcafe/rest/revolution/v1/terminbusiness/searchUsers', function (ctx, next) {
    // let bookListTemplate = [
    //     {
    //         "badge": 'k' + Math.floor(Math.random() * 48234),
    //         "empName": '@ctitle(5, 15)',
    //         "comPid": Math.floor(Math.random() * 48234),
    //     }
    // ]
    var mockData = Mock.mock(getArr());
    ctx.body = mockData
})



// 基变 详情
const res2 =
{
    success: true,
    data: {
        "actionType": "save", // submit save 回退back
        "applicant": {
            "id": 11,
            "name": "k3332",
            "chineseName": "叶巧明",
            "editable": false
        },
        "description": '@ctitle(10, 200)',
        "applicationDate": new Date(), // 申请日期
        "baseLineType": ["range", "progress", "demand"], // 基线变更类型
        "busiWorkloadAfter": 2, // 修改后的业务工作量
        "busiWorkloadBefore": 1, // 原业务工作量
        "businessId": 111,
        "businessNumber": "AM-111", // 意向编号
        "businessTitle": "意向title",
        "content": "一项变更描述",
        "count": 1, // 变更次数
        "departmentId": '1234',
        "departmentName": "woshi变更承担部门名称", // 变更承担部门名称
        "gmanager": { // ?
            "applyStatus": "WAIT",
            "chineseName": "叶明桥",
            "company": "string",
            "department": "string",
            "depttype": "string",
            "editable": true,
            "email": "string",
            "enterpriseCard": "string",
            "firstDepartmentName": "string",
            "id": 0,
            "mandarin": "string",
            "memberCount": 0,
            "nickName": "k3332",
            "organName": "string",
            "project": "string",
            "role": "SUPER_ADMIN",
            "secondDepartmentName": "string",
            "userName": "string",
            "userType": "USER",
        },
        id: 1,// 流程id,

        "instructionFile": [ // 需求规格说明书
            {
                "file": {
                    "fileKey": "string",
                    "id": 0,
                    "name": "instructionFilename",
                    "url": "string",

                },
                "userStoryIds": [0]
            }
        ],
        "isKeynote": "string", // 是否是重点项目
        "planFile": [ // 管理计划
            {
                "file": {
                    "fileKey": "string",
                    "id": 0,
                    "name": "planFileilename",
                    "url": "string",

                },
                "userStoryIds": [0]
            }
        ],
        "processor": ["string"], // 当前处理人

        "projectScale": "大型", //
        "reason": "string", // 变更原因
        "status": "audit", // 流程状态 audit
        "tmanager": {
            "applyStatus": "WAIT",
            "chineseName": "叶明桥",
            "company": "string",
            "department": "string",
            "depttype": "string",
            "editable": true,
            "email": "string",
            "enterpriseCard": "string",
            "firstDepartmentName": "string1",
            "id": 0,
            "mandarin": "string",
            "memberCount": 0,

            "nickName": "k3332",
            "organName": "string",
            "project": "string",
            "role": "SUPER_ADMIN",
            "secondDepartmentName": "string",
            "userName": "string",
            "userType": "USER"
        },
        "userStories": [
            {
                "userStoryId": 10,
                "userStoryNumber": 2,
                "userStoryStatus": "故事草稿中",
                "userStoryTitle": "userStoryTitle1",
                "count": 0,
                "expectedDeliTimeForTestAfter": "2022-01-25",
                "expectedDeliTimeForTestBefore": "2022-01-26",
                "formId": 0,
                "id": 0,
                "isTermination": true,
                "planReleaseDateAfter": "2022-01-22",
                "planReleaseDateBefore": "2022-01-25",
                // "systemList": [
                //     {
                //         "formId": 0,
                //         "id": 0,
                //         "isNeedAgree": true,
                //         "productAgree": true,
                //         "productTimeAfter": 1,
                //         "productTimeBefore": 2,
                //         "productUserName": "小红",
                //         "productUserNo": "k1233",
                //         "rdAgree": true,
                //         "rdTimeAfter": null,
                //         "rdTimeBefore": 2,
                //         "rdUserName": "小蓝",
                //         "rdUserNo": "k3213",
                //         "relationId": 0,
                //         "systemName": "系统1",
                //         "systemNo": "12",
                //         "testAgree": true,
                //         "testTimeAfter": 2,
                //         "testTimeBefore": 32,
                //         "testUserName": "小绿",
                //         "testUserNo": "k3213",
                //         "userStoryId": 0
                //     }
                // ],

            },
            {
                "userStoryId": 0,
                "userStoryNumber": 2,
                "userStoryStatus": "故事草稿中",
                "userStoryTitle": "userStoryTitle12",
                "count": 0,
                "expectedDeliTimeForTestAfter": "2022-01-25",
                "expectedDeliTimeForTestBefore": "2022-01-26",
                "formId": 0,
                "id": 0,
                "isTermination": true,
                "planReleaseDateAfter": "2022-01-21", "planReleaseDateBefore": "2022-01-22",
                // "systemList": [
                //     {
                //         "formId": 0,
                //         "id": 0,
                //         "isNeedAgree": true,
                //         "productAgree": true,
                //         "productTimeAfter": 1,
                //         "productTimeBefore": 12,
                //         "productUserName": "小红1",
                //         "productUserNo": "k1233",
                //         "rdAgree": true,
                //         "rdTimeAfter": 3, "rdTimeBefore": 2, "rdUserName": "小蓝1", "rdUserNo": "k3213",
                //         "relationId": 0,
                //         "systemName": "系统1",
                //         "systemNo": "12",
                //         "testAgree": true,
                //         "testTimeAfter": 2,
                //         "testTimeBefore": 32,
                //         "testUserName": "小绿1",
                //         "testUserNo": "k3213",
                //         "userStoryId": 0
                //     }
                // ],

            },
        ]
    }
}
console.log("bookListTemplate", res2);
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/baseLine/', function (ctx, next) {

    var mockData = Mock.mock(res2);
    ctx.body = mockData
})



// 单个用户故事 详情
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/getUserStory/', function (ctx, next) {

    var mockData = Mock.mock(
        {
            success: true,
            data: {
                "userStoryId": 10,
                "userStoryNumber": 2,
                "userStoryStatus": "故事实现中",
                "userStoryTitle": "userStoryTitle1",
                "count": 0,
                "expectedDeliTimeForTestAfter": "2022-01-22",
                "expectedDeliTimeForTestBefore": "2022-01-23",
                "id": 0,
                "isTermination": true,
                "planReleaseDateAfter": "2022-01-25",
                "planReleaseDateBefore": "2022-01-24",
                // "systemList|100": [
                "systemList": [
                    {
                        "formId": 0,
                        "id": 1,
                        "isNeedAgree": true,
                        "productAgree": true,
                        "productTimeAfter": 1,
                        "productTimeBefore": 2,
                        "productUserName": "小红",
                        "productUserNo": "k1233",
                        "rdAgree": true,
                        "rdTimeAfter": null,
                        "rdTimeBefore": 2,
                        "rdUserName": "小蓝",
                        "rdUserNo": "k3213",
                        "relationId": 0,
                        "systemName": "系统1",
                        "systemNo": "12",
                        "testAgree": true,
                        "testTimeAfter": 2,
                        "testTimeBefore": 32,
                        "testUserName": "小绿",
                        "testUserNo": "k3213",
                        "userStoryId": 0
                    },
                    {
                        "formId": 0,
                        "id": 2,
                        "isNeedAgree": true,
                        "productAgree": true,
                        "productTimeAfter": 1,
                        "productTimeBefore": 2,
                        "productUserName": "小红",
                        "productUserNo": "k1233",
                        "rdAgree": true,
                        "rdTimeAfter": 1,
                        "rdTimeBefore": 2,
                        "rdUserName": "小蓝",
                        "rdUserNo": "k3213",
                        "relationId": 0,
                        "systemName": "系统2",
                        "systemNo": "12",
                        "testAgree": true,
                        "testTimeAfter": 2,
                        "testTimeBefore": 32,
                        "testUserName": "小绿",
                        "testUserNo": "k3213",
                        "userStoryId": 0
                    },
                    {
                        "formId": 0,
                        "id": 3,
                        "isNeedAgree": true,
                        "productAgree": true,
                        "productTimeAfter": 1,
                        "productTimeBefore": 2,
                        "productUserName": "小红3",
                        "productUserNo": "k1233",
                        "rdAgree": true,
                        "rdTimeAfter": 11,
                        "rdTimeBefore": 2,
                        "rdUserName": "小蓝2",
                        "rdUserNo": "k3213",
                        "relationId": 0,
                        "systemName": "系统3",
                        "systemNo": "12",
                        "testAgree": true,
                        "testTimeAfter": 2,
                        "testTimeBefore": 32,
                        "testUserName": "小绿3",
                        "testUserNo": "k3213",
                        "userStoryId": 0
                    }
                ],

            }


        }
    );
    ctx.body = mockData
})

// 基变 获取终止部门
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/baseLine/searchDepts/', function (ctx, next) {

    var mockData = Mock.mock(
        {
            success: true,
            data: [
                {
                    "badge": "12341",
                    "empName": "总行科技金融部",
                    "comPid": "22341",
                },
                {
                    "badge": "1234",
                    "empName": "总行",
                    "comPid": "2234",
                },
                {
                    "badge": "1235",
                    "empName": "永银",
                    "comPid": "2235",
                }
            ]


        }
    );
    ctx.body = mockData
})



// 基变 获取二级部
function getArr1 () {
    const result = []
    const count = Math.floor(Math.random() * 100)
    for (let index = 0; index < count; index++) {
        result.push({
            "nickName": 'k' + Math.floor(Math.random() * 48234),
            "chineseName": '@ctitle(2, 5)',
            "id": Math.floor(Math.random() * 48234),
        })

    }
    result.push({
        "nickName": 'k3332',
        "chineseName": '叶明桥',
        "id": 1,
    })
    return result
}
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/baseLine/getTManager/', function (ctx, next) {

    var mockData = Mock.mock(getArr1());

    ctx.body = mockData
})

router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/baseLine/getGManager/', function (ctx, next) {

    var mockData = Mock.mock(getArr1());

    ctx.body = mockData
})

// 基变history
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/baseLine/history/', function (ctx, next) {
    var mockData = Mock.mock({
        success: true,
        'data|10': [
            {
                'id|+1': Math.floor(Math.random() * 48234),
                'actionName': '保存',
                "description": '@ctitle(10, 200)',
                "operator": "k12313",
                "operatorName": "@cname",
                "processDate": "2022-01-12T01:30:58.001Z",
                "relationId": "123",
                "workflowName": "@cname"
            }
        ]


    });

    ctx.body = mockData
})


module.exports = router
