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

// router.post('/ningbo-project/newcafe/rest/revolution/v1/workflow/page', function (ctx, next) {
//     let bookListTemplate =
//     {
//         'data|10': [//最后一页的数据在1-10的区间产生
//             // 'data': [//最后一页的数据在1-10的区间产生

//             {
//                 'id|+1': Math.floor(Math.random() * 48234)
//                 ,
//                 'title': '@ctitle(10, 25)',
//                 createTime: "2021-08-20 19:07:11",
//                 creator: '163709',
//                 creatorName: '江继征',
//                 handler: ["163709"],
//                 handlerVO: [
//                     {
//                         applyStatus: 'SUCCESS',
//                         chineseName: '江继征',
//                         id: 6131,
//                         userName: '163709',
//                         nickName: '163709'
//                     }
//                 ],
//                 information: {},
//                 isDel: true,
//                 operator: null,
//                 stakeholderList: ["江继征(163709)"],
//                 status: "audit",
//                 systemName: "奋进号平台系统",
//                 sysTemNo: "E2016",
//                 type: "applyment",
//                 updateTime: "2021-08-20 19:08:22",
//                 url: "/xxxxx"
//             }
//         ],
//         total: 48,
//     }

//     var mockData = Mock.mock(bookListTemplate);

//     ctx.body = mockData
// })


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



