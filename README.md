# t1y-wechat-app-demo

这是一个 T1 后端云 `微信小程序` 使用例子。使用前请修改 `api/t1y.js` 中的密钥信息并在小程序白名单中添加该文件中的域名，确保请求不会被拦截。

## 前期准备

- 如果你在自己的项目中使用它，那么你需要把 `api/t1y.js` 复制到你的项目中，并确保项目使用了 `npm` 即存在 `package.json` 文件（不存在使用 npm init 创建，并点击微信开发者工具菜单中的工具 -> 构建 npm），然后使用以下命令安装必要依赖：

```bash
npm install crypto-js --save
```

- 如果你只需基于这个 demo 学习，那么你可以克隆本代码，并使用微信开发者工具打开它，并执行以下命令安装必要依赖：

```bash
npm install
```

本 demo 涉及的依赖只存在 `crypto-js` 用于 `md5` 加密，你也可以使用其它方法代替。

## 使用

完成前期工作之后，你就可以使用 T1 后端云中对外暴露的所有 `RESTful API` 了，所以方法及参数可在 `api/t1y.js` 中查看到。

### 导入所需方法

```js
import { createOne, createMany, sendSMSCode } from '../../api/t1y'
```

### 使用示例

- 添加一条数据

```js
const data = [{
  name: '王华',
  age: 21,
  sex: '男',
  birthday: 'Date("2002-07-09T00:00:00Z")'
},{
  name: '王华华',
  age: 23,
  sex: '女',
  birthday: new Date('2000-07-09')
}]

createOne('wx_students', data[0]).then((res) => {
  console.log('添加成功：', res.data.objectId)
}).catch((err) => {
  console.error('添加失败：', err)
})
```

- 添加多条数据

```js
const data = [{
  name: '王华',
  age: 21,
  sex: '男',
  birthday: 'Date("2002-07-09T00:00:00Z")'
},{
  name: '王华华',
  age: 23,
  sex: '女',
  birthday: new Date('2000-07-09')
}]

createMany('wx_students', data).then((res) => {
  console.log('添加成功：', res.data.objectIds)
}).catch((err) => {
  console.error('添加失败：', err)
})
```

- 发送短信验证码

```js
sendSMSCode('18888888888').then((res) => {
  console.log('发送成功：', res)
}).catch((err) => {
  console.error('发送失败：', err)
})
```