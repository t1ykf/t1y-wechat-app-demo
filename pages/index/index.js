import { createOne, createMany, sendSMSCode } from '../../api/t1y'

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

createMany('wx_students', data).then((res) => {
  console.log('添加成功：', res.data.objectIds)
}).catch((err) => {
  console.error('添加失败：', err)
})

sendSMSCode('18888888888').then((res) => {
  console.log('发送成功：', res)
}).catch((err) => {
  console.error('发送失败：', err)
})

Page({
  data: {
  },
})