// 人员 详情
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
        // "departmentId": '1234',
        "departmentName": "woshi变更承担部门名称", // 变更承担部门名称
        "businessManageBefore": {
            chineseName: '小红',
            userName: 'k23133'
        },
        "businessManageAfter": {
            chineseName: '小lv',
            userName: 'k2333'
        },
        // "gmanager": { // ?
        //     "applyStatus": "WAIT",
        //     "chineseName": "叶明桥",
        //     "company": "string",
        //     "department": "string",
        //     "depttype": "string",
        //     "editable": true,
        //     "email": "string",
        //     "enterpriseCard": "string",
        //     "firstDepartmentName": "string",
        //     "id": 0,
        //     "mandarin": "string",
        //     "memberCount": 0,
        //     "nickName": "k3332",
        //     "organName": "string",
        //     "project": "string",
        //     "role": "SUPER_ADMIN",
        //     "secondDepartmentName": "string",
        //     "userName": "string",
        //     "userType": "USER",
        // },
        id: 1,// 流程id,
        "instructionFile": [ // 需求规格说明书
            {
                "file": {
                    "fileKey": "asd12312",
                    "id": 1,
                    "name": "instructionFilename",
                    "url": "asdjasjdhkajhsdjkhas",

                },
                "userStoryIds": [354]
            }
        ],
        "isKeynote": "string", // 是否是重点项目
        "planFile": [ // 管理计划
            {
                "file": {
                    "fileKey": "123123123",
                    "id": 3,
                    "name": "planFileilename",
                    "url": "string",

                },
                "userStoryIds": [353]
            }
        ],
        "processor": ["string"], // 当前处理人
        "processors": [
            {
                'chineseName': '徐灵',
                'userName': 'k631312',
                'mandarin': 'j',
            },
            {
                'chineseName': '徐灵12',
                'userName': 'k6313s12',
                'mandarin': 'k',
            },
            {
                'chineseName': '徐灵',
                'userName': 'k6313121',
                'mandarin': 'j',
            },
            {
                'chineseName': '徐灵12',
                'userName': 'k6313s123',
                'mandarin': 'k',
            },
        ],

        "projectScale": "大型", //
        "reason": "string", // 变更原因
        "status": "draft", // 流程状态 audit draft
        // "tmanager": {
        //     "applyStatus": "WAIT",
        //     "chineseName": "叶明桥",
        //     "company": "string",
        //     "department": "string",
        //     "depttype": "string",
        //     "editable": true,
        //     "email": "string",
        //     "enterpriseCard": "string",
        //     "firstDepartmentName": "string1",
        //     "id": 0,
        //     "mandarin": "string",
        //     "memberCount": 0,

        //     "nickName": "k3332",
        //     "organName": "string",
        //     "project": "string",
        //     "role": "SUPER_ADMIN",
        //     "secondDepartmentName": "string",
        //     "userName": "string",
        //     "userType": "USER"
        // },
        "userStoryEntities": [
            { id: 353, title: "相县造亲地火子主或便", code: "31231" },
            { id: 354, title: "器是工已车么报七", code: "31231" },
            { id: 355, title: "切般只采天单除子表思海设生干她", code: "31231" },
            { id: 356, title: "队算深越照置族", code: "31231" },
            { id: 357, title: "手数己长方体需马", code: "31231" },
            { id: 358, title: "边作然加经采称示", code: "31231" },
        ],
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
                "isTermination": false,
                "planReleaseDateAfter": "2022-01-22",
                "planReleaseDateBefore": "2022-01-25",
                "systemTeams": {
                    "systemNo": 'E1503',
                    'rdTeam': [
                        {
                            'leaders': [ // 小组长默认
                                {
                                    'name': '郑永顺',
                                    no: '141197',
                                    principal: false,
                                }
                            ],
                            'members': [  // 负责人和小组长公用option
                                {
                                    'name': '郑永顺',
                                    no: '141197',
                                    principal: false,
                                },
                                {
                                    'name': '余亮',
                                    no: '171630',
                                    principal: false,
                                },
                                {
                                    'name': '胡文泽',
                                    no: '34211',
                                    principal: false,
                                },
                            ],
                            name: '行内总线组',
                            no: 'GR412312312312',
                            onlyTeam: true
                        }
                    ],
                    'productTeam': [
                        {
                            'leaders': [ // 小组长默认
                                {
                                    'name': '郑永顺c',
                                    no: '411971',
                                    principal: false,
                                }
                            ],
                            'members': [  // 负责人和小组长公用option
                                {
                                    'name': '郑永顺c',
                                    no: '411971',
                                    principal: false,
                                },
                                {
                                    'name': '余亮',
                                    no: '171630',
                                    principal: false,
                                },
                                {
                                    'name': '胡文泽',
                                    no: '34211',
                                    principal: false,
                                },
                            ],
                            name: '产品组',
                            no: 'GR41231231',
                            onlyTeam: true
                        }
                    ],
                    'testTeam': [
                        {
                            'leaders': [ // 小组长默认
                                {
                                    'name': '郑永顺t',
                                    no: '411971',
                                    principal: false,
                                }
                            ],
                            'members': [  // 负责人和小组长公用option
                                {
                                    'name': '郑永顺t',
                                    no: '411971',
                                    principal: false,
                                },
                                {
                                    'name': '余亮',
                                    no: '171630',
                                    principal: false,
                                },
                                {
                                    'name': '胡文泽',
                                    no: '34211',
                                    principal: false,
                                },
                            ],
                            name: '测试组',
                            no: 'GR4123123',
                            onlyTeam: true
                        }
                    ],
                },

                stakeholderList: null,

                // "stakeholderList": [
                //     {
                //         'rdTeamNoBefore': 810,
                //         'rdTeamNameBefore': '行内总线组',  // 研发小组
                //         'rdTeamLeaderNoBefore': '141196',
                //         'rdTeamLeaderNameBefore': '郑永顺1', // 研发小组长
                //         'rdIssueLeaderNoBefore': '195929',
                //         'rdIssueLeaderNameBefore': '苗哲', // 研发负责人
                //         'rdAssistantManagerNoBefore': 'k3123',
                //         'rdAssistantManagerNameBefore': '尤哲建', // 研发助理

                //         // 'rdTeamNoAfter': 8101,
                //         // 'rdTeamNameAfter': '行内总线组1',  // 研发小组
                //         // 'rdTeamLeaderNoAfter': '141197',
                //         // 'rdTeamLeaderNameAfter': '郑永顺', // 研发小组长
                //         // 'rdIssueLeaderNoAfter': '1959',
                //         // 'rdIssueLeaderNameAfter': '苗哲', // 研发负责人
                //         // 'rdAssistantManagerNoAfter': 'k312',
                //         // 'rdAssistantManagerNameAfter': '尤哲建', // 研发助理


                //         'testTeamNoBefore': 8101,
                //         'testTeamNameBefore': '测试组',  // 测试小组
                //         'testTeamLeaderNoBefore': '1411971',
                //         'testTeamLeaderNameBefore': '郑永顺t', // 测试小组长
                //         'testIssueLeaderNoBefore': '165929',
                //         'testIssueLeaderNameBefore': '苗哲t', // 测试负责人
                //         'testAssistantManagerNoBefore': 'k3523',
                //         'testAssistantManagerNameBefore': '尤哲建t', // 测试助理

                //         // 'testTeamNoAfter': 8101,
                //         // 'testTeamNameAfter': '测试组1',  // 测试小组
                //         // 'testTeamLeaderNoAfter': '141191',
                //         // 'testTeamLeaderNameAfter': '郑永顺t1', // 测试小组长
                //         // 'testIssueLeaderNoAfter': '16592',
                //         // 'testIssueLeaderNameAfter': '苗哲t1', // 测试负责人
                //         // 'testAssistantManagerNoAfter': 'k352',
                //         // 'testAssistantManagerNameAfter': '尤哲建t1', // 测试助理


                //         'productTeamNoBefore': 81,
                //         'productTeamNameBefore': '产品组',  // 产品小组
                //         'productTeamLeaderNoBefore': '411971',
                //         'productTeamLeaderNameBefore': '郑永顺c', // 产品小组长
                //         'productIssueLeaderNoBefore': '16929',
                //         'productIssueLeaderNameBefore': '苗哲c', // 产品负责人
                //         'productAssistantManagerNoBefore': 'k323',
                //         'productAssistantManagerNameBefore': '尤哲建c', // 产品助理

                //         // 'productTeamNoAfter': 81,
                //         // 'productTeamNameAfter': '产品组',  // 产品小组
                //         // 'productTeamLeaderNoAfter': '411971',
                //         // 'productTeamLeaderNameAfter': '郑永顺c', // 产品小组长
                //         // 'productIssueLeaderNoAfter': '16929',
                //         // 'productIssueLeaderNameAfter': '苗哲c', // 产品负责人
                //         // 'productAssistantManagerNoAfter': 'k323',
                //         // 'productAssistantManagerNameAfter': '尤哲建c', // 产品助理

                //         "systemName": "系统1",
                //         "systemNo": "E1503",
                //         "userStoryId": 10,
                //         id: 1,
                //     }
                // ],

            },
            {
                "userStoryId": 11,
                "userStoryNumber": 2,
                "userStoryStatus": "故事草稿中",
                "userStoryTitle": "userStoryTitle12",
                "count": 0,
                "expectedDeliTimeForTestAfter": "2022-01-25",
                "expectedDeliTimeForTestBefore": "2022-01-26",
                "formId": 0,
                "id": 0,
                "isTermination": false,
                "planReleaseDateAfter": "2022-01-21", "planReleaseDateBefore": "2022-01-22",
                "stakeholderList": [
                    {
                        "formId": 0,
                        "id": 0,
                        "isNeedAgree": true,
                        "productAgree": true,
                        "productTimeAfter": 1,
                        "productTimeBefore": 12,
                        "productUserName": "小红1",
                        "productUserNo": "k1233",
                        "rdAgree": true,
                        "rdTimeAfter": 3, "rdTimeBefore": 2, "rdUserName": "小蓝1", "rdUserNo": "k3213",
                        "relationId": 0,
                        "systemName": "系统2",
                        "systemNo": "12",
                        "testAgree": true,
                        "testTimeAfter": 2,
                        "testTimeBefore": 32,
                        "testUserName": "小绿1",
                        "testUserNo": "k3213",
                        "userStoryId": 10,

                        'rdTeamNoBefore': 810,
                        'rdTeamNameBefore': '行内总线组',  // 研发小组
                        'rdTeamLeaderNoBefore': '141196',
                        'rdTeamLeaderNameBefore': '郑永顺1', // 研发小组长
                        'rdIssueLeaderNoBefore': '195929',
                        'rdIssueLeaderNameBefore': '苗哲', // 研发负责人
                        'rdAssistantManagerNoBefore': 'k3123',
                        'rdAssistantManagerNameBefore': '尤哲建', // 研发助理

                        // 'rdTeamNoAfter': 810,
                        // 'rdTeamNameAfter': '行内总线组',  // 研发小组
                        // 'rdTeamLeaderNoAfter': '141197',
                        // 'rdTeamLeaderNameAfter': '郑永顺', // 研发小组长
                        // 'rdIssueLeaderNoAfter': '195929',
                        // 'rdIssueLeaderNameAfter': '苗哲', // 研发负责人
                        // 'rdAssistantManagerNoAfter': 'k3123',
                        // 'rdAssistantManagerNameAfter': '尤哲建', // 研发助理


                        'testTeamNoBefore': 8101,
                        'testTeamNameBefore': '测试组',  // 测试小组
                        'testTeamLeaderNoBefore': '1411971',
                        'testTeamLeaderNameBefore': '郑永顺t', // 测试小组长
                        'testIssueLeaderNoBefore': '165929',
                        'testIssueLeaderNameBefore': '苗哲t', // 测试负责人
                        'testAssistantManagerNoBefore': 'k3523',
                        'testAssistantManagerNameBefore': '尤哲建t', // 测试助理

                        // 'testTeamNoAfter': 8101,
                        // 'testTeamNameAfter': '测试组1',  // 测试小组
                        // 'testTeamLeaderNoAfter': '141191',
                        // 'testTeamLeaderNameAfter': '郑永顺t1', // 测试小组长
                        // 'testIssueLeaderNoAfter': '16592',
                        // 'testIssueLeaderNameAfter': '苗哲t1', // 测试负责人
                        // 'testAssistantManagerNoAfter': 'k352',
                        // 'testAssistantManagerNameAfter': '尤哲建t1', // 测试助理


                        'productTeamNoBefore': 81,
                        'productTeamNameBefore': '产品组',  // 产品小组
                        'productTeamLeaderNoBefore': '411971',
                        'productTeamLeaderNameBefore': '郑永顺c', // 产品小组长
                        'productIssueLeaderNoBefore': '16929',
                        'productIssueLeaderNameBefore': '苗哲c', // 产品负责人
                        'productAssistantManagerNoBefore': 'k323',
                        'productAssistantManagerNameBefore': '尤哲建c', // 产品助理

                        // 'productTeamNoAfter': 81,
                        // 'productTeamNameAfter': '产品组',  // 产品小组
                        // 'productTeamLeaderNoAfter': '411971',
                        // 'productTeamLeaderNameAfter': '郑永顺c', // 产品小组长
                        // 'productIssueLeaderNoAfter': '16929',
                        // 'productIssueLeaderNameAfter': '苗哲c', // 产品负责人
                        // 'productAssistantManagerNoAfter': 'k323',
                        // 'productAssistantManagerNameAfter': '尤哲建c', // 产品助理
                    },
                    {
                        "formId": 0,
                        "id": 0,
                        "isNeedAgree": true,
                        "productAgree": true,
                        "productTimeAfter": 1,
                        "productTimeBefore": 12,
                        "productUserName": "小红1",
                        "productUserNo": "k1233",
                        "rdAgree": true,
                        "rdTimeAfter": 3, "rdTimeBefore": 2, "rdUserName": "小蓝1", "rdUserNo": "k3213",
                        "relationId": 0,
                        "systemName": "系统2",
                        "systemNo": "12",
                        "testAgree": true,
                        "testTimeAfter": 2,
                        "testTimeBefore": 32,
                        "testUserName": "小绿1",
                        "testUserNo": "k3213",
                        "userStoryId": 10,

                        'rdTeamNoBefore': 810,
                        'rdTeamNameBefore': '行内总线组',  // 研发小组
                        'rdTeamLeaderNoBefore': '141196',
                        'rdTeamLeaderNameBefore': '郑永顺1', // 研发小组长
                        'rdIssueLeaderNoBefore': '195929',
                        'rdIssueLeaderNameBefore': '苗哲', // 研发负责人
                        'rdAssistantManagerNoBefore': 'k3123',
                        'rdAssistantManagerNameBefore': '尤哲建', // 研发助理

                        // 'rdTeamNoAfter': 810,
                        // 'rdTeamNameAfter': '行内总线组',  // 研发小组
                        // 'rdTeamLeaderNoAfter': '141197',
                        // 'rdTeamLeaderNameAfter': '郑永顺', // 研发小组长
                        // 'rdIssueLeaderNoAfter': '195929',
                        // 'rdIssueLeaderNameAfter': '苗哲', // 研发负责人
                        // 'rdAssistantManagerNoAfter': 'k3123',
                        // 'rdAssistantManagerNameAfter': '尤哲建', // 研发助理


                        'testTeamNoBefore': 8101,
                        'testTeamNameBefore': '测试组',  // 测试小组
                        'testTeamLeaderNoBefore': '1411971',
                        'testTeamLeaderNameBefore': '郑永顺t', // 测试小组长
                        'testIssueLeaderNoBefore': '165929',
                        'testIssueLeaderNameBefore': '苗哲t', // 测试负责人
                        'testAssistantManagerNoBefore': 'k3523',
                        'testAssistantManagerNameBefore': '尤哲建t', // 测试助理

                        // 'testTeamNoAfter': 8101,
                        // 'testTeamNameAfter': '测试组1',  // 测试小组
                        // 'testTeamLeaderNoAfter': '141191',
                        // 'testTeamLeaderNameAfter': '郑永顺t1', // 测试小组长
                        // 'testIssueLeaderNoAfter': '16592',
                        // 'testIssueLeaderNameAfter': '苗哲t1', // 测试负责人
                        // 'testAssistantManagerNoAfter': 'k352',
                        // 'testAssistantManagerNameAfter': '尤哲建t1', // 测试助理


                        'productTeamNoBefore': 81,
                        'productTeamNameBefore': '产品组',  // 产品小组
                        'productTeamLeaderNoBefore': '411971',
                        'productTeamLeaderNameBefore': '郑永顺c', // 产品小组长
                        'productIssueLeaderNoBefore': '16929',
                        'productIssueLeaderNameBefore': '苗哲c', // 产品负责人
                        'productAssistantManagerNoBefore': 'k323',
                        'productAssistantManagerNameBefore': '尤哲建c', // 产品助理

                        // 'productTeamNoAfter': 81,
                        // 'productTeamNameAfter': '产品组',  // 产品小组
                        // 'productTeamLeaderNoAfter': '411971',
                        // 'productTeamLeaderNameAfter': '郑永顺c', // 产品小组长
                        // 'productIssueLeaderNoAfter': '16929',
                        // 'productIssueLeaderNameAfter': '苗哲c', // 产品负责人
                        // 'productAssistantManagerNoAfter': 'k323',
                        // 'productAssistantManagerNameAfter': '尤哲建c', // 产品助理
                    },
                    {
                        "formId": 0,
                        "id": 0,
                        "isNeedAgree": true,
                        "productAgree": true,
                        "productTimeAfter": 1,
                        "productTimeBefore": 12,
                        "productUserName": "小红1",
                        "productUserNo": "k1233",
                        "rdAgree": true,
                        "rdTimeAfter": 3, "rdTimeBefore": 2, "rdUserName": "小蓝1", "rdUserNo": "k3213",
                        "relationId": 0,
                        "systemName": "系统2",
                        "systemNo": "12",
                        "testAgree": true,
                        "testTimeAfter": 2,
                        "testTimeBefore": 32,
                        "testUserName": "小绿1",
                        "testUserNo": "k3213",
                        "userStoryId": 10,

                        'rdTeamNoBefore': 810,
                        'rdTeamNameBefore': '行内总线组',  // 研发小组
                        'rdTeamLeaderNoBefore': '141196',
                        'rdTeamLeaderNameBefore': '郑永顺1', // 研发小组长
                        'rdIssueLeaderNoBefore': '195929',
                        'rdIssueLeaderNameBefore': '苗哲', // 研发负责人
                        'rdAssistantManagerNoBefore': 'k3123',
                        'rdAssistantManagerNameBefore': '尤哲建', // 研发助理

                        // 'rdTeamNoAfter': 810,
                        // 'rdTeamNameAfter': '行内总线组',  // 研发小组
                        // 'rdTeamLeaderNoAfter': '141197',
                        // 'rdTeamLeaderNameAfter': '郑永顺', // 研发小组长
                        // 'rdIssueLeaderNoAfter': '195929',
                        // 'rdIssueLeaderNameAfter': '苗哲', // 研发负责人
                        // 'rdAssistantManagerNoAfter': 'k3123',
                        // 'rdAssistantManagerNameAfter': '尤哲建', // 研发助理


                        'testTeamNoBefore': 8101,
                        'testTeamNameBefore': '测试组',  // 测试小组
                        'testTeamLeaderNoBefore': '1411971',
                        'testTeamLeaderNameBefore': '郑永顺t', // 测试小组长
                        'testIssueLeaderNoBefore': '165929',
                        'testIssueLeaderNameBefore': '苗哲t', // 测试负责人
                        'testAssistantManagerNoBefore': 'k3523',
                        'testAssistantManagerNameBefore': '尤哲建t', // 测试助理

                        // 'testTeamNoAfter': 8101,
                        // 'testTeamNameAfter': '测试组1',  // 测试小组
                        // 'testTeamLeaderNoAfter': '141191',
                        // 'testTeamLeaderNameAfter': '郑永顺t1', // 测试小组长
                        // 'testIssueLeaderNoAfter': '16592',
                        // 'testIssueLeaderNameAfter': '苗哲t1', // 测试负责人
                        // 'testAssistantManagerNoAfter': 'k352',
                        // 'testAssistantManagerNameAfter': '尤哲建t1', // 测试助理


                        'productTeamNoBefore': 81,
                        'productTeamNameBefore': '产品组',  // 产品小组
                        'productTeamLeaderNoBefore': '411971',
                        'productTeamLeaderNameBefore': '郑永顺c', // 产品小组长
                        'productIssueLeaderNoBefore': '16929',
                        'productIssueLeaderNameBefore': '苗哲c', // 产品负责人
                        'productAssistantManagerNoBefore': 'k323',
                        'productAssistantManagerNameBefore': '尤哲建c', // 产品助理

                        // 'productTeamNoAfter': 81,
                        // 'productTeamNameAfter': '产品组',  // 产品小组
                        // 'productTeamLeaderNoAfter': '411971',
                        // 'productTeamLeaderNameAfter': '郑永顺c', // 产品小组长
                        // 'productIssueLeaderNoAfter': '16929',
                        // 'productIssueLeaderNameAfter': '苗哲c', // 产品负责人
                        // 'productAssistantManagerNoAfter': 'k323',
                        // 'productAssistantManagerNameAfter': '尤哲建c', // 产品助理
                    },
                ],

            },
        ]
    }
}
console.log("bookListTemplate", res2);
// router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/baseLine/', function (ctx, next) {
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/person/', function (ctx, next) {


    var mockData = Mock.mock(res2);
    ctx.body = mockData
})


