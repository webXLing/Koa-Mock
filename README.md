### npm install

### npm install koa2-cors(配置允许本地跨域)

### npm install mockjs --sava(安装mockjs)

### 在app.js文件里引入如下
```
const cors = require('koa2-cors')
app.use(cors()) //注意书写位置（模板写哪里就写哪里）
```