// 基变 详情
const res3 =
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
        // "departmentId": '1234',
        "departmentName": "woshi变更承担部门名称", // 变更承担部门名称
        "businessManageBefore": {
            chineseName: '小红',
            userName: 'k23133'
        },
        "businessManageAfter": {
            chineseName: '小lv',
            userName: 'k2333'
        },
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
                    "fileKey": "asd12312",
                    "id": 1,
                    "name": "instructionFilename",
                    "url": "asdjasjdhkajhsdjkhas",

                },
                "userStoryIds": [354]
            }
        ],
        "isKeynote": "string", // 是否是重点项目
        "planFile": [ // 管理计划
            {
                "file": {
                    "fileKey": "123123123",
                    "id": 3,
                    "name": "planFileilename",
                    "url": "string",

                },
                "userStoryIds": [353]
            }
        ],
        "processor": ["string"], // 当前处理人
        "processors": [
            {
                'chineseName': '徐灵',
                'userName': 'k631312'
            },
            {
                'chineseName': '徐灵12',
                'userName': 'k6313s12'
            },
        ],

        "projectScale": "大型", //
        "reason": "string", // 变更原因
        "status": "draft", // 流程状态 audit draft
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
        "userStoryEntities": [
            { id: 353, title: "相县造亲地火子主或便", code: "31231" },
            { id: 354, title: "器是工已车么报七", code: "31231" },
            { id: 355, title: "切般只采天单除子表思海设生干她", code: "31231" },
            { id: 356, title: "队算深越照置族", code: "31231" },
            { id: 357, title: "手数己长方体需马", code: "31231" },
            { id: 358, title: "边作然加经采称示", code: "31231" },
        ],
        "userStories": [
            {
                "userStoryId": 10,
                "userStoryNumber": 2,
                "userStoryStatus": "故事草稿中",
                "userStoryTitle": "userStoryTitle1",
                "count": 10,
                // "expectedDeliTimeForTestAfter": "2022-01-25",
                "expectedDeliTimeForTestBefore": "2022-01-26",
                "formId": 0,
                "id": 0,
                "isTermination": false,
                // "planReleaseDateAfter": "2022-01-22",
                "planReleaseDateBefore": "2022-01-25",
                "systemList": [
                    {
                        "formId": 0,
                        "id": 1,
                        "isNeedAgree": false,
                        "productAgree": true,
                        // "productTimeAfter": 1,
                        "productTimeBefore": 2,
                        "productUserName": "小红",
                        "productUserNo": "k1233",
                        "rdAgree": true,
                        // "rdTimeAfter": null,
                        "rdTimeBefore": 2,
                        "rdUserName": "小蓝",
                        "rdUserNo": "k3213",
                        "relationId": 0,
                        "systemName": "系统1",
                        "systemNo": "12",
                        "testAgree": true,
                        // "testTimeAfter": 2,
                        "testTimeBefore": 32,
                        "testUserName": "小绿",
                        "testUserNo": "k3213",
                        "userStoryId": 10
                    },
                    {
                        "formId": 0,
                        "id": 2,
                        "isNeedAgree": false,
                        "productAgree": true,
                        // "productTimeAfter": 1,
                        "productTimeBefore": 2,
                        "productUserName": "小红2",
                        "productUserNo": "k1233",
                        "rdAgree": true,
                        // "rdTimeAfter": 1,
                        "rdTimeBefore": 2,
                        "rdUserName": "小蓝",
                        "rdUserNo": "k3213",
                        "relationId": 0,
                        "systemName": "系统2",
                        "systemNo": "13",
                        "testAgree": true,
                        // "testTimeAfter": 2,
                        "testTimeBefore": 32,
                        "testUserName": "小绿",
                        "testUserNo": "k3213",
                        "userStoryId": 10
                    },
                    // {
                    //     "formId": 0,
                    //     "id": 2,
                    //     "isNeedAgree": false,
                    //     "productAgree": true,
                    //     // "productTimeAfter": 1,
                    //     "productTimeBefore": 2,
                    //     "productUserName": "小红2",
                    //     "productUserNo": "k1233",
                    //     "rdAgree": true,
                    //     // "rdTimeAfter": 1,
                    //     "rdTimeBefore": 2,
                    //     "rdUserName": "小蓝",
                    //     "rdUserNo": "k3213",
                    //     "relationId": 0,
                    //     "systemName": "系统2",
                    //     "systemNo": "13",
                    //     "testAgree": true,
                    //     // "testTimeAfter": 2,
                    //     "testTimeBefore": 32,
                    //     "testUserName": "小绿",
                    //     "testUserNo": "k3213",
                    //     "userStoryId": 10
                    // },
                    // {
                    //     "formId": 0,
                    //     "id": 2,
                    //     "isNeedAgree": false,
                    //     "productAgree": true,
                    //     // "productTimeAfter": 1,
                    //     "productTimeBefore": 2,
                    //     "productUserName": "小红2",
                    //     "productUserNo": "k1233",
                    //     "rdAgree": true,
                    //     // "rdTimeAfter": 1,
                    //     "rdTimeBefore": 2,
                    //     "rdUserName": "小蓝",
                    //     "rdUserNo": "k3213",
                    //     "relationId": 0,
                    //     "systemName": "系统2",
                    //     "systemNo": "13",
                    //     "testAgree": true,
                    //     // "testTimeAfter": 2,
                    //     "testTimeBefore": 32,
                    //     "testUserName": "小绿",
                    //     "testUserNo": "k3213",
                    //     "userStoryId": 10
                    // },
                    // {
                    //     "formId": 0,
                    //     "id": 2,
                    //     "isNeedAgree": false,
                    //     "productAgree": true,
                    //     // "productTimeAfter": 1,
                    //     "productTimeBefore": 2,
                    //     "productUserName": "小红2",
                    //     "productUserNo": "k1233",
                    //     "rdAgree": true,
                    //     // "rdTimeAfter": 1,
                    //     "rdTimeBefore": 2,
                    //     "rdUserName": "小蓝",
                    //     "rdUserNo": "k3213",
                    //     "relationId": 0,
                    //     "systemName": "系统2",
                    //     "systemNo": "13",
                    //     "testAgree": true,
                    //     // "testTimeAfter": 2,
                    //     "testTimeBefore": 32,
                    //     "testUserName": "小绿",
                    //     "testUserNo": "k3213",
                    //     "userStoryId": 10
                    // },
                    // {
                    //     "formId": 0,
                    //     "id": 2,
                    //     "isNeedAgree": false,
                    //     "productAgree": true,
                    //     // "productTimeAfter": 1,
                    //     "productTimeBefore": 2,
                    //     "productUserName": "小红2",
                    //     "productUserNo": "k1233",
                    //     "rdAgree": true,
                    //     // "rdTimeAfter": 1,
                    //     "rdTimeBefore": 2,
                    //     "rdUserName": "小蓝",
                    //     "rdUserNo": "k3213",
                    //     "relationId": 0,
                    //     "systemName": "系统2",
                    //     "systemNo": "13",
                    //     "testAgree": true,
                    //     // "testTimeAfter": 2,
                    //     "testTimeBefore": 32,
                    //     "testUserName": "小绿",
                    //     "testUserNo": "k3213",
                    //     "userStoryId": 10
                    // },
                    // {
                    //     "formId": 0,
                    //     "id": 2,
                    //     "isNeedAgree": false,
                    //     "productAgree": true,
                    //     // "productTimeAfter": 1,
                    //     "productTimeBefore": 2,
                    //     "productUserName": "小红2",
                    //     "productUserNo": "k1233",
                    //     "rdAgree": true,
                    //     // "rdTimeAfter": 1,
                    //     "rdTimeBefore": 2,
                    //     "rdUserName": "小蓝",
                    //     "rdUserNo": "k3213",
                    //     "relationId": 0,
                    //     "systemName": "系统2",
                    //     "systemNo": "13",
                    //     "testAgree": true,
                    //     // "testTimeAfter": 2,
                    //     "testTimeBefore": 32,
                    //     "testUserName": "小绿",
                    //     "testUserNo": "k3213",
                    //     "userStoryId": 10
                    // },
                    // {
                    //     "formId": 0,
                    //     "id": 3,
                    //     "isNeedAgree": true,
                    //     "productAgree": true,
                    //     "productTimeAfter": 1,
                    //     "productTimeBefore": 2,
                    //     "productUserName": "小红3",
                    //     "productUserNo": "k1233",
                    //     "rdAgree": true,
                    //     "rdTimeAfter": 11,
                    //     "rdTimeBefore": 2,
                    //     "rdUserName": "小蓝2",
                    //     "rdUserNo": "k3213",
                    //     "relationId": 0,
                    //     "systemName": "系统3",
                    //     "systemNo": "12",
                    //     "testAgree": true,
                    //     "testTimeAfter": 2,
                    //     "testTimeBefore": 32,
                    //     "testUserName": "小绿3",
                    //     "testUserNo": "k3213",
                    //     "userStoryId": 0
                    // }
                ],

            },
            // {
            //     "userStoryId": 11,
            //     "userStoryNumber": 2,
            //     "userStoryStatus": "故事草稿中",
            //     "userStoryTitle": "userStoryTitle12",
            //     "count": 0,
            //     "expectedDeliTimeForTestAfter": "2022-01-25",
            //     "expectedDeliTimeForTestBefore": "2022-01-26",
            //     "formId": 0,
            //     "id": 0,
            //     "isTermination": false,
            //     "planReleaseDateAfter": "2022-01-21", "planReleaseDateBefore": "2022-01-22",
            //     "systemList": [
            //         {
            //             "formId": 0,
            //             "id": 1,
            //             "isNeedAgree": true,
            //             "productAgree": true,
            //             "productTimeAfter": 1,
            //             "productTimeBefore": 2,
            //             "productUserName": "小红",
            //             "productUserNo": "k1233",
            //             "rdAgree": true,
            //             "rdTimeAfter": null,
            //             "rdTimeBefore": 2,
            //             "rdUserName": "小蓝",
            //             "rdUserNo": "k3213",
            //             "relationId": 0,
            //             "systemName": "系统1",
            //             "systemNo": "12",
            //             "testAgree": true,
            //             "testTimeAfter": 2,
            //             "testTimeBefore": 32,
            //             "testUserName": "小绿",
            //             "testUserNo": "k3213",
            //             "userStoryId": 0
            //         },
            //         {
            //             "formId": 0,
            //             "id": 2,
            //             "isNeedAgree": true,
            //             "productAgree": true,
            //             "productTimeAfter": 1,
            //             "productTimeBefore": 2,
            //             "productUserName": "小红",
            //             "productUserNo": "k1233",
            //             "rdAgree": true,
            //             "rdTimeAfter": 1,
            //             "rdTimeBefore": 2,
            //             "rdUserName": "小蓝",
            //             "rdUserNo": "k3213",
            //             "relationId": 0,
            //             "systemName": "系统2",
            //             "systemNo": "12",
            //             "testAgree": true,
            //             "testTimeAfter": 2,
            //             "testTimeBefore": 32,
            //             "testUserName": "小绿",
            //             "testUserNo": "k3213",
            //             "userStoryId": 0
            //         },
            //         {
            //             "formId": 0,
            //             "id": 3,
            //             "isNeedAgree": true,
            //             "productAgree": true,
            //             "productTimeAfter": 1,
            //             "productTimeBefore": 2,
            //             "productUserName": "小红3",
            //             "productUserNo": "k1233",
            //             "rdAgree": true,
            //             "rdTimeAfter": 11,
            //             "rdTimeBefore": 2,
            //             "rdUserName": "小蓝2",
            //             "rdUserNo": "k3213",
            //             "relationId": 0,
            //             "systemName": "系统3",
            //             "systemNo": "12",
            //             "testAgree": true,
            //             "testTimeAfter": 2,
            //             "testTimeBefore": 32,
            //             "testUserName": "小绿3",
            //             "testUserNo": "k3213",
            //             "userStoryId": 0
            //         }
            //     ],
            // },
        ]
    }
}
console.log("bookListTemplate", res3);
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/baseLine/', function (ctx, next) {
    // router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/person/', function (ctx, next) {
    var mockData = Mock.mock(res3);
    ctx.body = mockData
})


// 单个用户故事 详情
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/baseLine/getUserStory/', function (ctx, next) {

    var mockData = Mock.mock(
        {
            success: true,
            data: {
                "userStoryId": 10,
                "userStoryNumber": 2,
                "userStoryStatus": "故事实现中",
                "userStoryTitle": "userStoryTitle1",
                "count": 0,
                // "expectedDeliTimeForTestAfter": "2022-01-22",
                "expectedDeliTimeForTestBefore": "2022-01-23",
                "id": 0,
                "isTermination": false,
                // "planReleaseDateAfter": "2022-01-25",
                "planReleaseDateBefore": "2022-01-24",
                // "systemList|100": [
                "systemList": [

                    {
                        "formId": 0,
                        "id": 1,
                        "isNeedAgree": false,
                        "productAgree": true,
                        // "productTimeAfter": 1,
                        "productTimeBefore": 2,
                        "productUserName": "小红",
                        "productUserNo": "k1233",
                        "rdAgree": true,
                        // "rdTimeAfter": null,
                        "rdTimeBefore": 2,
                        "rdUserName": "小蓝",
                        "rdUserNo": "k3213",
                        "relationId": 0,
                        "systemName": "系统1",
                        "systemNo": "12",
                        "testAgree": true,
                        // "testTimeAfter": 2,
                        "testTimeBefore": 32,
                        "testUserName": "小绿",
                        "testUserNo": "k3213",
                        "userStoryId": 10
                    },
                    {
                        "formId": 0,
                        "id": 2,
                        "isNeedAgree": false,
                        "productAgree": true,
                        // "productTimeAfter": 1,
                        "productTimeBefore": 2,
                        "productUserName": "小红2",
                        "productUserNo": "k1233",
                        "rdAgree": true,
                        // "rdTimeAfter": 1,
                        "rdTimeBefore": 2,
                        "rdUserName": "小蓝",
                        "rdUserNo": "k3213",
                        "relationId": 0,
                        "systemName": "系统2",
                        "systemNo": "13",
                        "testAgree": true,
                        // "testTimeAfter": 2,
                        "testTimeBefore": 32,
                        "testUserName": "小绿",
                        "testUserNo": "k3213",
                        "userStoryId": 10
                    },
                    // {
                    //     "formId": 0,
                    //     "id": 1,
                    //     "isNeedAgree": true,
                    //     "productAgree": true,
                    //     "productTimeAfter": 1,
                    //     "productTimeBefore": 2,
                    //     "productUserName": "小红",
                    //     "productUserNo": "k1233",
                    //     "rdAgree": true,
                    //     "rdTimeAfter": null,
                    //     "rdTimeBefore": 2,
                    //     "rdUserName": "小蓝",
                    //     "rdUserNo": "k3213",
                    //     "relationId": 0,
                    //     "systemName": "系统1",
                    //     "systemNo": "12",
                    //     "testAgree": true,
                    //     "testTimeAfter": 2,
                    //     "testTimeBefore": 32,
                    //     "testUserName": "小绿",
                    //     "testUserNo": "k3213",
                    //     "userStoryId": 0
                    // },
                    // {
                    //     "formId": 0,
                    //     "id": 2,
                    //     "isNeedAgree": true,
                    //     "productAgree": true,
                    //     "productTimeAfter": 1,
                    //     "productTimeBefore": 2,
                    //     "productUserName": "小红",
                    //     "productUserNo": "k1233",
                    //     "rdAgree": true,
                    //     "rdTimeAfter": 1,
                    //     "rdTimeBefore": 2,
                    //     "rdUserName": "小蓝",
                    //     "rdUserNo": "k3213",
                    //     "relationId": 0,
                    //     "systemName": "系统2",
                    //     "systemNo": "12",
                    //     "testAgree": true,
                    //     "testTimeAfter": 2,
                    //     "testTimeBefore": 32,
                    //     "testUserName": "小绿",
                    //     "testUserNo": "k3213",
                    //     "userStoryId": 0
                    // },
                    // {
                    //     "formId": 0,
                    //     "id": 3,
                    //     "isNeedAgree": true,
                    //     "productAgree": true,
                    //     "productTimeAfter": 1,
                    //     "productTimeBefore": 2,
                    //     "productUserName": "小红3",
                    //     "productUserNo": "k1233",
                    //     "rdAgree": true,
                    //     "rdTimeAfter": 11,
                    //     "rdTimeBefore": 2,
                    //     "rdUserName": "小蓝2",
                    //     "rdUserNo": "k3213",
                    //     "relationId": 0,
                    //     "systemName": "系统3",
                    //     "systemNo": "12",
                    //     "testAgree": true,
                    //     "testTimeAfter": 2,
                    //     "testTimeBefore": 32,
                    //     "testUserName": "小绿3",
                    //     "testUserNo": "k3213",
                    //     "userStoryId": 0
                    // }
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
        let key = 'k' + Math.floor(Math.random() * 48234)
        result.push({
            "nickName": key,
            "userName": key,
            "chineseName": '@ctitle(2, 5)',
            "id": Math.floor(Math.random() * 48234),
        })

    }
    result.push({
        "nickName": 'k3332',
        "userName": 'k3332',
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


// 项目变更  获取详情
router.get('/ningbo-project/newcafe/rest/revolution/v1/suspendbusiness/getLaunch/', function (ctx, next) {

    var mockData = Mock.mock({
        result: true,
        data: {
            id: 1,
            "applicant": {
                "id": 11,
                "name": "k3332",
                "chineseName": "叶巧明",
                "editable": false
            },
            "applicationDate": "2021-10-01 01:20",
            "recoverDate": "2021-10-01 01:20",
            "suspendDate": "2021-10-01 01:20",
            "businessNumber": "AM - 111",
            "businessTitle": "我是标题",
            "businessId": 111,
            "projectScale": 22,
            "projectScaleName": "大型",
            isKexnote: 66,
            "isKeynoteName": "全行重点项目",
            "deptId": 1234,
            "secondManagerId": "183666",
            "firstManagerId": "183655",
            // "firstDepts": [
            //     {
            //         "badge": "1234",
            //         "empName": "总行",
            //         "comPid": "2234",
            //     },
            //     {
            //         "badge": "1235",
            //         "empName": "永银",
            //         "comPid": "2235",
            //     }
            // ],
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
    });
    ctx.body = mockData
})


// 项目变更  恢复页面
router.get('/ningbo-project/newcafe/rest/revolution/v1/suspendbusiness/getRecoveryPage/', function (ctx, next) {

    var mockData = Mock.mock({
        result: true,
        data: {
            businessId: 1111,
            businessNunber: 'AM- 111',
            businessTitle: '业务意向标题',
            suspendDate: "2022-01-01 00:00:00",
            accunulate: '8',
            'pageform': {
                'count': 5,
                "result|5": [
                    {
                        issueId: 1611220,
                        title: "@ctitle(5, 15)",
                        issueStatus: "暂时保留",
                        spaceId: 3972,
                        prefixCode: "AM",
                        seguenceId: "71023",
                        statusId: "71023",
                        statusName: "状态名称",
                        planReleaseDate: "2022-01-01 00:00:00", expectPayTestDate: "2022-01-01 00:00:00",
                        createTime: "2022-01-01 00:00:00",
                    }
                ]
            }
        }
    });
    ctx.body = mockData
})


/*人员变更*/
// 人员变更 单个用户故事 详情
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/person/getUserStory/', function (ctx, next) {

    const result = {
        success: true,
        data: {
            "userStoryId": 10,
            "userStoryNumber": 2,
            "userStoryStatus": "故事实现中",
            "userStoryTitle": "userStoryTitle1",
            "count": 0,
            "expectedDeliTimeForTestAfter": "2022-01-22",
            "expectedDeliTimeForTestBefore": "2022-01-23",
            "": {
                chineseName: '小红',
                userName: 'k23133'
            },
            "businessManagerAfter": {
                chineseName: '小lv',
                userName: 'k2333'
            },
            "id": 0,
            "isTermination": false,
            "planReleaseDateAfter": "2022-01-25",
            "planReleaseDateBefore": "2022-01-24",
            // "systemList|100": [
            "stakeholderList|5": [
                // "stakeholderList": [
                {

                    "userStoryId|+1": 10,
                    "systemName": '@ctitle(5, 15)',
                    "systemNo|+1": 1503,
                    'id|+1': 1,

                    'rdTeamNoBefore': 'GR412312312312',
                    'rdTeamNameBefore': '行内总线组',  // 研发小组
                    'rdTeamLeaderNoBefore': '141196',
                    'rdTeamLeaderNameBefore': '郑永顺1', // 研发小组长
                    'rdIssueLeaderNoBefore': '195929',
                    'rdIssueLeaderNameBefore': '苗哲', // 研发负责人
                    'rdAssistantManagerNoBefore': 'k3123',
                    'rdAssistantManagerNameBefore': '尤哲建', // 研发助理

                    // 'rdTeamNoAfter': 'GR412312312312',
                    // 'rdTeamNameAfter': '行内总线组1',  // 研发小组
                    // 'rdTeamLeaderNoAfter': '141197',
                    // 'rdTeamLeaderNameAfter': '郑永顺', // 研发小组长
                    // 'rdIssueLeaderNoAfter': '171630',
                    // 'rdIssueLeaderNameAfter': '余亮', // 研发负责人
                    // 'rdAssistantManagerNoAfter': '34211',
                    // 'rdAssistantManagerNameAfter': '胡文泽', // 研发助理


                    'testTeamNoBefore': 'GR412312312312',
                    'testTeamNameBefore': '测试组',  // 测试小组
                    'testTeamLeaderNoBefore': '1411971',
                    'testTeamLeaderNameBefore': '郑永顺t', // 测试小组长
                    'testIssueLeaderNoBefore': '165929',
                    'testIssueLeaderNameBefore': '苗哲t', // 测试负责人
                    'testAssistantManagerNoBefore': 'k3523',
                    'testAssistantManagerNameBefore': '尤哲建t', // 测试助理

                    // 'testTeamNoAfter': 'GR412312312312',
                    // 'testTeamNameAfter': '测试组1',  // 测试小组
                    // 'testTeamLeaderNoAfter': '141191',
                    // 'testTeamLeaderNameAfter': '郑永顺t1', // 测试小组长
                    // 'testIssueLeaderNoAfter': '16592',
                    // 'testIssueLeaderNameAfter': '苗哲t1', // 测试负责人
                    // 'testAssistantManagerNoAfter': 'k352',
                    // 'testAssistantManagerNameAfter': '尤哲建t1', // 测试助理


                    'productTeamNoBefore': 'GR412312312312',
                    'productTeamNameBefore': '产品组',  // 产品小组
                    'productTeamLeaderNoBefore': '411971',
                    'productTeamLeaderNameBefore': '郑永顺c', // 产品小组长
                    'productIssueLeaderNoBefore': '16929',
                    'productIssueLeaderNameBefore': '苗哲c', // 产品负责人
                    'productAssistantManagerNoBefore': 'k323',
                    'productAssistantManagerNameBefore': '尤哲建c', // 产品助理

                    // 'productTeamNoAfter': 'GR412312312312',
                    // 'productTeamNameAfter': '产品组',  // 产品小组
                    // 'productTeamLeaderNoAfter': '411971',
                    // 'productTeamLeaderNameAfter': '郑永顺c', // 产品小组长
                    // 'productIssueLeaderNoAfter': '16929',
                    // 'productIssueLeaderNameAfter': '苗哲c', // 产品负责人
                    // 'productAssistantManagerNoAfter': 'k323',
                    // 'productAssistantManagerNameAfter': '尤哲建c', // 产品助理


                    "systemTeam":
                    // [
                    {
                        "systemNo": 'E1503',
                        'rdTeam': [
                            {
                                'leaders': [ // 小组长默认
                                    {
                                        'name': '郑永顺',
                                        no: '141197',
                                        principal: false,
                                    }
                                ],
                                'members': [  // 负责人和助理公用option
                                    {
                                        'name': '郑永顺',
                                        no: '141197',
                                        principal: false,
                                    },
                                    {
                                        'name': '余亮',
                                        no: '171630',
                                        principal: false,
                                    },
                                    {
                                        'name': '胡文泽',
                                        no: '34211',
                                        principal: false,
                                    },
                                ],
                                name: '行内总线组',
                                no: 'GR412312312312',
                                onlyTeam: true
                            },
                            {
                                'leaders': [ // 小组长默认
                                    {
                                        'name': '郑永顺7',
                                        no: '141197',
                                        principal: false,
                                    }
                                ],
                                'members': [  // 负责人和助理公用option
                                    {
                                        'name': '郑永顺7',
                                        no: '141197',
                                        principal: false,
                                    },
                                    {
                                        'name': '余亮7',
                                        no: '1716307',
                                        principal: false,
                                    },
                                    {
                                        'name': '胡文泽7',
                                        no: '342117',
                                        principal: false,
                                    },
                                ],
                                name: '阿斯达萨达',
                                no: 'GR412312312313',
                                onlyTeam: true
                            }
                        ],
                        'productTeam': [
                            {
                                'leaders': [ // 小组长默认
                                    {
                                        'name': '郑永顺c',
                                        no: '411971',
                                        principal: false,
                                    }
                                ],
                                'members': [  // 负责人和小组长公用option
                                    {
                                        'name': '郑永顺c',
                                        no: '411971',
                                        principal: false,
                                    },
                                    {
                                        'name': '余亮',
                                        no: '171630',
                                        principal: false,
                                    },
                                    {
                                        'name': '胡文泽',
                                        no: '34211',
                                        principal: false,
                                    },
                                ],
                                name: '产品组',
                                no: 'GR412312312312',
                                onlyTeam: true
                            }
                        ],
                        'testTeam': [
                            {
                                'leaders': [ // 小组长默认
                                    {
                                        'name': '郑永顺t',
                                        no: '411971',
                                        principal: false,
                                    }
                                ],
                                'members': [  // 负责人和小组长公用option
                                    {
                                        'name': '郑永顺t',
                                        no: '411971',
                                        principal: false,
                                    },
                                    {
                                        'name': '余亮',
                                        no: '171630',
                                        principal: false,
                                    },
                                    {
                                        'name': '胡文泽',
                                        no: '34211',
                                        principal: false,
                                    },
                                ],
                                name: '测试组',
                                no: 'GR412312312312',
                                onlyTeam: true
                            }
                        ],
                    },
                    // {
                    //     "systemNo": 'E1504',
                    //     'rdTeam': [
                    //         {
                    //             'leaders': [ // 小组长默认
                    //                 {
                    //                     'name': '郑永顺',
                    //                     no: '141197',
                    //                     principal: false,
                    //                 }
                    //             ],
                    //             'members': [  // 负责人和助理公用option
                    //                 {
                    //                     'name': '郑永顺',
                    //                     no: '141197',
                    //                     principal: false,
                    //                 },
                    //                 {
                    //                     'name': '余亮',
                    //                     no: '171630',
                    //                     principal: false,
                    //                 },
                    //                 {
                    //                     'name': '胡文泽',
                    //                     no: '34211',
                    //                     principal: false,
                    //                 },
                    //             ],
                    //             name: '行内总线组',
                    //             no: 'GR412312312313',
                    //             onlyTeam: true
                    //         }
                    //     ],
                    //     'productTeam': [
                    //         {
                    //             'leaders': [ // 小组长默认
                    //                 {
                    //                     'name': '郑永顺c',
                    //                     no: '411971',
                    //                     principal: false,
                    //                 }
                    //             ],
                    //             'members': [  // 负责人和小组长公用option
                    //                 {
                    //                     'name': '郑永顺c',
                    //                     no: '411971',
                    //                     principal: false,
                    //                 },
                    //                 {
                    //                     'name': '余亮',
                    //                     no: '171630',
                    //                     principal: false,
                    //                 },
                    //                 {
                    //                     'name': '胡文泽',
                    //                     no: '34211',
                    //                     principal: false,
                    //                 },
                    //             ],
                    //             name: '产品组',
                    //             no: 'GR412312312313',
                    //             onlyTeam: true
                    //         }
                    //     ],
                    //     'testTeam': [
                    //         {
                    //             'leaders': [ // 小组长默认
                    //                 {
                    //                     'name': '郑永顺t',
                    //                     no: '411971',
                    //                     principal: false,
                    //                 }
                    //             ],
                    //             'members': [  // 负责人和小组长公用option
                    //                 {
                    //                     'name': '郑永顺t',
                    //                     no: '411971',
                    //                     principal: false,
                    //                 },
                    //                 {
                    //                     'name': '余亮',
                    //                     no: '171630',
                    //                     principal: false,
                    //                 },
                    //                 {
                    //                     'name': '胡文泽',
                    //                     no: '34211',
                    //                     principal: false,
                    //                 },
                    //             ],
                    //             name: '测试组',
                    //             no: 'GR412312312313',
                    //             onlyTeam: true
                    //         }
                    //     ],
                    // },
                    // ],

                },
                // {

                //     "userStoryId": 101,
                //     "systemName": '@ctitle(5, 15)',
                //     "systemNo": "E1503",
                //     id: 1,

                //     'rdTeamNoBefore': 810,
                //     'rdTeamNameBefore': '行内总线组',  // 研发小组
                //     'rdTeamLeaderNoBefore': '141196',
                //     'rdTeamLeaderNameBefore': '郑永顺1', // 研发小组长
                //     'rdIssueLeaderNoBefore': '195929',
                //     'rdIssueLeaderNameBefore': '苗哲', // 研发负责人
                //     'rdAssistantManagerNoBefore': 'k3123',
                //     'rdAssistantManagerNameBefore': '尤哲建', // 研发助理

                //     'rdTeamNoAfter': 'GR412312312312',
                //     'rdTeamNameAfter': '行内总线组1',  // 研发小组
                //     'rdTeamLeaderNoAfter': '141197',
                //     'rdTeamLeaderNameAfter': '郑永顺', // 研发小组长
                //     'rdIssueLeaderNoAfter': '171630',
                //     'rdIssueLeaderNameAfter': '余亮', // 研发负责人
                //     'rdAssistantManagerNoAfter': '34211',
                //     'rdAssistantManagerNameAfter': '胡文泽', // 研发助理


                //     'testTeamNoBefore': 8101,
                //     'testTeamNameBefore': '测试组',  // 测试小组
                //     'testTeamLeaderNoBefore': '1411971',
                //     'testTeamLeaderNameBefore': '郑永顺t', // 测试小组长
                //     'testIssueLeaderNoBefore': '165929',
                //     'testIssueLeaderNameBefore': '苗哲t', // 测试负责人
                //     'testAssistantManagerNoBefore': 'k3523',
                //     'testAssistantManagerNameBefore': '尤哲建t', // 测试助理

                //     'testTeamNoAfter': 'GR412312312312',
                //     'testTeamNameAfter': '测试组1',  // 测试小组
                //     'testTeamLeaderNoAfter': '141191',
                //     'testTeamLeaderNameAfter': '郑永顺t1', // 测试小组长
                //     'testIssueLeaderNoAfter': '16592',
                //     'testIssueLeaderNameAfter': '苗哲t1', // 测试负责人
                //     'testAssistantManagerNoAfter': 'k352',
                //     'testAssistantManagerNameAfter': '尤哲建t1', // 测试助理


                //     'productTeamNoBefore': 81,
                //     'productTeamNameBefore': '产品组',  // 产品小组
                //     'productTeamLeaderNoBefore': '411971',
                //     'productTeamLeaderNameBefore': '郑永顺c', // 产品小组长
                //     'productIssueLeaderNoBefore': '16929',
                //     'productIssueLeaderNameBefore': '苗哲c', // 产品负责人
                //     'productAssistantManagerNoBefore': 'k323',
                //     'productAssistantManagerNameBefore': '尤哲建c', // 产品助理

                //     'productTeamNoAfter': 'GR412312312312',
                //     'productTeamNameAfter': '产品组',  // 产品小组
                //     'productTeamLeaderNoAfter': '411971',
                //     'productTeamLeaderNameAfter': '郑永顺c', // 产品小组长
                //     'productIssueLeaderNoAfter': '16929',
                //     'productIssueLeaderNameAfter': '苗哲c', // 产品负责人
                //     'productAssistantManagerNoAfter': 'k323',
                //     'productAssistantManagerNameAfter': '尤哲建c', // 产品助理


                //     "systemTeam": [
                //         {
                //             "systemNo": 'E1503',
                //             'rdTeam': [
                //                 {
                //                     'leaders': [ // 小组长默认
                //                         {
                //                             'name': '郑永顺',
                //                             no: '141197',
                //                             principal: false,
                //                         }
                //                     ],
                //                     'members': [  // 负责人和助理公用option
                //                         {
                //                             'name': '郑永顺',
                //                             no: '141197',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '余亮',
                //                             no: '171630',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '胡文泽',
                //                             no: '34211',
                //                             principal: false,
                //                         },
                //                     ],
                //                     name: '行内总线组',
                //                     no: 'GR412312312312',
                //                     onlyTeam: true
                //                 }
                //             ],
                //             'productTeam': [
                //                 {
                //                     'leaders': [ // 小组长默认
                //                         {
                //                             'name': '郑永顺c',
                //                             no: '411971',
                //                             principal: false,
                //                         }
                //                     ],
                //                     'members': [  // 负责人和小组长公用option
                //                         {
                //                             'name': '郑永顺c',
                //                             no: '411971',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '余亮',
                //                             no: '171630',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '胡文泽',
                //                             no: '34211',
                //                             principal: false,
                //                         },
                //                     ],
                //                     name: '产品组',
                //                     no: 'GR412312312312',
                //                     onlyTeam: true
                //                 }
                //             ],
                //             'testTeam': [
                //                 {
                //                     'leaders': [ // 小组长默认
                //                         {
                //                             'name': '郑永顺t',
                //                             no: '411971',
                //                             principal: false,
                //                         }
                //                     ],
                //                     'members': [  // 负责人和小组长公用option
                //                         {
                //                             'name': '郑永顺t',
                //                             no: '411971',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '余亮',
                //                             no: '171630',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '胡文泽',
                //                             no: '34211',
                //                             principal: false,
                //                         },
                //                     ],
                //                     name: '测试组',
                //                     no: 'GR412312312312',
                //                     onlyTeam: true
                //                 }
                //             ],
                //         },
                //     ],

                // },
                // {

                //     "userStoryId": 30,
                //     "systemName": '@ctitle(5, 15)',
                //     "systemNo": "E1503",
                //     id: 1,

                //     'rdTeamNoBefore': 810,
                //     'rdTeamNameBefore': '行内总线组',  // 研发小组
                //     'rdTeamLeaderNoBefore': '141196',
                //     'rdTeamLeaderNameBefore': '郑永顺1', // 研发小组长
                //     'rdIssueLeaderNoBefore': '195929',
                //     'rdIssueLeaderNameBefore': '苗哲', // 研发负责人
                //     'rdAssistantManagerNoBefore': 'k3123',
                //     'rdAssistantManagerNameBefore': '尤哲建', // 研发助理

                //     'rdTeamNoAfter': 'GR412312312312',
                //     'rdTeamNameAfter': '行内总线组1',  // 研发小组
                //     'rdTeamLeaderNoAfter': '141197',
                //     'rdTeamLeaderNameAfter': '郑永顺', // 研发小组长
                //     'rdIssueLeaderNoAfter': '171630',
                //     'rdIssueLeaderNameAfter': '余亮', // 研发负责人
                //     'rdAssistantManagerNoAfter': '34211',
                //     'rdAssistantManagerNameAfter': '胡文泽', // 研发助理


                //     'testTeamNoBefore': 8101,
                //     'testTeamNameBefore': '测试组',  // 测试小组
                //     'testTeamLeaderNoBefore': '1411971',
                //     'testTeamLeaderNameBefore': '郑永顺t', // 测试小组长
                //     'testIssueLeaderNoBefore': '165929',
                //     'testIssueLeaderNameBefore': '苗哲t', // 测试负责人
                //     'testAssistantManagerNoBefore': 'k3523',
                //     'testAssistantManagerNameBefore': '尤哲建t', // 测试助理

                //     'testTeamNoAfter': 'GR412312312312',
                //     'testTeamNameAfter': '测试组1',  // 测试小组
                //     'testTeamLeaderNoAfter': '141191',
                //     'testTeamLeaderNameAfter': '郑永顺t1', // 测试小组长
                //     'testIssueLeaderNoAfter': '16592',
                //     'testIssueLeaderNameAfter': '苗哲t1', // 测试负责人
                //     'testAssistantManagerNoAfter': 'k352',
                //     'testAssistantManagerNameAfter': '尤哲建t1', // 测试助理


                //     'productTeamNoBefore': 81,
                //     'productTeamNameBefore': '产品组',  // 产品小组
                //     'productTeamLeaderNoBefore': '411971',
                //     'productTeamLeaderNameBefore': '郑永顺c', // 产品小组长
                //     'productIssueLeaderNoBefore': '16929',
                //     'productIssueLeaderNameBefore': '苗哲c', // 产品负责人
                //     'productAssistantManagerNoBefore': 'k323',
                //     'productAssistantManagerNameBefore': '尤哲建c', // 产品助理

                //     'productTeamNoAfter': 'GR412312312312',
                //     'productTeamNameAfter': '产品组',  // 产品小组
                //     'productTeamLeaderNoAfter': '411971',
                //     'productTeamLeaderNameAfter': '郑永顺c', // 产品小组长
                //     'productIssueLeaderNoAfter': '16929',
                //     'productIssueLeaderNameAfter': '苗哲c', // 产品负责人
                //     'productAssistantManagerNoAfter': 'k323',
                //     'productAssistantManagerNameAfter': '尤哲建c', // 产品助理


                //     "systemTeam": [
                //         {
                //             "systemNo": 'E1503',
                //             'rdTeam': [
                //                 {
                //                     'leaders': [ // 小组长默认
                //                         {
                //                             'name': '郑永顺',
                //                             no: '141197',
                //                             principal: false,
                //                         }
                //                     ],
                //                     'members': [  // 负责人和助理公用option
                //                         {
                //                             'name': '郑永顺',
                //                             no: '141197',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '余亮',
                //                             no: '171630',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '胡文泽',
                //                             no: '34211',
                //                             principal: false,
                //                         },
                //                     ],
                //                     name: '行内总线组',
                //                     no: 'GR412312312312',
                //                     onlyTeam: true
                //                 }
                //             ],
                //             'productTeam': [
                //                 {
                //                     'leaders': [ // 小组长默认
                //                         {
                //                             'name': '郑永顺c',
                //                             no: '411971',
                //                             principal: false,
                //                         }
                //                     ],
                //                     'members': [  // 负责人和小组长公用option
                //                         {
                //                             'name': '郑永顺c',
                //                             no: '411971',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '余亮',
                //                             no: '171630',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '胡文泽',
                //                             no: '34211',
                //                             principal: false,
                //                         },
                //                     ],
                //                     name: '产品组',
                //                     no: 'GR412312312312',
                //                     onlyTeam: true
                //                 }
                //             ],
                //             'testTeam': [
                //                 {
                //                     'leaders': [ // 小组长默认
                //                         {
                //                             'name': '郑永顺t',
                //                             no: '411971',
                //                             principal: false,
                //                         }
                //                     ],
                //                     'members': [  // 负责人和小组长公用option
                //                         {
                //                             'name': '郑永顺t',
                //                             no: '411971',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '余亮',
                //                             no: '171630',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '胡文泽',
                //                             no: '34211',
                //                             principal: false,
                //                         },
                //                     ],
                //                     name: '测试组',
                //                     no: 'GR412312312312',
                //                     onlyTeam: true
                //                 }
                //             ],
                //         },
                //         {
                //             "systemNo": 'E1504',
                //             'rdTeam': [
                //                 {
                //                     'leaders': [ // 小组长默认
                //                         {
                //                             'name': '郑永顺',
                //                             no: '141197',
                //                             principal: false,
                //                         }
                //                     ],
                //                     'members': [  // 负责人和助理公用option
                //                         {
                //                             'name': '郑永顺',
                //                             no: '141197',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '余亮',
                //                             no: '171630',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '胡文泽',
                //                             no: '34211',
                //                             principal: false,
                //                         },
                //                     ],
                //                     name: '行内总线组',
                //                     no: 'GR412312312313',
                //                     onlyTeam: true
                //                 }
                //             ],
                //             'productTeam': [
                //                 {
                //                     'leaders': [ // 小组长默认
                //                         {
                //                             'name': '郑永顺c',
                //                             no: '411971',
                //                             principal: false,
                //                         }
                //                     ],
                //                     'members': [  // 负责人和小组长公用option
                //                         {
                //                             'name': '郑永顺c',
                //                             no: '411971',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '余亮',
                //                             no: '171630',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '胡文泽',
                //                             no: '34211',
                //                             principal: false,
                //                         },
                //                     ],
                //                     name: '产品组',
                //                     no: 'GR412312312313',
                //                     onlyTeam: true
                //                 }
                //             ],
                //             'testTeam': [
                //                 {
                //                     'leaders': [ // 小组长默认
                //                         {
                //                             'name': '郑永顺t',
                //                             no: '411971',
                //                             principal: false,
                //                         }
                //                     ],
                //                     'members': [  // 负责人和小组长公用option
                //                         {
                //                             'name': '郑永顺t',
                //                             no: '411971',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '余亮',
                //                             no: '171630',
                //                             principal: false,
                //                         },
                //                         {
                //                             'name': '胡文泽',
                //                             no: '34211',
                //                             principal: false,
                //                         },
                //                     ],
                //                     name: '测试组',
                //                     no: 'GR412312312313',
                //                     onlyTeam: true
                //                 }
                //             ],
                //         },
                //     ],

                // }
            ],

        }


    }

    console.log('ctx.query', ctx.query);
    if (ctx.query.offset == 3) {
        result.data.stakeholderList = []
    }

    var mockData = Mock.mock(
        result
    );
    ctx.body = mockData
})


// 搜索 系统
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/person/search/', function (ctx, next) {
    let result = {
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
            "isTermination": false,
            "planReleaseDateAfter": "2022-01-25",
            "planReleaseDateBefore": "2022-01-24",
            // "systemList|100": [
            // "stakeholderList|6": [
            "stakeholderList": [
                {
                    "userStoryId+1": 10,
                    "systemName": '@ctitle(5, 15)',
                    "systemNo|+1": 150,
                    'id|+1': 1,

                    'rdTeamNoBefore': 810,
                    'rdTeamNameBefore': '行内总线组',  // 研发小组
                    'rdTeamLeaderNoBefore': '141196',
                    'rdTeamLeaderNameBefore': '郑永顺1', // 研发小组长
                    'rdIssueLeaderNoBefore': '195929',
                    'rdIssueLeaderNameBefore': '苗哲', // 研发负责人
                    'rdAssistantManagerNoBefore': 'k3123',
                    'rdAssistantManagerNameBefore': '尤哲建', // 研发助理

                    'rdTeamNoAfter': 'GR412312312312',
                    'rdTeamNameAfter': '行内总线组search',  // 研发小组
                    'rdTeamLeaderNoAfter': '141197',
                    'rdTeamLeaderNameAfter': '郑永顺', // 研发小组长
                    'rdIssueLeaderNoAfter': '171630',
                    'rdIssueLeaderNameAfter': '余亮', // 研发负责人
                    'rdAssistantManagerNoAfter': '34211',
                    'rdAssistantManagerNameAfter': '胡文泽', // 研发助理


                    'testTeamNoBefore': 8101,
                    'testTeamNameBefore': '测试组',  // 测试小组
                    'testTeamLeaderNoBefore': '1411971',
                    'testTeamLeaderNameBefore': '郑永顺t', // 测试小组长
                    'testIssueLeaderNoBefore': '165929',
                    'testIssueLeaderNameBefore': '苗哲t', // 测试负责人
                    'testAssistantManagerNoBefore': 'k3523',
                    'testAssistantManagerNameBefore': '尤哲建t', // 测试助理

                    'testTeamNoAfter': 'GR412312312312',
                    'testTeamNameAfter': '测试组1',  // 测试小组
                    'testTeamLeaderNoAfter': '141191',
                    'testTeamLeaderNameAfter': '郑永顺t1', // 测试小组长
                    'testIssueLeaderNoAfter': '16592',
                    'testIssueLeaderNameAfter': '苗哲t1', // 测试负责人
                    'testAssistantManagerNoAfter': 'k352',
                    'testAssistantManagerNameAfter': '尤哲建t1', // 测试助理


                    'productTeamNoBefore': 81,
                    'productTeamNameBefore': '产品组',  // 产品小组
                    'productTeamLeaderNoBefore': '411971',
                    'productTeamLeaderNameBefore': '郑永顺c', // 产品小组长
                    'productIssueLeaderNoBefore': '16929',
                    'productIssueLeaderNameBefore': '苗哲c', // 产品负责人
                    'productAssistantManagerNoBefore': 'k323',
                    'productAssistantManagerNameBefore': '尤哲建c', // 产品助理

                    'productTeamNoAfter': 'GR412312312312',
                    'productTeamNameAfter': '产品组',  // 产品小组
                    'productTeamLeaderNoAfter': '411971',
                    'productTeamLeaderNameAfter': '郑永顺c', // 产品小组长
                    'productIssueLeaderNoAfter': '16929',
                    'productIssueLeaderNameAfter': '苗哲c', // 产品负责人
                    'productAssistantManagerNoAfter': 'k323',
                    'productAssistantManagerNameAfter': '尤哲建c', // 产品助理


                    "systemTeam": [
                        {
                            "systemNo": 'E1503',
                            'rdTeam': [
                                {
                                    'leaders': [ // 小组长默认
                                        {
                                            'name': '郑永顺',
                                            no: '141197',
                                            principal: false,
                                        }
                                    ],
                                    'members': [  // 负责人和助理公用option
                                        {
                                            'name': '郑永顺',
                                            no: '141197',
                                            principal: false,
                                        },
                                        {
                                            'name': '余亮',
                                            no: '171630',
                                            principal: false,
                                        },
                                        {
                                            'name': '胡文泽',
                                            no: '34211',
                                            principal: false,
                                        },
                                    ],
                                    name: '行内总线组',
                                    no: 'GR412312312312',
                                    onlyTeam: true
                                }
                            ],
                            'productTeam': [
                                {
                                    'leaders': [ // 小组长默认
                                        {
                                            'name': '郑永顺c',
                                            no: '411971',
                                            principal: false,
                                        }
                                    ],
                                    'members': [  // 负责人和小组长公用option
                                        {
                                            'name': '郑永顺c',
                                            no: '411971',
                                            principal: false,
                                        },
                                        {
                                            'name': '余亮',
                                            no: '171630',
                                            principal: false,
                                        },
                                        {
                                            'name': '胡文泽',
                                            no: '34211',
                                            principal: false,
                                        },
                                    ],
                                    name: '产品组',
                                    no: 'GR412312312312',
                                    onlyTeam: true
                                }
                            ],
                            'testTeam': [
                                {
                                    'leaders': [ // 小组长默认
                                        {
                                            'name': '郑永顺t',
                                            no: '411971',
                                            principal: false,
                                        }
                                    ],
                                    'members': [  // 负责人和小组长公用option
                                        {
                                            'name': '郑永顺t',
                                            no: '411971',
                                            principal: false,
                                        },
                                        {
                                            'name': '余亮',
                                            no: '171630',
                                            principal: false,
                                        },
                                        {
                                            'name': '胡文泽',
                                            no: '34211',
                                            principal: false,
                                        },
                                    ],
                                    name: '测试组',
                                    no: 'GR412312312312',
                                    onlyTeam: true
                                }
                            ],
                        },
                    ],

                }
            ],

        }


    }

    if (ctx.query.offset == 3) {
        result.data.stakeholderList = []
    }
    var mockData = Mock.mock(
        result
    );
    ctx.body = mockData
})


// 搜索 业务项目经理
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectChange/person/businessManager/', function (ctx, next) {

    var mockData = Mock.mock(
        {
            success: true,
            "data|10": [
                {

                    "id": '@id()',
                    "chineseName": '@ctitle(3, 5)',
                    "email": null,
                    "nickName": null,
                    "company": null,
                    "project": null,
                    "role": null,
                    "applyStatus": null,
                    "userType": null,
                    "enterpriseCard": null,
                    "editable": false,
                    "memberCount": null,
                    "department": '@ctitle(5, 7)' + "-市场风险管理部",
                    "depttype": null,
                    "firstDepartmentName": null,
                    "secondDepartmentName": null,
                    "organName": null,
                    "mandarin": "D",
                    "userName|+1": 80154,
                }
            ]

        }
    );
    ctx.body = mockData
})



/*人员变更*/



// 流程列表
// router.post('/ningbo-project/newcafe/rest/revolution/v1/workflow/page', function (ctx, next) {

router.post('/ningbo-project/newcafe/rest/revolution/v1/workflow/page/', function (ctx, next) {

    var mockData = Mock.mock(
        {
            success: true,
            "data|10": [
                {

                    createTime: "2022-03-01 18:51:56",
                    creator: "k27059",
                    creatorName: "孙瑞甫",
                    'creatorVO': [
                        {
                            "chineseName": '@ctitle(3, 5)',
                            'userName': 'k631312',
                            'mandarin': 'j',
                        }
                    ],
                    handler: ["193836", '193837', '193838'],
                    handlerVO: [
                        {
                            "chineseName": '@ctitle(3, 5)',
                            'userName': '193836',
                            'mandarin': 'j',
                        },
                        {
                            "chineseName": '@ctitle(3, 5)',
                            'userName': '193837',
                            'mandarin': 'j',
                        },
                        {
                            "chineseName": '@ctitle(3, 5)',
                            'userName': '193838',
                            'mandarin': 'j',
                        },
                    ],

                    information: {
                        intentionId: 1612650,
                        intentionTitle: "AM-72153个人APP001",
                        liveDate: "2022-03-10",
                        title: "上线申请_2022-03-10_个人APP801",
                        userStory: [{
                            id: 1612745,
                        }],

                        branchName: "develop",
                        createTime: "2022-03-08 01:42:52",
                        namespace: "CodeApiAutoTest1",
                        repo: "Rep 1",
                        reposName: "Rep_1",
                        title: "分支销毁_[Rep_1]_[develop]",
                        // type: "branch_delete",
                        // type: "domain_info",
                        // type: "test_coverage",
                        type: "promotion",
                        // type: 'environmental_monitoring',
                        // type: 'database_scan',

                    },
                    operator: ["柳豪博(193836)"],
                    relationId: null,
                    stakeholderList: ["孙瑞甫(k27059)", "柳豪博(193836)"],

                    stakeholderListVO: [
                        {
                            "chineseName": '孙瑞甫',
                            'userName': 'k27059',
                            'mandarin': 'j',
                        },
                        {
                            "chineseName": '柳豪博',
                            'userName': '193836',
                            'mandarin': 'j',
                        },
                    ],
                    status: "pending",
                    systemName: '@ctitle(5, 14)',
                    systemNo: null,
                    title: '@ctitle(5, 14)',
                    // type: "applyment",
                    // type: "branch_delete",
                    // type: "domain_info",
                    // type: "test_coverage",
                    type: "promotion",



                    // type: 'environmental_monitoring',
                    // type: 'database_scan',


                    updateTime: "2022-03-17 09:37:09",
                    url: "/nbcb/AM/project/issue/PA-95693/1612745/release/card?isunplaned=false",
                    "id": '@id()',
                    isDel: false,

                }
            ],
            total: 48,

        }
    );
    ctx.body = mockData
})


// **报工**
router.get('/ningbo-project/newcafe/rest/revolution/v1/workingHours/list', function (ctx, next) {

    var mockData = Mock.mock(
        {
            count: 41,
            "data|10": [
                {

                    content: null,
                    createTime: null,

                    cumulativeWorkingHours: 1,
                    editStatus: false,
                    estimatedworkingHours: 5,
                    executionTimes: 0,
                    id: '@id()',
                    isSupplement: false,
                    issueId: 2186294,
                    numberOfTestCases: 0,
                    oldStatusId: null,
                    oldStatusName: null,
                    other: false,

                    prefixCode: "AM",
                    sequence: 111769,
                    statusId: 1117,
                    statusName: "开发中",
                    // statusId: 1106,
                    // statusName: "待开发",
                    time: "2022-04-21 00:00:00",
                    title: '@ctitle(8, 14)',
                    todayWorkingHours: null,
                    typeName: "开发任务",
                    updateTime: "2022-04-21 08:00:00",
                    userName: "k62781",
                    waitConfirmedWorkingHours: 0,
                    workItemID: null,
                }
            ],
        }
    );
    ctx.body = mockData
})



// **历史记录**
router.get('/ningbo-project/newcafe/rest/revolution/v1/workingHours/getDate', function (ctx, next) {

    var mockData = Mock.mock(
        [
            {
                date: "2022-04-18",
                dayOfWeek: "周一",
                remainHours: 24,
                usedHours: 0,
            },
            {
                date: "2022-04-19",
                dayOfWeek: "周二",
                remainHours: 24,
                usedHours: 0,
            },
            {
                date: "2022-04-20",
                dayOfWeek: "周三",
                remainHours: 24,
                usedHours: 0,
            },
            {
                date: "2022-04-21",
                dayOfWeek: "周四",
                remainHours: 24,
                usedHours: 0,
            },
            {
                date: "2022-06-01",
                dayOfWeek: "周五",
                remainHours: 24,
                usedHours: 0,
            },
            {
                date: "2022-06-02",
                dayOfWeek: "周六",
                remainHours: 24,
                usedHours: 0,
            },
            {
                date: "2022-06-03",
                dayOfWeek: "周日",
                remainHours: 24,
                usedHours: 0,
            },
        ]
    );
    ctx.body = mockData
})


// **报工审核列表**
router.post('/ningbo-project/newcafe/rest/revolution/v1/workingHours/flowList', function (ctx, next) {

    var mockData = Mock.mock(
        {
            count: 223,
            "data|100": [
                {

                    approver: "193836",
                    confirmTime: "2022-04-22 08:22:01",
                    createTime: "2022-04-22 02:00:55",
                    flag: 3,
                    groupName: "研发平台组",
                    groupNo: "GRP2018111400057T",
                    isSupplement: false,
                    member: ",193836,195929,204538,213736,",
                    objectName: "研发平台组",
                    objectType: "group",
                    objectNo: "GRP2018111400057T",

                    status: 3,
                    time: "2022-04-21 00:00:00",
                    title: '@ctitle(15, 24)',
                    updateTime: "2022-04-22 08:22:01",
                    'id|+1': 89800,
                    user: {
                        "chineseName": '@ctitle(3, 5)',
                        'userName': 'k631312',
                        'mandarin': 'j',
                    }
                }
            ],
        }
    );
    ctx.body = mockData
})


// **报工审核列表**
router.get('/ningbo-project/newcafe/rest/revolution/v1/workingHours/flowInfoList/89800/', function (ctx, next) {

    var mockData = Mock.mock(
        {
            "data|18": [
                {
                    todayWorkingHours: '0.0',
                    title: '@ctitle(15, 24)',
                    userName: '@ctitle(2, 3)',
                    userNo: 'k12312',
                    id: '@id()',
                    user: {
                        "chineseName": '@ctitle(3, 5)',
                        'userName': 'k631312',
                        'mandarin': 'j',
                    }
                }
            ],

            flow: {
                approver: "193836",
                confirmTime: "2022-04-24 08:30:31",
                createTime: "2022-04-24 02:00:06",
                flag: 3,
                groupName: "研发平台组",
                groupNo: "GRP2018111400057T",
                id: 89800,
                isSupplement: false,
                member: "193836, 195929, 204538, 213736",
                objectName: "研发平台组",
                objectNo: "GRP2018111400057T",
                objectType: "group",
                status: 3,
                time: "2022-04-23 00:00:00",
                title: "研发平台组_报工数据_20220423",
                updateTime: "2022 - 04 - 24 08: 30: 31"
            }
        }
    );
    ctx.body = mockData
})

// **报工审核列表**
router.get('/ningbo-project/newcafe/rest/revolution/v1/workingHours/flowDetailList/89800/', function (ctx, next) {

    var mockData = Mock.mock(
        {
            "data|25": [
                {
                    id: '@id()',
                    user:
                    {

                        userName: '@ctitle(2, 3)',
                        userName: "K123",
                        chineseName: '@ctitle(2, 3)',
                        mandarin: "L"
                    },
                    'list|1-4': [
                        {
                            title: '@ctitle(15, 24)',
                            todayWorkingHours: "9",
                            content: '无法听不听很暖和个b，千万人不恶略哦 ',
                        },
                        {
                            title: '@ctitle(15, 24)',
                            todayWorkingHours: "1",
                            content: '无法听不听很暖和个b，千万人不恶略哦 ',
                        },
                    ],
                }
            ],

            flow: {
                approver: "193836",
                confirmTime: "2022-04-24 08:30:31",
                createTime: "2022-04-24 02:00:06",
                flag: 3,
                groupName: "研发平台组",
                groupNo: "GRP2018111400057T",
                id: 89800,
                isSupplement: false,
                member: "193836, 195929, 204538, 213736",
                objectName: "研发平台组",
                objectNo: "GRP2018111400057T",
                objectType: "group",
                status: 3,
                time: "2022-04-23 00:00:00",
                title: "研发平台组_报工数据_20220423",
                updateTime: "2022 - 04 - 24 08: 30: 31"
            }
        }
    );
    ctx.body = mockData
})


// **报工审核列表**
router.get('/ningbo-project/newcafe/rest/revolution/v1/workingHours/get', function (ctx, next) {

    var mockData = Mock.mock(
        {
            available: 24,
            currentTime: "2022-04-25 09:05:22",
            remain: 24,
            used: 0,
        }
    );
    ctx.body = mockData
})

// **报工保存**
router.post('/ningbo-project/newcafe/rest/revolution/v1/workingHours/save', function (ctx, next) {

    var mockData = Mock.mock(
        {
            success: true
        }
    );
    ctx.body = mockData
})


// **小组**

// 基变 获取二级部
function getArrFn () {
    const result = []
    const count = Math.floor(Math.random() * 100)
    for (let index = 0; index < count; index++) {
        let key = 'k' + Math.floor(Math.random() * 48234)
        result.push({
            "groupName": '@ctitle(5, 15)',
            "groupNo": '@id()',
            isDefault: [1, 3, 0].includes(index),
        })

    }

    return result
}

router.get('/ningbo-project/newcafe/rest/revolution/v1/workingHours/flow/group', function (ctx, next) {


    var mockData = Mock.mock(getArrFn());
    ctx.body = mockData
})


// 周汇
router.post('/ningbo-project/newcafe/rest/revolution/v1/workingHours/weekInfo', function (ctx, next) {

    function getArrFn () {
        const result = []
        const count = Math.floor(Math.random() * 100)
        for (let index = 0; index < count; index++) {
            let key = 'k' + Math.floor(Math.random() * 48234)
            result.push({
                "groupName": '@ctitle(5, 15)',
                "groupNo": '@id()',
                'details|1-30': [
                    {
                        userName: '@ctitle(2, 3)',
                        userNo: 'k12312',
                        id: '@id()',
                        user: {
                            "chineseName": '@ctitle(3, 5)',
                            'userName': 'k631312',
                            'mandarin': 'j',
                        },
                        monday: {
                            date: '2022-05-01 00:00:00',
                            hours: 7.1,
                            isExceed: true,
                            isOmission: false //
                        },
                        tuesday: {
                            date: '2022-05-02 00:00:00',
                            hours: 7.1,
                            isExceed: true,
                            isOmission: false //
                        },
                        wednesday: {
                            date: '2022-05-03 00:00:00',
                            hours: 7.1,
                            isExceed: true,
                            isOmission: false //
                        },
                        thursday: {
                            date: '2022-05-04 00:00:00',
                            hours: 7.1,
                            isExceed: true,
                            isOmission: false //
                        },
                        friday: {
                            date: '2022-05-05 00:00:00',
                            hours: 7.1,
                            isExceed: true,
                            isOmission: false //
                        },
                        saturday: {
                            date: '2022-05-06 00:00:00',
                            hours: 7.1,
                            isExceed: true,
                            isOmission: false //
                        },
                        sunday: {
                            date: '2022-05-07 00:00:00',
                            hours: 7.1,
                            isExceed: true,
                            isOmission: false //
                        },
                    }
                ]
            })

        }

        return result
    }
    var mockData = Mock.mock({
        'list|5-10': [
            {
                "groupName": '@ctitle(5, 15)',
                "groupNo": '@id()',
                'details|1-5': [
                    {
                        userName: '@ctitle(2, 3)',
                        userNo: 'k12312',
                        id: '@id()',
                        user: {
                            "chineseName": '@ctitle(3, 5)',
                            'userName': 'k631312',
                            'mandarin': 'j',
                        },
                        weekList: [
                            {
                                date: '2022-05-01 00:00:00',
                                hours: 7.1,
                                isExceed: true,
                                isOmission: false //
                            },
                            {
                                date: '2022-05-02 00:00:00',
                                hours: 7.1,
                                isExceed: true,
                                isOmission: false //
                            },
                            {
                                date: '2022-05-03 00:00:00',
                                hours: 7.1,
                                isExceed: true,
                                isOmission: false //
                            },
                            {
                                date: '2022-05-04 00:00:00',
                                hours: 7.1,
                                isExceed: true,
                                isOmission: false //
                            },
                            {
                                date: '2022-05-05 00:00:00',
                                hours: 7.1,
                                isExceed: true,
                                isOmission: false //
                            },
                            {
                                date: '2022-05-06 00:00:00',
                                hours: 7.1,
                                isExceed: true,
                                isOmission: false //
                            },
                            {
                                date: '2022-05-07 00:00:00',
                                hours: 7.1,
                                isExceed: true,
                                isOmission: false //
                            },
                        ]
                    }
                ]
            }
        ],
        dates: [
            "2022-05-01",
            "2022-05-02",
            "2022-05-03",
            "2022-05-04",
            "2022-05-05",
            "2022-05-06",
            "2022-05-07",
        ]
    });
    ctx.body = mockData
})



// **项目计划 面包屑**
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectPlan/getNodePath', function (ctx, next) {

    var mockData = Mock.mock(
        {
            'nodePath|3-4': [
                {
                    "title": '@ctitle(2, 6)',
                    "id": '@id()',
                    "parentId": '@id()',
                }
            ]
        }
    );
    ctx.body = mockData
})


// **项目计划 前置任务详情 **
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectPlan/getPreNode', function (ctx, next) {

    var mockData = Mock.mock(
        {
            'list': [
                {
                    "title": '@ctitle(2, 6)',
                    "planNodeType": 2,
                    "planNodeStatus": 1,// 0 未开始 1进行中 2已完成 3已暂停 4已终止
                    // "id": '@id()',
                    // "parentId": '@id()',
                    createTime: "2021/05/12 21:49:21",
                    creator: { chineseName: '@ctitle(2, 6)', userName: 'k631312', mandarin: 'j' },
                    expectedDeliTime: "2021/05/12 21:49:21",
                    id: '1', // 树的id
                    spaceIssueStatus: {
                        issueStatus: {
                            name: '已关闭'
                        }
                    },
                    title: '@ctitle(6, 10)',
                    issueType: { name: '一般事务' },
                    // 树
                }
            ]
        }
    );
    ctx.body = mockData
})

// **项目计划 前置任务树 **
router.get('/ningbo-project/newcafe/rest/revolution/v1/projectPlan/getProPlanPreNodeTree/2699/', function (ctx, next) {

    var mockData = Mock.mock(
        {
            'proPlanStageList': [
                {
                    "title": '@ctitle(2, 6)',
                    "planNodeType": 3,
                    "planNodeStatus": 1,// 0 未开始 1进行中 2已完成 3已暂停 4已终止
                    // "id": '@id()',
                    // "parentId": '@id()',
                    createTime: "2021/05/12 21:49:21",
                    creator: { chineseName: '@ctitle(2, 6)', userName: 'k631312', mandarin: 'j' },
                    expectedDeliTime: "2021/05/12 21:49:21",
                    id: '1', // 树的id
                    spaceIssueStatus: {
                        issueStatus: {
                            name: '已关闭'
                        }
                    },
                    title: '@ctitle(6, 10)',
                    issueType: { name: '一般事务' },
                    'children|20': [
                        {
                            "title": '@ctitle(2, 6)',
                            "planNodeType": 3,
                            "planNodeStatus": 1,// 0 未开始 1进行中 2已完成 3已暂停 4已终止
                            // "id": '@id()',
                            // "parentId": '@id()',
                            createTime: "2021/05/12 21:49:21",
                            creator: { chineseName: '@ctitle(2, 6)', userName: 'k631312', mandarin: 'j' },
                            expectedDeliTime: "2021/05/12 21:49:21",
                            id: '@id()', // 树的id
                            spaceIssueStatus: {
                                issueStatus: {
                                    name: '已关闭'
                                }
                            },
                            title: '@ctitle(6, 10)',
                            issueType: { name: '一般事务' },
                            children: []
                            // 树
                        }
                    ]
                    // 树
                }
            ]
        }
    );
    ctx.body = mockData
})

module.exports = router
